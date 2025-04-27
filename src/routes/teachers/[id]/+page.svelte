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
			<li class=""><a href="/students">Students</a></li>
			<li class="font-semibold">{data.student.name}</li>
		</ul>
	</div>
	<header class="flex items-center gap-2 px-4 py-2">
		<h1 class="text-2xl font-bold">
			{data.student.name}
		</h1>
		{#if data.student.homeroom}
			<span class="badge badge-secondary">
				{data.student.homeroom?.name}
			</span>
		{/if}
	</header>
	<section id="classes" class="flex flex-col gap-2 rounded-md p-4">
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Classes</h2>
				{#if data.student.classes}
					<table class="table">
						<thead>
							<tr>
								<th>Class Name</th>
								<th>Teacher</th>
								<th class="text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each data.student.classes as classItem}
								<tr>
									<td>{classItem.name}</td>
									<td>
										<div class="flex flex-wrap gap-1">
											{#each classItem.teachers as teacher}
												<a href={`/teachers/${teacher.id}`} class="badge badge-accent"
													>{teacher.name}</a
												>
											{/each}
										</div>
									</td>
									<td class="text-right">
										<a
											href={`/classes/${classItem.id}`}
											title="View Class Details"
											class="btn btn-square hover:btn-primary focus:hover:btn-primary active:btn-primary focus-within:btn-primary"
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
													d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
												/>
											</svg>
											<span class="sr-only">View class details</span>
										</a>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{:else}
					<p>No classes assigned</p>
				{/if}
			</div>
		</div>
	</section>
	<section id="assignments" class="flex flex-col gap-2 rounded-md p-4">
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Assignments</h2>
				<table class="table">
					<thead>
						<tr>
							<th>Assignment</th>
							<th>Grade</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{#each data.student.assignments as assignment}
							<tr>
								<td>{assignment.name}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</section>
	<section id="grades" class="flex flex-col gap-2 rounded-md p-4">
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Grades Overview</h2>
			</div>
		</div>
	</section>
	<p>
		{JSON.stringify(data.student)}
	</p>
</div>
