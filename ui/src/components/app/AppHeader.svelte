<script>
  import { appOptions } from '../../stores/appOptions.js';

  let notificationData = [
  /*
  {
		icon: 'bi bi-bag text-theme',
		title: 'NEW ORDER RECEIVED ($1,299)',
		time: 'JUST NOW'
	}
	*/
	];

  function desktopToggler() {
		$appOptions.appSidebarToggled = ($appOptions.appSidebarCollapsed == false) ? false : true;
		$appOptions.appSidebarCollapsed = ($appOptions.appSidebarCollapsed == false) ? true : false;
  }

  function mobileToggler() {
  	$appOptions.appSidebarMobileToggled = !$appOptions.appSidebarMobileToggled;
  }

  function searchHeaderSearchToggler() {
  	$appOptions.appHeaderSearchToggled = !$appOptions.appHeaderSearchToggled;
  }
</script>

<!-- BEGIN #header -->
<div id="header" class="app-header">
	<!-- BEGIN desktop-toggler -->
	<div class="desktop-toggler">
		<button type="button" class="menu-toggler" on:click={desktopToggler}>
			<span class="bar"></span>
			<span class="bar"></span>
			<span class="bar"></span>
		</button>
	</div>
	<!-- BEGIN desktop-toggler -->

	<!-- BEGIN mobile-toggler -->
	<div class="mobile-toggler">
		<button type="button" class="menu-toggler" on:click={mobileToggler}>
			<span class="bar"></span>
			<span class="bar"></span>
			<span class="bar"></span>
		</button>
	</div>
	<!-- END mobile-toggler -->

	<!-- BEGIN brand -->
	<div class="brand">
		<a href="/" class="brand-logo">
			<span class="brand-img">
				<span class="brand-img-text text-theme">T</span>
			</span>
			<span class="brand-img-text"  style="letter-spacing: 5px;">TRIXY
						<span style="font-size: 9px; letter-spacing: 1px; font-weight: bold; position: absolute; opacity: 0.5; top: 5px; margin-left: -15px;">BETA v1.0.0</span>
			</span>
		</a>
	</div>
	<!-- END brand -->

	<!-- BEGIN menu -->
	<div class="menu">
		<div class="menu-item dropdown">
			<a href="#/"  class="menu-link" on:click={searchHeaderSearchToggler}>
				<div class="menu-icon"><i class="bi bi-search nav-icon"></i></div>
			</a>
		</div>
		<div class="menu-item dropdown dropdown-mobile-full">
			<a href="#/" data-bs-toggle="dropdown" data-bs-display="static" class="menu-link">
				<div class="menu-icon"><i class="bi bi-bell nav-icon"></i></div>
				<div class="menu-badge bg-theme"></div>
			</a>
			<div class="dropdown-menu dropdown-menu-end mt-1 w-300px fs-11px pt-1">
				<h6 class="dropdown-header fs-10px mb-1">NOTIFICATIONS</h6>
				<div class="dropdown-divider mt-1"></div>

				{#if notificationData && notificationData.length > 0}
					{#each notificationData as notification}
						<a href="#/" class="d-flex align-items-center py-10px dropdown-item text-wrap fw-semibold">
							<div class="fs-20px">
								<i class={notification.icon}></i>
							</div>
							<div class="flex-1 flex-wrap ps-3">
								<div class="mb-1 text-inverse">{notification.title}</div>
								<div class="small text-inverse text-opacity-50">{notification.time}</div>
							</div>
							<div class="ps-2 fs-16px">
								<i class="bi bi-chevron-right"></i>
							</div>
						</a>
					{/each}
				{:else}
					<div class="px-3 pb-3 pt-2">
						No record found
					</div>
				{/if}
				<hr class="my-0">
				<div class="py-10px mb-n2 text-center">
					<a href="#/" class="text-decoration-none fw-bold">SEE ALL</a>
				</div>
			</div>
		</div>
	</div>
	<!-- END menu -->

	<!-- BEGIN menu-search -->
	<form class="menu-search" method="POST" name="header_search_form">
		<div class="menu-search-container">
			<div class="menu-search-icon"><i class="bi bi-search"></i></div>
			<div class="menu-search-input">
				<input type="text" class="form-control form-control-lg" placeholder="Search menu...">
			</div>
			<div class="menu-search-icon">
				<a href="#/" on:click={searchHeaderSearchToggler}><i class="bi bi-x-lg"></i></a>
			</div>
		</div>
	</form>
	<!-- END menu-search -->
</div>
<!-- END #header -->
