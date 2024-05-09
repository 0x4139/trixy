// src/routes/api/+server.js

/**
 * Makes a GET request to retrieve trending coins data from Coingecko API.
 *
 * @param {object} options - The fetch options to be used for the GET request.
 * @param {function} options.fetch - The fetch function to be used for the GET request.
 * @returns {Promise<Response>} - A promise that resolves to a Response object containing the fetched data.
 */
export async function GET({fetch}) {
    const options = {method: "GET", headers: {accept: "application/json"}};
    const response = await fetch(
        "https://api.coingecko.com/api/v3/search/trending",
        options
    );

    if (!response.ok) {
        // handle fetch error
        return {status: response.status, body: await response.text()};
    }

    const result = await response.json();

    const trendingCoins = result.coins.map((coin) => ({
        is_coin: true,
        text: coin.item.name,
        icon: coin.item.small,
        url: `/coins/${coin.item.id}`,
    }));

    return new Response(JSON.stringify(trendingCoins));
}
