<script>
  import { onMount, onDestroy } from "svelte";
  import jQuery from "jquery";
  import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
  import "datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";
  import "datatables.net-fixedcolumns-bs5/css/fixedColumns.bootstrap5.min.css";
  import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";
  import "datatables.net/js/dataTables.min.js";
  import "datatables.net-bs5/js/dataTables.bootstrap5.min.js";
  import "datatables.net-buttons/js/dataTables.buttons.min.js";
  import "datatables.net-buttons/js/buttons.colVis.min.js";
  import "datatables.net-buttons/js/buttons.html5.min.js";
  import "datatables.net-buttons/js/buttons.print.min.js";
  import "datatables.net-buttons-bs5/js/buttons.bootstrap5.min.js";
  import "datatables.net-responsive/js/dataTables.responsive.min.js";
  import "datatables.net-responsive-bs5/js/responsive.bootstrap5.min.js";
  import "datatables.net-fixedcolumns/js/dataTables.fixedColumns.min.js";
  import "datatables.net-fixedcolumns-bs5/js/fixedColumns.bootstrap5.min.js";
  import { availableCoins } from "../../stores/appSearchCoins.js";
  import { appVariables } from "../../stores/appVariables.js";
  import ApexCharts from "../../components/plugins/ApexCharts.svelte";
  import { page } from "$app/stores";

  let table;
  let datatable;
  $: trendingCoins = $page.data.trendingCoins;
  $: console.log(trendingCoins[0]);

  onMount(async () => {
    window.jQuery = jQuery;

    if (jQuery) {
      datatable = jQuery(table).DataTable({
        dom: "<'row mb-3 mb-3'<'col-md-4 mb-3 mb-md-0'l><'col-md-8 text-right'<'d-flex justify-content-end'fB>>>t<'row align-items-center mt-3'<'mr-auto col-md-6 mb-3 mb-md-0'i><'mb-0 col-md-6'p>>",
        lengthMenu: [10, 20, 30, 40, 50],
        responsive: true,
        buttons: [
          { extend: "print", className: "btn btn-outline-default btn-sm ms-2" },
          { extend: "csv", className: "btn btn-outline-default btn-sm" },
        ],
      });
    }
  });

  onDestroy(() => {
    if (datatable) {
      datatable.destroy();
    }
  });

  function getSparkLine(sparkline, color) {
    console.log(color);
    return {
      chart: { height: "30px", type: "line", sparkline: { enabled: true } },
      colors: [color],
      stroke: { curve: "straight", width: 2 },
      series: [
        {
          name: "Price",
          data: sparkline,
        },
      ],
    };
  }

  function getCirculatingSupply(marketCap, price) {
    return (marketCap / price).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
</script>

<ul class="breadcrumb">
  <li class="breadcrumb-item"><a href="#/">TRIXY</a></li>
  <li class="breadcrumb-item active">COINS</li>
</ul>
<h1 class="page-header">Coins <small>Today's Prices by Market Cap</small></h1>
<hr class="mb-5" />
<table bind:this={table} class="table text-center w-100">
  <thead>
    <tr>
      <th>Rank</th>
      <th>Name</th>
      <th>Price</th>
      <th>Change</th>
      <th>Volume</th>
      <th>Market Cap</th>
      <th>Circulating Supply</th>
      <th>Last 7 days</th>
    </tr>
  </thead>
  <tbody>
    {#each trendingCoins as coin}
      <tr>
        <td>{coin.rank}</td>
        <td>
          <img
            alt={coin.name}
            style="height: 24px; width: 24px;"
            class="me-2 rounded-4"
            src={coin.icon}
          /><a href={`/coins/${coin.id}`}>{coin.name}</a>
          <span class="text-secondary text-uppercase">{coin.symbol}</span>
        </td>
        <td class="daily">{coin.price_usd.toFixed(10).toLocaleString()}</td>
        <td
          class={coin.price_change_percentage_24h.usd > 0 ? "text-theme" : "text-danger"}
          >{coin.price_change_percentage_24h.usd.toFixed(4).toLocaleString()}%</td
        >
        <td>{coin.volume_usd.toLocaleString()}</td>
        <td>{coin.market_cap_usd.toLocaleString()}</td>
        <td>
          {getCirculatingSupply(coin.market_cap_usd, coin.price_usd)}
        </td>
        <td class="sparkline">
          <img src={coin.sparkline_svg} alt="" height="30" />
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  td {
    text-align: left;
  }
</style>
