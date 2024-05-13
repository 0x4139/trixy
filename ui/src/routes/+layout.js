async function fetchAndParse(fetch, url) {
    const response = await fetch(url);
    return await response.json();
}

export async function load({fetch}) {
    const trendingCoins = await fetchAndParse(fetch, "api/trending-coins");
    const stats = await fetchAndParse(fetch, "api/stats");
    const chartPatternDetection = await fetchAndParse(fetch, "api/chart-pattern-detection");
    const productData = await fetchAndParse(fetch, "api/product-data");

    return {trendingCoins, stats, chartPatternDetection, productData};
}
