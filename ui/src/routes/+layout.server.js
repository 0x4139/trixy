import { v4 as uuidv4 } from "uuid";

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

export async function load({ fetch, params, cookies }) {
  // Create a unique cookie name by appending the coin's slug
  const cookieName = `conversation-${params.slug}`;

  // Try to retrieve the conversation ID from the cookie specific to this coin
  let conversationId = cookies.get(cookieName);
  if (!conversationId) {
    console.log(
      "No conversation ID found in cookie for coin:",
      params.slug,
      "Creating new one.",
    );
    conversationId = uuidv4();
    cookies.set(cookieName, conversationId, {
      path: `/coins/${params.slug}`, // Set the path to the current coin's slug
    });
  }
  console.log("Conversation ID:", conversationId, " for coin:", params.slug);
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
  const trafficData = await fetchAndParse(fetch, `/api/traffic-data?coin=${params.slug}`);

  return {
    trendingCoins,
    stats,
    chartPatternDetection,
    marketPatterns,
    logs,
    trafficData,
    conversationId,
  };
}
