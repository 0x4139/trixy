export async function GET({ fetch, url }) {
  const coin = url.searchParams.get("coin");
  const response = await fetch(`http://localhost:3000/stats?coin=${coin}`);
  const stats = await response.json();
  if (stats.errors) {
    throw new Error(stats.errors);
  }
  return new Response(JSON.stringify(stats));
}
