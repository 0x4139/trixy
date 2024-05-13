async function fetchAndParse(fetch, url) {
    const response = await fetch(url);
    return await response.json();
}

export async function load({fetch}) {
    const trendingCoins = await fetchAndParse(fetch, "api/trendingCoins");
    const stats = await fetchAndParse(fetch, "api/stats");
    const chartPatternDetection = await fetchAndParse(fetch, "api/chartPatternDetection");

    return {trendingCoins, stats, chartPatternDetection};
}
