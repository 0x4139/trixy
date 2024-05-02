import {writable} from 'svelte/store';
import * as lscache from 'lscache'

let menus = [{
    'text': 'Social', 'is_header': true
}, {
    'url': '/twitter', 'icon': 'fab fa-twitter', 'text': 'Twitter'
}, {
    'url': '/telegram', 'icon': 'fab fa-telegram', 'text': 'Telegram'
}, {
    'url': '/github', 'icon': 'fab fa-github', 'text': 'Github'
}, {
    'text': 'Navigation', 'is_header': true
}, {
    'url': '/', 'icon': 'fas fa-chart-bar', 'text': 'Dashboard'
}, {
    'url': '/coins', 'icon': 'fas fa-dollar-sign', 'text': 'Coins'
}, {
    'url': '/products', 'icon': 'fas fa-cubes', 'text': 'Products'
}, {
    'url': '/how-it-works', 'icon': 'fas fa-comments', 'text': 'How it Works'
}, {
    'url': '/privacy-policy', 'icon': 'fas fa-bookmark', 'text': 'Privacy Policy'
}, {
    'url': '/contact-us', 'icon': 'fas fa-address-book', 'text': 'Contact Us'
}];

const options = {method: 'GET', headers: {accept: 'application/json'}};

try {
    let trendingCoins = lscache.get("trendingCoins")
    if (!trendingCoins) {
        console.log("Invalid cache for Trending Coins, fetching.")
        const response = await fetch('https://api.coingecko.com/api/v3/search/trending', options)
        const result = await response.json()
        trendingCoins = result.coins.map((coin) => {
            return {
                is_coin: true, text: coin.item.name, icon: coin.item.small, url: `/coins/${coin.item.id}`
            }
        })
        lscache.set("trendingCoins", trendingCoins, 15)
    }

    if (trendingCoins) {
        menus = menus.concat([{
            'text': 'Featured Coins', 'is_header': true
        }, {
            is_coin: true,
            text: "Taraxa",
            icon: 'https://assets.coingecko.com/coins/images/4372/small/CPuCDZX.jpg?1696504972',
            url: `/coins/taraxa}`
        }])
        menus.push({
            'text': 'Trending Coins', 'is_header': true

        })
        menus = menus.concat(trendingCoins)
    }

} catch (e) {
    console.log(e)
}


// Create a writable store with the initial options
export const appSidebarMenus = writable(menus);
