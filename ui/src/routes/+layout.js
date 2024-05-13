async function fetchAndParse(fetch, url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null; // or handle differently
  }
}

export async function load({ fetch, params }) {
  const trendingCoins = await fetchAndParse(fetch, "/api/trending-coins");
  const stats = await fetchAndParse(fetch, `/api/stats?coin=${params.slug}`);
  const chartPatternDetection = await fetchAndParse(
    fetch,
    `/api/chart-pattern-detection?coin=${params.slug}`,
  );
  const marketPatternsData = await fetchAndParse(
    fetch,
    `/api/market-patterns?coin=${params.slug}`,
  );
  const marketPatterns = marketPatternsData.list;
  const logsData = await fetchAndParse(fetch, `/api/logs?coin=${params.slug}`);
  const logs = logsData.list;

  return { trendingCoins, stats, chartPatternDetection, marketPatterns, logs };
}
