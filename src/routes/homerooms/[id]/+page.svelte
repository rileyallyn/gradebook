<script lang="ts">
	import type { PageProps, PageServerData } from './$types';

	const { data }: PageProps = $props();
	const homeroom = data.homerooms[0];
</script>

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
	<span>{homeroom.teachers.map((teacher) => teacher.name).join(', ')}</span>
	<div class="overflow-x-auto">
		<table class="table">
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
	</div>
</div>
