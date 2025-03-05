<script lang="ts">
	import type { PageProps, PageServerData } from './$types';

	const { data }: PageProps = $props();
	const homeroom = data.homerooms[0];
</script>

<svelte:head>
	<title>Homeroom Details</title>
</svelte:head>

<nav class="breadcrumbs mb-4 text-sm" aria-label="Breadcrumb">
	<ul>
		<li>
			<a href="/">Home</a>
		</li>
		<li>
			<a href="/homerooms">Homerooms</a>
		</li>
		<li>Homeroom Details</li>
	</ul>
</nav>
<div class="flex flex-col gap-2">
	<h1 class="mb-3 text-3xl">{homeroom.name}</h1>
	<dl class="grid grid-cols-3">
		<dt class="col-span-1">Teacher(s):</dt>
		<dd class="col-span-2">
			{#if homeroom.teachers.length > 0}
				<span>
					{#each homeroom.teachers as teacher, index}
						<a href={`/teachers/${teacher.id}`}>{teacher.name}</a>{index <
						homeroom.teachers.length - 1
							? ', '
							: ''}
					{/each}
				</span>
			{/if}
		</dd>
		<dt class="col-span-1">Students</dt>
		<dd class="col-span-2">{homeroom.students.length}</dd>
	</dl>
	{#if homeroom.students.length > 0}
		<table class="table">
			<caption>Students in homeroom</caption>
			<thead>
				<tr>
					<th>Name</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each homeroom.students as student}
					<tr>
						<td>{student.name}</td>
						<td>
							<a href={`/students/${student.id}`}>
								<span>Student Details</span>
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
										d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
