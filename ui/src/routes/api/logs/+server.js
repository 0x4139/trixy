import { json } from "@sveltejs/kit";

export async function GET({ fetch, url }) {
  const coin = url.searchParams.get("coin");
  const response = await fetch(`http://localhost:3000/logs?coin=${coin}`);

  const logs = await response.json();
  if (logs.errors) {
    throw new Error(logs.errors);
  }
  return json(logs);
}
