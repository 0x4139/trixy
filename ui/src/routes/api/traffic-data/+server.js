import { json } from "@sveltejs/kit";

export async function GET({ fetch, url }) {
  const coin = url.searchParams.get("coin");
  const response = await fetch(`http://localhost:3000/traffic-data?coin=${coin}`);
  const trafficData = await response.json();
  if (trafficData.errors) {
    throw new Error(trafficData.errors);
  }
  return json(trafficData);
}
