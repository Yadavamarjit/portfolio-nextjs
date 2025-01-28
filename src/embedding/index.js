import OpenAI from "openai";
import { openaiApiKey } from "../config/envConfig";
import { initPinecone } from "../DB/pincone";

const professionalData = [
  // {
  //   id: "1",
  //   content:
  //     "(meta : introduction about yourself tell me about yourself who are you) Led end-to-end development of enterprise React applications serving 100,000+ monthly active users, achieving 99.9% uptime and reducing page load times from 3.2s to 0.8s through performance optimization and implementing React Server Components. Engineered a cross-platform checkout system with advanced discount mechanisms, resulting in a 35% increase in customer engagement and 20% revenue growth, while managing secure transactions and promotional campaigns across multiple e-commerce stores. Demonstrated expertise in leading agile development teams to deliver enterprise-scale e-commerce solutions with 40% faster time-to-market than industry standards.",
  // },
  // {
  //   id: "2",
  //   content:
  //     "(meta : skills techstacks technologies) Programming Languages: JavaScript (ES6+), TypeScript, Python. Frontend Technologies: React.js, Next.js, Redux, HTML5, CSS3, Tailwind CSS, Material-UI. Backend & Databases: Node.js, Express.js, GraphQL, MongoDB, DynamoDB. Cloud & DevOps: AWS (EC2, S3, Lambda, CloudFront), CI/CD. Tools & Practices: Git, GitLab, JIRA, Agile Methodologies, REST APIs, LLM.",
  // },
  // {
  //   id: "3",
  //   content:
  //     "(meta : experience work experience) Dpanda | Tech Lead (Jan 2024 - Present) – Microsite Optimization and Customization: Engineered advanced performance optimization strategies, achieving a 45% reduction in page load times, which led to a 10% increase in user engagement and a seamless user experience. Developed reusable and customizable components, enabling microsite themes to be tailored to different publisher applications. Spearheaded and mentored a high-performing team of 4 developers, driving the optimization of site performance and consistently delivering exceptional user experiences, resulting in measurable improvements in engagement and performance. Notification Manager Development: Designed and developed an end-to-end notification management system, supporting WebSocket communication using Socket.IO, Node.js, Express.js, and EC2. Built an intuitive real-time dashboard for sending targeted notifications to users and monitoring live traffic. Enabled real-time traffic analytics for publishers with <100ms latency, enhancing operational visibility and efficiency. Borderfree Technologies | Software Developer (Oct 2021 - Jan 2024) – Cross-platform Checkout Integration and Discount Mechanism: Architected a robust and seamless checkout integration, facilitating secure transactions across multiple stores. Designed and implemented advanced discount strategies, including percentage-based, promotional codes, and targeted offers, driving a 35% increase in customer engagement. Boosted sales revenue by 20% through data-driven promotional campaigns and enhanced user experiences. Revo Shopify Integration: Developed OAuth 2.0-based authentication system supporting 1000+ merchant connections. Automated store setup process reducing integration time from 2 hours to 5 minutes. Achieved 98% positive merchant feedback with a 60% reduction in support tickets. Internet Speed Test: Developed an interactive speed test tool, delivering instant and accurate upload/download speed metrics for over 20,000 monthly users. Optimized performance evaluation for live streaming scenarios, improving speed analysis accuracy by 25%. Empowered users to make data-driven decisions about their internet connectivity, enhancing usability and reliability.",
  // },
  {
    id: "4",
    content:
      " (meta : projects projects you have done your projects your personal projects ) Project:Fruit Catcher: In this engaging fruit catcher game, players strive to catch falling fruits while avoiding obstacles. The game features a dynamic leaderboard to track top scores, and various in-game power-ups that enhance the gameplay experience. With its intuitive mechanics and exciting challenges, players are rewarded for their skills and quick reflexes as they compete for the highest score project-Link:https://fruits-catcher.netlify.app/ project-image:https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/1723885548610_Screencastfrom2024-08-1300-51-19-ezgif.com-video-to-gif-converter.gif?alt=media&token=784564de-a40b-434c-a42e-5e647fdbed2b. StockScope:A dynamic user interface that displays real-time stock prices and their detailed analysis, powered by mock data. Designed for intuitive use, it offers insights into stock trends, enabling users to efficiently track and assess stock performance project-link:https://tradingscreen.netlify.app/ project-image:https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/Screencastfrom2024-09-2215-22-12-ezgif.com-optimize.gif?alt=media&token=0e95e191-901d-4f7b-8079-d740dc0fe7c7. QTrip:Your virtual travel hub for immersive exploration. Discover destinations with tags like cycling and skiing, simulate reservations, and manage bookings. Experience hourly activity booking and dive into detailed descriptions and images. Plan your dream journey authentically without real transactions – an innovative way to connect with travel interests project-image:https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/1705453911139_qtrip.png?alt=media&token=26526642-e083-460d-af18-c205f4b5651f. QKart : Qkart is an e-commerce web app designed to offer a seamless shopping experience. It features user authentication, allowing secure access to personalized accounts. The app also includes an Add to Cart functionality, enabling users to easily manage their desired products. Additionally, Qkart offers a demo payment system, providing a complete and interactive shopping experience from selection to checkout project-image:https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/1705451392416_Screenshot%202024-01-17%20055826.png?alt=media&token=7b89a1cd-26a4-4546-82fb-5fb4ba22609d. ",
  },
  // {
  //   id: "5",
  //   content:
  //     " (meta : hobbies activities interests extra activities) gyming, bike riding on landscapes, MMA, staying updated with new technologies, and gaming",
  // },

  // {
  //   id: "6",
  //   content:
  //     "(meta : resume share your resume) link : https://drive.google.com/file/d/1JC_FaFy63xwiPnEnbkEBfWiAREO8kCJb/view?usp=sharing",
  // },
  // {
  //   id: "7",
  //   content:
  //     "(meta : what is yout email address share your github link share your linkedin profile share your whats app number share yout social media links email address what's app social media linkedin github social media link ) email: yadavamarjit772@gmail.com whatsapp:+917850847374 linkedIn:https://www.linkedin.com/in/yadav-amarjit/ github:https://github.com/Yadavamarjit",
  // },
  // {
  //   id: "8",
  //   content:
  //     "(meta : What is your expected salary what is your salary expectation ) I am looking for a salary in the range of 60000 Euro to 75000 Euro per annum. For negotiation, I am open to discussing the salary based on the job role and responsibilities you can mail me at yadavamarjit772@gmail.com or schedule a meet using calendly link: https://calendly.com/yadavamarjit772/30min.",
  // },
];

export async function generateEmbedding(text) {
  const openai = new OpenAI({
    apiKey: openaiApiKey,
  });

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return response.data[0].embedding;
}

export async function storeEmbeddings() {
  const index = initPinecone();

  const upserts = [];
  for (const item of professionalData) {
    const embedding = await generateEmbedding(item.content);
    console.log("Embedding generated for:", embedding);
    upserts.push({
      id: item.id, // Unique identifier
      values: embedding, // Vector values
      metadata: { content: item.content },
    });
  }
  await index.namespace("info").upsert(upserts);
  console.log("Embeddings stored successfully in Pinecone!");
}

export async function searchEmbeddings(query, topK = 3) {
  const index = initPinecone();
  const queryEmbedding = await generateEmbedding(query);

  // Search for the top K similar vectors
  const result = await index.namespace("info").query({
    vector: queryEmbedding,
    topK,
    includeMetadata: true,
  });
  console.log("Search result:", result);
  return result.matches.map((match) => ({
    id: match.id,
    content: match.metadata.content,
    score: match.score,
  }));
}
