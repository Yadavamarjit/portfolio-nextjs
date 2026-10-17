import axios from "axios";

interface LocationResponse {
  city?: string;
  region?: string;
  country_name?: string;
  latitude?: number;
  longitude?: number;
}

export const userLocation = async (): Promise<LocationResponse | null> => {
  try {
    const response = await axios.get("https://ipapi.co/json", { timeout: 3000 });
    return response.data;
  } catch (err) {
    // Return null silently if rate limited or offline
    return null;
  }
};

export function getCookie(cname: string): string {
  if (typeof document === "undefined") return "";
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default getCookie;

let isBoarding = false;

export const onBoardUser = async () => {
  if (isBoarding) return;
  try {
    const existingUserId = getCookie("userId");
    if (!existingUserId) {
      isBoarding = true;
      const location = await userLocation();
      await axios.post("/api/users", location || {});
    }
  } catch (error) {
    // Silently handle onboarding errors
    console.warn("onBoardUser skipped:", (error as Error).message);
  } finally {
    isBoarding = false;
  }
};
