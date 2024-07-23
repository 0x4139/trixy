<script>
  import PerfectScrollbar from "/src/components/plugins/PerfectScrollbar.svelte";
  import { appOptions } from "../../stores/appOptions.js";
  import { onMount } from "svelte";
  import { page, navigating } from "$app/stores";

  let menus = [
    {
      text: "Social",
      is_header: true,
    },
    {
      url: "/twitter",
      icon: "fab fa-twitter",
      text: "Twitter",
    },
    {
      url: "/telegram",
      icon: "fab fa-telegram",
      text: "Telegram",
    },
    {
      url: "/github",
      icon: "fab fa-github",
      text: "Github",
    },
    {
      text: "Navigation",
      is_header: true,
    },
    {
      url: "/coins/taraxa",
      icon: "fas fa-chart-bar",
      text: "Dashboard",
    },
    {
      url: "/coins",
      icon: "fas fa-dollar-sign",
      text: "Coins",
    },
    {
      url: "/products",
      icon: "fas fa-cubes",
      text: "Products",
    },
    {
      url: "/how-it-works",
      icon: "fas fa-comments",
      text: "How it Works",
    },
    {
      url: "/privacy-policy",
      icon: "fas fa-bookmark",
      text: "Privacy Policy",
    },
    {
      url: "/contact-us",
      icon: "fas fa-address-book",
      text: "Contact Us",
    },
  ];
  let trendingCoins;
  onMount(async () => {
    trendingCoins = $page.data.trendingCoins;
    console.log("trendingCoins: ", trendingCoins);

    if (trendingCoins) {
      console.log("I am adding coins to the menu:", trendingCoins);
      menus.push({
        text: "Featured Coins",
        is_header: true,
      });
      menus.push({
        is_coin: true,
        name: "Taraxa",
        icon: "https://assets.coingecko.com/coins/images/4372/small/CPuCDZX.jpg?1696504972",
        url: "/coins/taraxa",
      });
      menus.push({
        text: "Trending Coins",
        is_header: true,
      });
      menus = menus.concat(trendingCoins);
    }
  });

  function mobileToggler() {
    $appOptions.appSidebarMobileToggled = !$appOptions.appSidebarMobileToggled;
  }

  function hideMobileSidebar() {
    $appOptions.appSidebarMobileToggled = false;
  }

  $: if ($navigating) hideMobileSidebar();

  function checkChildMenu(childMenu) {
    let check = false;
    if (childMenu) {
      for (let i = 0; i < childMenu.length; i++) {
        if ($page.url.pathname === childMenu[i]["url"]) {
          check = true;
        }
      }
    }
    return check;
  }

  function handleSidebarMenuToggle(menus) {
    menus.map(function (menu) {
      menu.onclick = function (e) {
        e.preventDefault();
        const target = this.nextElementSibling;

        menus.map(function (m) {
          const otherTarget = m.nextElementSibling;
          if (otherTarget !== target) {
            otherTarget.style.display = "none";
            otherTarget.closest(".menu-item").classList.remove("expand");
          }
        });

        const targetItemElm = target.closest(".menu-item");

        if (
          targetItemElm.classList.contains("expand") ||
          (targetItemElm.classList.contains("active") && !target.style.display)
        ) {
          targetItemElm.classList.remove("expand");
          target.style.display = "none";
        } else {
          targetItemElm.classList.add("expand");
          target.style.display = "block";
        }
      };
    });
  }

  function handleSidebarMenu() {
    const menuBaseSelector = ".app-sidebar .menu > .menu-item.has-sub";
    const submenuBaseSelector = " > .menu-submenu > .menu-item.has-sub";

    // menu
    const menuLinkSelector = menuBaseSelector + " > .menu-link";
    const menus = [].slice.call(document.querySelectorAll(menuLinkSelector));
    handleSidebarMenuToggle(menus);

    // submenu lvl 1
    const submenuLvl1Selector = menuBaseSelector + submenuBaseSelector;
    const submenusLvl1 = [].slice.call(
      document.querySelectorAll(submenuLvl1Selector + " > .menu-link"),
    );
    handleSidebarMenuToggle(submenusLvl1);

    // submenu lvl 2
    const submenuLvl2Selector =
      menuBaseSelector + submenuBaseSelector + submenuBaseSelector;
    const submenusLvl2 = [].slice.call(
      document.querySelectorAll(submenuLvl2Selector + " > .menu-link"),
    );
    handleSidebarMenuToggle(submenusLvl2);
  }

  onMount(async () => {
    if (menus) {
      //appSidebarMenus.set(data);
      console.log("data from AppSidebar", menus);
    } else {
      console.log("no data from AppSidebar");
    }
    handleSidebarMenu();
  });
</script>

<!-- BEGIN #sidebar -->
<div id="sidebar" class="app-sidebar">
  <!-- BEGIN scrollbar -->
  <PerfectScrollbar class="h-100">
    <div class="app-sidebar-content">
      <!-- BEGIN menu -->
      <div class="menu">
        {#each menus as menu}
          {#if menu.is_header}
            <div class="menu-header">{menu.text}</div>
          {:else if menu.is_coin}
            <div class="menu-item" class:active={$page.url.pathname === menu.url}>
              <a href={menu.url} class="menu-link">
                {#if menu.icon}
                  <span class="menu-icon">
                    <img style="height: 16px;width: 16px" src={menu.icon} alt="" />
                    <i class={menu.icon}></i>
                    {#if menu.highlight}<span
                        class="w-5px h-5px rounded-3 bg-theme position-absolute top-0 end-0 mt-3px me-3px"
                      ></span>{/if}
                  </span>
                {/if}
                <span class="menu-text">{menu.name}</span>
              </a>
            </div>
          {:else if menu.is_divider}
            <div class="menu-divider"></div>
          {:else}
            <div
              class="menu-item"
              class:has-sub={menu.children}
              class:active={$page.url.pathname === menu.url ||
                checkChildMenu(menu.children)}
            >
              <a href={menu.url} class="menu-link">
                {#if menu.icon}
                  <span class="menu-icon">
                    <i class={menu.icon}></i>
                    {#if menu.highlight}<span
                        class="w-5px h-5px rounded-3 bg-theme position-absolute top-0 end-0 mt-3px me-3px"
                      ></span>{/if}
                  </span>
                {/if}
                <span class="menu-text">{menu.text}</span>
                {#if menu.children}
                  <span class="menu-caret"><b class="caret"></b></span>
                {/if}
              </a>

              {#if menu.children}
                <div class="menu-submenu">
                  {#each menu.children as childMenu}
                    <div
                      class="menu-item"
                      class:has-sub={childMenu.children}
                      class:active={$page.url.pathname === childMenu.url}
                    >
                      <a href={childMenu.url} class="menu-link">
                        <span class="menu-text">{childMenu.text}</span>
                      </a>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          {/if}
        {/each}
      </div>
      <!-- END menu -->
      <div class="p-3 px-4 mt-auto">
        <a
          href="https://seantheme.com/hud-svelte/documentation/"
          target="_blank"
          class="btn d-block btn-outline-theme"
        >
          <i class="fa fa-code-branch me-2 ms-n2 opacity-5"></i> Github
        </a>
      </div>
    </div>
  </PerfectScrollbar>
  <!-- END scrollbar -->
</div>
<!-- END #sidebar -->

<!-- BEGIN mobile-sidebar-backdrop -->
<button class="app-sidebar-mobile-backdrop" on:click={mobileToggler}></button>
<!-- END mobile-sidebar-backdrop -->
