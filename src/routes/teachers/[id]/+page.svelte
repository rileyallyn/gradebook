<script lang="ts">
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
</script>

<div class="flex flex-col gap-4">
	<div class="breadcrumbs text-sm">
		<ul>
			<li>
				<a href="/">Home</a>
			</li>
			<li class=""><a href="/teachers">Teachers</a></li>
			<li class="font-semibold">{data.teacher.name}</li>
		</ul>
	</div>
	<header class="flex items-center gap-2 px-4 py-2">
		<h1 class="text-2xl font-bold">
			{data.teacher.name}
		</h1>
		<!-- {#if data.teacher.homeroom}
			<span class="badge badge-secondary">
				{data.teacher.homerooms[0]?.name}
			</span>
		{/if} -->
	</header>

	<p>
		{JSON.stringify(data.teacher)}
	</p>
</div>
