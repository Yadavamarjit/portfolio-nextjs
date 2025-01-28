import { storeEmbeddings } from "../../../embedding";
export async function POST(req) {
  try {
    await storeEmbeddings();
    return new Response(
      JSON.stringify({
        message: "Embeddings stored successfully in Pinecone!",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
