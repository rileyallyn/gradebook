<script lang="ts">
	import '../app.css';
	let { children } = $props();

	let isMoreMenuOpen = $state(false);
	const toggleMoreMenu = () => {
		isMoreMenuOpen = !isMoreMenuOpen;
	};
</script>

<header class="px-3 pt-3 pb-1">
	<nav>
		<div class="flex items-center justify-between">
			<div>Gradebook</div>
			<ul class="flex flex-nowrap items-center gap-3">
				<li>
					<a href="/homerooms">Homerooms</a>
				</li>
				<li>
					<a href="/teachers">Teachers</a>
				</li>
				<li>
					<a href="/classes">Classes</a>
				</li>
				<li>
					<a href="/assignments">Assignments</a>
				</li>
				<li>
					<a href="/grades">Grades</a>
				</li>
				<li>
					<div class="dropdown dropdown-end">
						<div
							aria-haspopup="menu"
							aria-controls="more-menu"
							role="button"
							class="btn"
							tabindex="0"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
								/>
							</svg>
							<span class="sr-only">More actions</span>
						</div>
						<ul
							role="menu"
							class="dropdown-content menu bg-base-100 rounded-box border-base-200 flex w-40 flex-col gap-1 border shadow-md"
						>
							<li>
								<a href="/print">Print</a>
							</li>
							<li>
								<a href="/print">Something else</a>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
	</nav>
</header>

<main class="px-3 pt-1">
	{@render children()}
</main>
