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
			<li class=""><a href="/assignments">Assignments</a></li>
			<li class="font-semibold">{data.assignment.name}</li>
		</ul>
	</div>
	<header class="flex items-center gap-2 px-4 py-2">
		<h1 class="text-2xl font-bold">
			{data.assignment.name}
		</h1>
	</header>
	<section id="info" class="flex flex-col gap-2 rounded-md p-4">
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Info</h2>
				<div class="flex flex-col gap-2">
					<dl>
						<dt class="font-semibold uppercase">Standard</dt>
						<dd>{data.assignment.standard}</dd>
					</dl>
				</div>
			</div>
		</div>
	</section>
	<section id="students" class="flex flex-col gap-2 rounded-md p-4">
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Students</h2>
				<div class="flex flex-col gap-2">
					<div class="flex flex-col gap-2">
						<h3 class="text-lg font-semibold">
							{data.assignment.name}
						</h3>
					</div>
					<table class="table-zebra table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Grade</th>
								<th>Standard</th>
							</tr>
						</thead>
						<tbody>
							{#each data.assignment.students as student}
								<tr>
									<td>{student.name}</td>
									{#each student.grades as grade}
										{#if data.assignment.grades.some((g) => g.id === grade.id)}
											<td>{grade.score}</td>
											<td>{grade.standard_score}</td>
										{/if}
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</section>
</div>
