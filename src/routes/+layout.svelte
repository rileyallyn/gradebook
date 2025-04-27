<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<header class="font-poppins px-3 pt-3 pb-1">
	<nav>
		<div class="flex items-center justify-between">
			<div>Gradebook</div>
			<ul class="flex flex-nowrap items-center gap-3">
				<li>
					<a href="/homerooms">Homerooms</a>
				</li>
				<li>
					<a href="/students">Students</a>
				</li>
				<li>
					<a href="/classes">Classes</a>
				</li>
				<li>
					<div class="dropdown dropdown-end">
						<div
							aria-haspopup="menu"
							aria-controls="more-menu"
							role="button"
							class="btn btn-square"
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
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
							<span class="sr-only">More actions</span>
						</div>
						<ul
							role="menu"
							class="dropdown-content menu bg-base-100 rounded-box border-base-200 flex w-40 flex-col gap-1 border shadow-md"
						>
							<li>
								<a href="/assignments">Assignments</a>
							</li>
							<li>
								<a href="/teachers">Teachers</a>
							</li>
							<li>
								<a href="/grades">Grades</a>
							</li>
							<li>
								<a href="/print">Print</a>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
	</nav>
</header>

<main class="font-poppins px-3 pt-1">
	{@render children()}
</main>
