// GET /api/sync/github
// Fetches repos, language breakdown, recent commits from GitHub user Amarjit772
// Returns structured text chunks ready for Pinecone upsert

const GITHUB_USER = "Amarjit772";
const GH_API = "https://api.github.com";

async function ghFetch(path) {
  const headers = { Accept: "application/vnd.github+json", "User-Agent": "portfolio-sync" };
  if (process.env.GITHUB_TOKEN) headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`${GH_API}${path}`, { headers, next: { revalidate: 0 } });
  if (!res.ok) throw new Error(`GitHub API error ${res.status}: ${path}`);
  return res.json();
}

export async function GET(req) {
  const key = req.headers.get("x-admin-key");
  if (key !== process.env.SYNC_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. User profile
    const profile = await ghFetch(`/users/${GITHUB_USER}`);

    // 2. Public repos (up to 100)
    const repos = await ghFetch(
      `/users/${GITHUB_USER}/repos?sort=pushed&per_page=100&type=public`
    );

    // 3. Aggregate language stats across all repos
    const langTotals = {};
    await Promise.all(
      repos.slice(0, 20).map(async (repo) => {
        try {
          const langs = await ghFetch(`/repos/${GITHUB_USER}/${repo.name}/languages`);
          for (const [lang, bytes] of Object.entries(langs)) {
            langTotals[lang] = (langTotals[lang] ?? 0) + bytes;
          }
        } catch { /* skip repos with no language data */ }
      })
    );

    const totalBytes = Object.values(langTotals).reduce((a, b) => a + b, 0);
    const topLanguages = Object.entries(langTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([lang, bytes]) => ({
        lang,
        percent: ((bytes / totalBytes) * 100).toFixed(1),
      }));

    // 4. Recent events (pushes) for activity summary
    let recentActivity = [];
    try {
      const events = await ghFetch(`/users/${GITHUB_USER}/events/public?per_page=30`);
      const pushEvents = events.filter((e) => e.type === "PushEvent").slice(0, 10);
      recentActivity = pushEvents.map((e) => ({
        repo: e.repo.name,
        date: e.created_at?.slice(0, 10),
        commits: e.payload?.commits?.map((c) => c.message?.split("\n")[0]).filter(Boolean) ?? [],
      }));
    } catch { /* non-critical */ }

    // 5. Top repos by stars
    const topRepos = repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description,
        stars: r.stargazers_count,
        forks: r.fork_count,
        language: r.language,
        url: r.html_url,
        pushedAt: r.pushed_at?.slice(0, 10),
      }));

    // 6. Build text chunks for Pinecone
    const chunks = buildChunks({
      profile,
      topLanguages,
      topRepos,
      recentActivity,
      totalRepos: repos.length,
    });

    return Response.json({ chunks, meta: { topLanguages, topRepos, recentActivity } });
  } catch (error) {
    console.error("GitHub sync error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function buildChunks({ profile, topLanguages, topRepos, recentActivity, totalRepos }) {
  const now = new Date().toISOString().slice(0, 10);

  const chunks = [
    {
      id: "github-overview",
      content: `(meta: github activity coding activity open source contributions)
GitHub Profile: ${profile.login} | Followers: ${profile.followers} | Following: ${profile.following}
Public Repositories: ${totalRepos} | Bio: ${profile.bio ?? "Full-stack developer"}
Profile URL: ${profile.html_url}
Last synced: ${now}`,
    },
    {
      id: "github-languages",
      content: `(meta: programming languages tech stack coding languages what languages do you use)
Top programming languages by code volume on GitHub:
${topLanguages.map((l) => `- ${l.lang}: ${l.percent}%`).join("\n")}
Last synced: ${now}`,
    },
    {
      id: "github-repos",
      content: `(meta: github projects repositories open source work)
Top GitHub repositories by stars:
${topRepos
  .map(
    (r) =>
      `- ${r.name} (${r.language ?? "N/A"}) ⭐ ${r.stars} | ${r.description ?? ""} | ${r.url} | Last pushed: ${r.pushedAt}`
  )
  .join("\n")}
Last synced: ${now}`,
    },
    {
      id: "github-recent-activity",
      content: `(meta: recent coding activity what have you been working on lately recent commits)
Recent GitHub push activity:
${recentActivity.length > 0
  ? recentActivity
      .map(
        (e) =>
          `- ${e.date} | ${e.repo} | Commits: ${e.commits.slice(0, 2).join("; ") || "pushed"}`
      )
      .join("\n")
  : "No recent public push activity found."}
Last synced: ${now}`,
    },
  ];

  return chunks;
}
