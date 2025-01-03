import { Pinecone } from "@pinecone-database/pinecone";
import { pineconeApiKey } from "../config/envConfig";

const client = new Pinecone({ apiKey: pineconeApiKey });

export function initPinecone() {
  return client.Index("professional-data");
}
