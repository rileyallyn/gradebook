<script lang="ts">
	let {
		title,
		sortBy,
		sortDirection,
		key,
		className
	}: { title: string; sortBy?: string; sortDirection?: string; key: string; className?: string } =
		$props();
</script>

<th scope="col" class={className}>
	<div class="flex items-center gap-1">
		<span>{title}</span>
		{#if sortBy}
			{#if key === sortBy}
				{#if sortDirection === 'descending'}
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
							d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
						/>
					</svg>
				{:else}
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
							d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
						/>
					</svg>
				{/if}
			{:else}
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
						d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
					/>
				</svg>
			{/if}
		{/if}
	</div>
</th>
