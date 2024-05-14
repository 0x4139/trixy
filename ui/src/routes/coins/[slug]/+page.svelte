<script>
  import { onMount, onDestroy } from "svelte";
  import {
    setPageTitle,
    formatNumberWithK,
    formatPercentageChange,
    insertChevronIconBasedOnValue,
    getChartColorsArray,
    getTimeAgo,
  } from "$lib/utils";
  import { appVariables } from "/src/stores/appVariables.js";
  import Card from "/src/components/bootstrap/Card.svelte";
  import CardBody from "/src/components/bootstrap/CardBody.svelte";
  import CardHeader from "/src/components/bootstrap/CardHeader.svelte";
  import CardFooter from "/src/components/bootstrap/CardFooter.svelte";
  import CardExpandToggler from "/src/components/bootstrap/CardExpandToggler.svelte";
  import PerfectScrollbar from "/src/components/plugins/PerfectScrollbar.svelte";
  import ApexCharts from "/src/components/plugins/ApexCharts.svelte";
  import "jsvectormap/dist/css/jsvectormap.min.css";
  import { availableCoins } from "../../../stores/appSearchCoins.js";
  import { page } from "$app/stores";

  let statsData;
  let serverData;
  let trafficData;
  let jsVectormap;
  let logs;
  let unsubscribe;

  $: ({ communityMessages, marketData, sentimentAnalysis, topics, kolTracking } =
    $page.data.stats);
  $: chartPatternDetection = $page.data.chartPatternDetection;
  $: marketPatterns = $page.data.marketPatterns;
  $: trendingCoins = $page.data.trendingCoins;
  $: currentCoin = getCurrentCoin(trendingCoins);
  $: logs = $page.data.logs;

  function randomNo() {
    return Math.floor(Math.random() * 60) + 30;
  }

  function getCurrentCoin(coins) {
    return coins.find((coin) => coin.id === $page.params.slug) || $availableCoins[0];
  }

  function getStatsData(appVariables) {
    statsData = [
      {
        size: 6,
        title: "COMMUNITY MESSAGES",
        total: formatNumberWithK(communityMessages.total),
        info: [
          {
            icon: insertChevronIconBasedOnValue(communityMessages.weekChangePercentage),
            text:
              formatPercentageChange(communityMessages.weekChangePercentage) +
              " last week",
          },
          {
            icon: "far fa-user fa-fw me-1",
            text: communityMessages.newUsersPercentage + " new visitors",
          },
          {
            icon: "far fa-clock fa-fw me-1",
            text: communityMessages.messagesPerHour + " messages per hour",
          },
        ],
        chartOptions: {
          chart: {
            height: "30px",
            type: "bar",
            sparkline: { enabled: true },
          },
          colors: [appVariables.color.theme],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "65%",
              endingShape: "rounded",
            },
          },
          series: [
            {
              name: "Messages",
              data: communityMessages.chartData,
            },
          ],
        },
      },
      {
        size: 6,
        title: "MARKET DATA",
        total: "$" + marketData.price,
        info: [
          {
            icon: insertChevronIconBasedOnValue(marketData.changePercentage),
            text: formatPercentageChange(marketData.changePercentage) + " a day ago", //TODO: decide period of time
          },
          {
            icon: "fa fa-balance-scale fa-fw me-1",
            text: "$" + marketData.tradingVolume.toLocaleString() + " trading volume",
          },
          {
            icon: "fa fa-align-justify fa-fw me-1",
            text: "$" + marketData.spread + " spread",
          },
        ],
        chartOptions: {
          chart: {
            height: "30px",
            type: "line",
            sparkline: { enabled: true },
          },
          colors: [appVariables.color.theme],
          stroke: { curve: "straight", width: 2 },
          series: [
            {
              name: "Price",
              data: marketData.chartData,
            },
          ],
        },
      },
      {
        size: 6,
        title: "SENTIMENT ANALYSIS",
        total: formatNumberWithK(sentimentAnalysis.total),
        info: [
          {
            icon: insertChevronIconBasedOnValue(sentimentAnalysis.weekChangePercentage),
            text:
              formatPercentageChange(sentimentAnalysis.weekChangePercentage) +
              " last week",
          },
          {
            icon: "fas fa-compass fa-fw me-1",
            text: sentimentAnalysis.totalEmotions.toLocaleString() + " total emotions",
          },
          {
            icon: "fas fa-chart-line fa-fw me-1",
            text: sentimentAnalysis.sentimentChangePercentage + "% sentiment change",
          },
        ],
        chartClass: "mb-n2",
        chartOptions: {
          chart: {
            height: "45px",
            type: "pie",
            sparkline: { enabled: true },
          },
          colors: getChartColorsArray(appVariables, [
            sentimentAnalysis.pieChartData.positive,
            sentimentAnalysis.pieChartData.negative,
            sentimentAnalysis.pieChartData.neutral,
          ]),
          stroke: { show: false },
          labels: ["Positive", "Negative", "Neutral"],
          series: [
            sentimentAnalysis.pieChartData.positive,
            sentimentAnalysis.pieChartData.negative,
            sentimentAnalysis.pieChartData.neutral,
          ],
        },
      },
      {
        size: 6,
        title: "TOPICS",
        total: topics.total.toLocaleString(),
        info: [
          {
            icon: insertChevronIconBasedOnValue(topics.weekChangePercentage),
            text: formatPercentageChange(topics.weekChangePercentage) + " last week",
          },
          {
            icon: "far fa-hdd fa-fw me-1",
            text: topics.totalTopics + " total topics",
          },
          {
            icon: "fas fa-tasks fa-fw me-1",
            text: topics.topicsLast24h + " new topics in 24h",
          },
        ],
        chartClass: "mb-n2",
        chartOptions: {
          chart: {
            height: "45px",
            type: "donut",
            sparkline: { enabled: true },
          },
          colors: getChartColorsArray(appVariables, topics.pieChartData),
          stroke: {
            show: false,
            curve: "smooth",
            lineCap: "butt",
            colors: "rgba(" + appVariables.color.blackRgb + ", .25)",
            width: 2,
            dashArray: 0,
          },
          plotOptions: {
            pie: { donut: { background: "transparent" } },
          },
          series: topics.pieChartData,
        },
      },
      {
        size: 12,
        sizing: {
          left: 4,
          right: 8,
        },
        title: "KOL TRACKING",
        total: formatNumberWithK(kolTracking.totalMessages) + " MESSAGES",
        info: [
          {
            icon: insertChevronIconBasedOnValue(kolTracking.weekChangePercentage),
            text: formatPercentageChange(kolTracking.weekChangePercentage) + " last week",
          },
          {
            icon: "fas fa-thermometer-empty fa-fw me-1",
            text: kolTracking.percentOfTotalCommunity + "% of total community",
          },
          {
            icon: "fas fa-users fa-fw me-1",
            text: kolTracking.totalUsers + " total users",
          },
        ],
        chartClass: "mb-n2",
        chartOptions: {
          chart: { height: "270px", type: "bubble" },
          colors: getChartColorsArray(
            appVariables,
            kolTracking.chartData.map((user) => user.data.positiveSentimentPercentage),
          ),
          stroke: {
            show: false,
            curve: "smooth",
            lineCap: "butt",
            colors: "rgba(" + appVariables.color.blackRgb + ", .25)",
            width: 2,
            dashArray: 0,
          },
          dataLabels: { enabled: false },
          fill: { opacity: 0.8 },
          xaxis: { tickAmount: 8, type: "category" },
          yaxis: {
            min: 0,
            max:
              1.2 *
              Math.max(...kolTracking.chartData.map((item) => item.data.influenceScore)),
          },
          series: kolTracking.chartData.map((userChartData) => ({
            name: userChartData.name,
            data: [
              [
                userChartData.data.messagesSent,
                userChartData.data.influenceScore,
                userChartData.data.marketMovementCorrelations,
              ],
            ],
          })),
        },
      },
    ];
  }

  function getServerData(appVariables) {
    serverData = {
      chartOptions: {
        series: [
          {
            data: chartPatternDetection.chartData,
          },
        ],
        colors: [
          "rgba(" + appVariables.color.inverseRgb + ", .25)",
          appVariables.color.theme,
        ],
        fill: { opacity: 0.65 },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
            },
          },
        },
        chart: {
          height: "100%",
          type: "candlestick",
          toolbar: { show: true },
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: appVariables.color.success,
              downward: appVariables.color.danger,
            },
            wick: { useFillColor: true },
          },
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: { tooltip: { enabled: true } },
        dataLabels: { enabled: false },
        grid: {
          show: true,
          borderColor: "rgba(" + appVariables.color.inverseRgb + ", .15)",
        },
        stroke: { show: false },
      },
      stats: [
        {
          name: "DETECTED PATTERNS",
          total:
            chartPatternDetection.detectedPatterns.detectedTicks +
            " / " +
            chartPatternDetection.detectedPatterns.totalTicks +
            " Ticks",
          progress:
            (chartPatternDetection.detectedPatterns.detectedTicks /
              chartPatternDetection.detectedPatterns.totalTicks) *
              100 +
            "%",
          time:
            "Last updated " +
            getTimeAgo(chartPatternDetection.detectedPatterns.lastUpdateTime),
          info: [
            {
              title: "BULLISH",
              value: chartPatternDetection.detectedPatterns.bullish,
              class: "text-theme",
            },
            {
              title: "BEARISH",
              value: chartPatternDetection.detectedPatterns.bearish,
              class: "text-theme text-opacity-50",
            },
            {
              title: "NEUTRAL",
              value: chartPatternDetection.detectedPatterns.neutral,
              class: "text-theme text-opacity-50",
            },
          ],
          chartOptions: {
            chart: {
              height: 50,
              type: "donut",
              sparkline: { enabled: true },
            },
            colors: [
              "rgba(" + appVariables.color.themeRgb + ", .15)",

              "rgba(" + appVariables.color.themeRgb + ", .55)",

              "rgba(" + appVariables.color.themeRgb + ", .95)",
            ],
            stroke: {
              show: false,
              curve: "smooth",
              lineCap: "butt",
              colors: "rgba(" + appVariables.color.blackRgb + ", .25)",
              width: 2,
              dashArray: 0,
            },
            plotOptions: {
              pie: { donut: { background: "transparent" } },
            },
            series: [
              chartPatternDetection.detectedPatterns.bearish,
              chartPatternDetection.detectedPatterns.neutral,
              chartPatternDetection.detectedPatterns.bullish,
            ],
          },
        },
        {
          name: "CONFIRMED PATTERNS",
          total:
            chartPatternDetection.confirmedPatterns.confirmed +
            " / " +
            chartPatternDetection.confirmedPatterns.total +
            " Total",
          progress:
            (chartPatternDetection.confirmedPatterns.confirmed /
              chartPatternDetection.confirmedPatterns.total) *
              100 +
            "%",
          time:
            "Last updated " +
            getTimeAgo(chartPatternDetection.confirmedPatterns.lastUpdateTime),
          info: [
            {
              title: "BULLISH",
              value: chartPatternDetection.confirmedPatterns.bullish + "%",
              class: "text-theme",
            },
            {
              title: "BEARISH",
              value: chartPatternDetection.confirmedPatterns.bearish + "%",
              class: "text-theme text-opacity-50",
            },
            {
              title: "NEUTRAL",
              value: chartPatternDetection.confirmedPatterns.neutral + "%",
              class: "text-theme text-opacity-50",
            },
          ],
          chartOptions: {
            chart: {
              height: 50,
              type: "donut",
              sparkline: { enabled: true },
            },
            colors: [
              "rgba(" + appVariables.color.themeRgb + ", .15)",

              "rgba(" + appVariables.color.themeRgb + ", .55)",

              "rgba(" + appVariables.color.themeRgb + ", .95)",
            ],
            stroke: {
              show: false,
              curve: "smooth",
              lineCap: "butt",
              colors: "rgba(" + appVariables.color.blackRgb + ", .25)",
              width: 2,
              dashArray: 0,
            },
            plotOptions: {
              pie: { donut: { background: "transparent" } },
            },
            series: [
              chartPatternDetection.confirmedPatterns.bearish,
              chartPatternDetection.confirmedPatterns.neutral,
              chartPatternDetection.confirmedPatterns.bullish,
            ],
          },
        },
      ],
    };
  }

  function getTrafficData(appVariables) {
    trafficData = {
      country: [
        { name: "FRANCE", visits: "13,849", pct: "40.79%", class: "" },
        { name: "SPAIN", visits: "3,216", pct: "9.79%", class: "" },
        {
          name: "MEXICO",
          visits: "1,398",
          pct: "4.26%",
          class: "fw-bold text-theme",
        },
        {
          name: "UNITED STATES",
          visits: "1,090",
          pct: "3.32%",
          class: "",
        },
        { name: "BELGIUM", visits: "1,045", pct: "3.18%", class: "" },
      ],
      source: [
        {
          name: "NEUTRAL",
          percentage: "25.70%",
          class: "bg-theme bg-opacity-95",
        },
        {
          name: "POSITIVE",
          percentage: "24.30%",
          class: "bg-theme bg-opacity-75",
        },
        {
          name: "DISAPPOINTMENT",
          percentage: "23.05%",
          class: "bg-theme bg-opacity-55",
        },
        {
          name: "INQUIRY",
          percentage: "14.85%",
          class: "bg-theme bg-opacity-35",
        },
        {
          name: "CURIOSITY",
          percentage: "7.35%",
          class: "bg-theme bg-opacity-15",
        },
      ],
      chart: {
        options: {
          chart: {
            height: 70,
            type: "donut",
            sparkline: { enabled: true },
          },
          colors: [
            "rgba(" + appVariables.color.themeRgb + ", .15)",
            "rgba(" + appVariables.color.themeRgb + ", .35)",
            "rgba(" + appVariables.color.themeRgb + ", .55)",
            "rgba(" + appVariables.color.themeRgb + ", .75)",
            "rgba(" + appVariables.color.themeRgb + ", .95)",
          ],
          stroke: {
            show: false,
            curve: "smooth",
            lineCap: "butt",
            colors: "rgba(" + appVariables.color.blackRgb + ", .25)",
            width: 2,
            dashArray: 0,
          },
          plotOptions: {
            pie: { donut: { background: "transparent" } },
          },
          series: [randomNo(), randomNo(), randomNo(), randomNo(), randomNo()],
        },
      },
    };

    document.getElementById("map-container").innerHTML = '<div id="map"></div>';
    var map = new jsVectorMap({
      selector: "#map",
      map: "world",
      zoomButtons: true,
      normalizeFunction: "polynomial",
      hoverOpacity: 0.5,
      hoverColor: false,
      zoomOnScroll: false,
      series: { regions: [{ normalizeFunction: "polynomial" }] },
      labels: { markers: { render: (marker) => marker.name } },
      focusOn: { x: 0.5, y: 0.5, scale: 1 },
      markers: [
        { name: "Egypt", coords: [26.8206, 30.8025] },
        { name: "Russia", coords: [61.524, 105.3188] },
        { name: "Canada", coords: [56.1304, -106.3468] },
        { name: "Greenland", coords: [71.7069, -42.6043] },
        { name: "Brazil", coords: [-14.235, -51.9253] },
      ],
      markerStyle: {
        initial: {
          fill: appVariables.color.theme,
          stroke: "none",
          r: 5,
        },
        hover: { fill: appVariables.color.theme },
      },
      markerLabelStyle: {
        initial: {
          fontFamily: appVariables.font.bodyFontFamily,
          fontSize: "12px",
          fill: "rgba(" + appVariables.color.inverseRgb + ", .75)",
        },
      },
      regionStyle: {
        initial: {
          fill: appVariables.color.inverse,
          fillOpacity: 0.35,
          stroke: "none",
          strokeWidth: 0.4,
          strokeOpacity: 1,
        },
        hover: { fillOpacity: 0.5 },
      },
      backgroundColor: "transparent",
    });
  }

  onMount(async () => {
    jsVectormap = await import("jsvectormap");
    await import("jsvectormap/dist/maps/world.js");

    unsubscribe = appVariables.subscribe((value) => {
      if (value.color) {
        getStatsData(value);
        getServerData(value);
        getTrafficData(value);
      }
    });
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
</script>

<svelte:head>
  <title>TRIXY | {currentCoin.name}</title>
</svelte:head>

<ul class="breadcrumb">
  <li class="breadcrumb-item"><a href="#/">TRIXY</a></li>
  <li class="breadcrumb-item active">{currentCoin.name}</li>
</ul>
<h1 class="page-header">
  <img
    class="rounded-5 me-3"
    alt={currentCoin.name}
    src={currentCoin.icon}
  />{currentCoin.name}
  <small class="text-uppercase">{currentCoin.symbol}</small>
</h1>
<!-- BEGIN row -->
<div class="row">
  <div class="col-xl-6">
    <div class="row">
      {#if statsData}
        {#each statsData as stat}
          <div class="col-xl-{stat.size}">
            <Card class="mb-3">
              <CardBody>
                <!-- BEGIN title -->
                <div class="d-flex fw-bold small mb-3">
                  <span class="flex-grow-1">{stat.title}</span>
                  <CardExpandToggler />
                </div>
                <!-- END title -->
                <!-- BEGIN stat-lg -->
                <div class="row align-items-center mb-2">
                  <div class="col-{stat.sizing?.left ? stat.sizing.left : 7}">
                    <h3 class="mb-0">{stat.total}</h3>
                  </div>
                  <div class="col-{stat.sizing?.right ? stat.sizing.right : 5}">
                    <div class="mt-n2 {stat.chartClass}">
                      {#if stat.chartOptions}
                        <ApexCharts options={stat.chartOptions}></ApexCharts>
                      {/if}
                    </div>
                  </div>
                </div>
                <!-- END stat-lg -->
                <!-- BEGIN stat-sm -->
                <div class="small text-inverse text-opacity-50 text-truncate">
                  {#if stat.info}
                    {#each stat.info as info}
                      <div>
                        <i class={info.icon}></i>
                        {info.text}
                      </div>
                    {/each}
                  {/if}
                </div>
                <!-- END stat-sm -->
              </CardBody>
            </Card>
          </div>
        {/each}
      {/if}
    </div>
  </div>
  <div class="col-xl-6">
    <div class="mb-3">
      <Card>
        <CardHeader class="bg-none fw-bold d-flex align-items-center">
          <div class="flex-1">ASK TRIXY</div>
          <CardExpandToggler></CardExpandToggler>
        </CardHeader>
        <PerfectScrollbar class="h-200">
          <CardBody class="bg-inverse bg-opacity-10">
            <div class="widget-chat">
              <div class="widget-chat-item reply">
                <div class="widget-chat-content">
                  <div class="widget-chat-message last">What is Taraxa?</div>
                  <div class="widget-chat-status">
                    <b>Read</b> 16:26
                  </div>
                </div>
              </div>
              <div class="widget-chat-item">
                <!--                                <div class="widget-chat-media"><img src="/img/user/user-2.jpg" alt=""/></div>-->
                <div class="widget-chat-content">
                  <div class="widget-chat-name">TRIXY</div>
                  <div class="widget-chat-message last">
                    Taraxa is a smart contract platform compatible with Ethereum Virtual
                    Machine (EVM) and uses a t-Graph consensus mechanism incorporating
                    blockDAG.
                  </div>
                </div>
              </div>
              <div class="widget-chat-item reply">
                <div class="widget-chat-content">
                  <div class="widget-chat-message last">
                    How is the token being distributed?
                  </div>
                  <div class="widget-chat-status">
                    <b>Read</b> 16:26
                  </div>
                </div>
              </div>
              <div class="widget-chat-item">
                <!--                                <div class="widget-chat-media"><img src="/img/user/user-2.jpg" alt=""/></div>-->
                <div class="widget-chat-content">
                  <div class="widget-chat-name">TRIXY</div>
                  <div class="widget-chat-message last">
                    <p>
                      Here&#39;s a simplified message outlining Taraxa&#39;s token
                      distribution:
                    </p>
                    <hr />
                    <p>
                      <strong>Taraxa Token Distribution:</strong>
                    </p>
                    <ul>
                      <li>
                        <strong>Community</strong>: 37%
                      </li>
                      <li>
                        <strong>Foundation</strong>: 20%
                      </li>
                      <li>
                        <strong>Private Sale</strong>: 15%
                      </li>
                      <li><strong>Team</strong>: 15%</li>
                      <li>
                        <strong>Seed Sale</strong>: 9%
                      </li>
                      <li>
                        <strong>Public Sale</strong>: 4%
                      </li>
                    </ul>
                    <p>
                      This allocation supports ecosystem development, rewards the
                      community, incentivizes the team, and engages investors through
                      sales.
                    </p>
                  </div>
                </div>
              </div>
              <div class="widget-chat-date">Today 14:21</div>
            </div>
          </CardBody>
        </PerfectScrollbar>
        <CardFooter class="bg-none">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search for..." />
            <button class="btn btn-outline-default" type="button"
              ><i class="fa fa-paper-plane text-muted"></i>
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  </div>

  <!-- BEGIN server-stats -->
  <div class="col-xl-6">
    <Card class="mb-3">
      <CardBody>
        <div class="d-flex fw-bold small mb-3">
          <span class="flex-grow-1">CHART PATTERN DETECTION</span>
          <CardExpandToggler />
        </div>
        <div class="ratio ratio-21x9 mb-3">
          {#if serverData && serverData.chartOptions}
            <ApexCharts options={serverData.chartOptions}></ApexCharts>
          {/if}
        </div>
        <div class="row">
          {#if serverData && serverData.stats}
            {#each serverData.stats as stat}
              <div class="col-lg-6 mb-3 mb-lg-0">
                <div class="d-flex align-items-center">
                  <div class="w-50px h-50px">
                    {#if stat.chartOptions}
                      <ApexCharts options={stat.chartOptions}></ApexCharts>
                    {/if}
                  </div>
                  <div class="ps-3 flex-1">
                    <div class="fs-10px fw-bold text-inverse text-opacity-50 mb-1">
                      {stat.name}
                    </div>
                    <div class="mb-2 fs-5 text-truncate">
                      {stat.total}
                    </div>
                    <div class="progress h-3px mb-1">
                      <div
                        class="progress-bar bg-theme"
                        style="width: {stat.progress}"
                      ></div>
                    </div>
                    <div class="fs-11px text-inverse text-opacity-50 mb-2 text-truncate">
                      {stat.time}
                    </div>
                    {#if stat.info}
                      {#each stat.info as info}
                        <div class="d-flex align-items-center small">
                          <i class={"bi bi-circle-fill fs-6px me-2 " + info.class}></i>
                          <div class="flex-1">
                            {info.title}
                          </div>
                          <div>{info.value}</div>
                        </div>
                      {/each}
                    {/if}
                  </div>
                </div>
              </div>
            {/each}
          {/if}
        </div>
      </CardBody>
    </Card>
  </div>
  <!-- END server-stats -->

  <!-- BEGIN traffic-analytics -->
  <div class="col-xl-6">
    <Card class="mb-3">
      <CardBody>
        <div class="d-flex fw-bold small mb-3">
          <span class="flex-grow-1">COMMUNITY CULTURAL ANALYTICS</span>
          <CardExpandToggler />
        </div>
        <div class="ratio ratio-21x9 mb-3">
          <div class="jvm-without-padding" id="map-container"></div>
        </div>

        <div class="row gx-4">
          <div class="col-lg-6 mb-3 mb-lg-0">
            <table class="w-100 small mb-0 text-truncate text-inverse text-opacity-60">
              <thead>
                <tr class="text-inverse text-opacity-75">
                  <th class="w-50">COUNTRY</th>
                  <th class="w-25 text-end">MESSAGES</th>
                  <th class="w-25 text-end">PCT%</th>
                </tr>
              </thead>
              <tbody>
                {#if trafficData && trafficData.country}
                  {#each trafficData.country as country}
                    <tr class={country.class}>
                      <td>{country.name}</td>
                      <td class="text-end">{country.visits}</td>
                      <td class="text-end">{country.pct}</td>
                    </tr>
                  {/each}
                {:else}
                  <tr>
                    <td colspan="3">No records found</td>
                  </tr>
                {/if}
              </tbody>
            </table>
          </div>
          <div class="col-lg-6">
            <Card>
              <CardBody class="py-2">
                <div class="d-flex align-items-center">
                  <div class="w-70px">
                    {#if trafficData && trafficData.chart}
                      <ApexCharts options={trafficData.chart.options}></ApexCharts>
                    {/if}
                  </div>
                  <div class="flex-1 ps-2">
                    <table class="w-100 small mb-0 text-inverse text-opacity-60">
                      <tbody>
                        {#if trafficData && trafficData.source}
                          {#each trafficData.source as source}
                            <tr>
                              <td>
                                <div class="d-flex align-items-center">
                                  <div
                                    class={"w-6px h-6px rounded-pill me-2 " +
                                      source.class}
                                  ></div>
                                  {source.name}
                                </div>
                              </td>
                              <td class="text-end">{source.percentage}</td>
                            </tr>
                          {/each}
                        {:else}
                          <tr>
                            <td colspan="2">No records found</td>
                          </tr>
                        {/if}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </CardBody>
    </Card>
  </div>
  <!-- END traffic-analytics -->

  <!-- BEGIN top-products -->
  <div class="col-xl-6">
    <Card class="mb-3">
      <CardBody>
        <div class="d-flex fw-bold small mb-3">
          <span class="flex-grow-1">MARKET PATTERNS</span>
          <CardExpandToggler />
        </div>
        <div class="table-responsive">
          <table class="w-100 mb-0 small align-content-end text-wrap">
            <tbody>
              {#if marketPatterns}
                {#each marketPatterns as pattern}
                  <tr>
                    <td>
                      <table class="mb-2 ms-4" style="min-width: 160px">
                        <tr>
                          <td class="pe-3">TREND:</td>
                          <td class="text-inverse text-opacity-75 fw-500"
                            >{pattern.trend}</td
                          >
                        </tr>
                        <tr>
                          <td class="pe-3">ACTION:</td>
                          <td class="text-inverse text-opacity-75 fw-500"
                            >{pattern.action}</td
                          >
                        </tr>
                        <tr>
                          <td class="pe-3 text-nowrap">Date:</td>
                          <td class="text-inverse text-opacity-75 fw-500"
                            >{pattern.date}</td
                          >
                        </tr>
                      </table>
                    </td>
                    <td>
                      <div class="d-flex">
                        <div class="flex-1 ps-3">
                          <div class="mb-1">
                            <small
                              class="fs-9px fw-500 lh-1 d-inline-block rounded-0 badge {pattern.type ===
                              'bullish'
                                ? 'bg-theme text-theme-900'
                                : 'bg-inverse bg-opacity-25'}  pt-5px text-uppercase"
                              >{pattern.type}</small
                            >
                          </div>
                          <div class="fw-500 text-inverse">
                            {pattern.title}
                          </div>
                          <span>{pattern.description}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                {/each}
              {:else}
                <tr>
                  <td colspan="3"> No records found </td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  </div>
  <!-- END top-products -->

  <!-- BEGIN activity-log -->
  <div class="col-xl-6">
    <Card class="mb-3">
      <CardBody>
        <div class="d-flex fw-bold small mb-3">
          <span class="flex-grow-1">ACTIVITY LOG</span>
          <CardExpandToggler />
        </div>
        <div class="table-responsive">
          <table class="table table-striped table-borderless mb-2px small text-nowrap">
            <tbody>
              {#if logs}
                {#each logs as log}
                  <tr>
                    <td>
                      <span class="d-flex align-items-center">
                        <i
                          class="bi bi-circle-fill fs-6px me-2"
                          class:text-theme={log.highlight}
                        ></i>
                        {log.title}
                      </span>
                    </td>
                    <td><small>{log.time}</small></td>
                    <td>
                      <span
                        class="badge d-block rounded-0 pt-5px w-100px"
                        class:bg-theme={log.highlight}
                        class:text-theme-900={log.highlight}
                        class:bg-inverse={!log.highlight}
                        class:bg-opacity-25={!log.highlight}
                        style="min-height: 18px">{log.badge}</span
                      >
                    </td>
                  </tr>
                {/each}
              {:else}
                <tr>
                  <td colspan="4"> No records found </td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  </div>
  <!-- END activity-log -->
</div>
<!-- END row -->
