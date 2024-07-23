import { json } from "@sveltejs/kit";

export async function GET({ fetch, url }) {
  const coin = url.searchParams.get("coin");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${baseUrl}/market-patterns?coin=${coin}`);
  const marketPatterns = await response.json();
  if (marketPatterns.errors) {
    throw new Error(marketPatterns.errors);
  }
  return json(marketPatterns);
}
