<script lang="ts">
	import type { PageProps } from './$types';
	import { page } from '$app/state';

	const { data, form }: PageProps = $props();
	const sort = page.url.searchParams.get('sort') ?? 'grade';
	const sortBy = $state(sort);
	const sortDirection: 'ascending' | 'descending' = $state('ascending');
	let homerooms = [...data.homerooms].sort(
		(a, b) =>
			(sortBy === 'grade' ? a.grade.localeCompare(b.grade) : a.name.localeCompare(b.name)) *
			(sortDirection === 'ascending' ? 1 : -1)
	);
</script>

<h1 class="mb-4 text-3xl">Homerooms</h1>
<div class="flex flex-col gap-3">
	<a href="/homerooms/new" class="btn btn-neutral">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
		</svg>
		<span>Add New Homeroom</span>
	</a>
	<ul class="join join-vertical w-full">
		{#each homerooms as homeroom}
			<li class="">
				<details class="join-item collapse-arrow border-base-200 collapse border">
					<summary class="collapse-title">
						<div>
							{homeroom.name}
							{#if homeroom.grade}
								<span class="list-row font-semibold"
									>{data.classGradeOptions.find((option) => option.value === homeroom.grade)
										?.name}</span
								>
							{/if}
						</div>
					</summary>
					<div class="collapse-content">
						<dl>
							<dt>Teacher(s)</dt>
							<dl>
								<ul>
									{#each homeroom.teachers as teacher, index}
										<li>{teacher.name}{index < homeroom.teachers.length - 1 ? ', ' : ''}</li>
									{/each}
								</ul>
							</dl>
						</dl>
					</div>
				</details>
			</li>
		{/each}
	</ul>
</div>
