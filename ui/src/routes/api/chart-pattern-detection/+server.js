export async function GET({ fetch, url }) {
  const coin = url.searchParams.get("coin");
  const response = await fetch(
    `http://localhost:3000/chart-pattern-detection?coin=${coin}`,
  );
  const chartPatternDetection = await response.json();
  if (chartPatternDetection.errors) {
    throw new Error(chartPatternDetection.errors);
  }
  return new Response(JSON.stringify(chartPatternDetection));
}
