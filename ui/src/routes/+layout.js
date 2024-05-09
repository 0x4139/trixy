async function fetchAndParse(fetch, url) {
  const response = await fetch(url);
  return await response.json();
}

export async function load({ fetch }) {
  const trendingCoins = await fetchAndParse(fetch, "api/trendingCoins");
  const communityMessages = await fetchAndParse(fetch, "api/communityMessages");

  return { trendingCoins, communityMessages };
}
