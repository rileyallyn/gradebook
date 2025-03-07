<script lang="ts">
	import type { PageProps } from './$types';
	import { page } from '$app/state';
	import { get } from 'svelte/store';
	import { enhance } from '$app/forms';
	import Column from './column.svelte';

	const { data }: PageProps = $props();
	const sort = page.url.searchParams.get('sort') ?? 'grade';
	const sortBy = $state(sort);
	let teachersValue = $state('');
	const teachers = data.teachers.sort((a, b) => a.name.localeCompare(b.name));
	const sortDirection: 'ascending' | 'descending' = $state('ascending');
	let homerooms = [...data.homerooms].sort(
		(a, b) =>
			(sortBy === 'grade'
				? a.grade.localeCompare(b.grade) || a.name.localeCompare(b.name)
				: a.name.localeCompare(b.name) || a.grade.localeCompare(b.grade)) *
			(sortDirection === 'ascending' ? 1 : -1)
	);
	const getHomeroomGrade = (grade: string) =>
		data.classGradeOptions.find((option) => option.value === grade)?.name ?? '-';
</script>

<svelte:head>
	<title>Homerooms</title>
</svelte:head>

<div class="flex flex-col gap-3">
	<div class="breadcrumbs text-sm">
		<ul>
			<li>
				<a href="/">Home</a>
			</li>
			<li class="font-semibold">Homerooms</li>
		</ul>
	</div>
	<div class="flex justify-end">
		<button
			class="btn btn-secondary"
			popovertarget="new-homeroom-form"
			popovertargetaction="toggle"
		>
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
		</button>
		<div
			id="new-homeroom-form"
			popover="auto"
			class="rounded-box border-neutral relative mt-11 border p-4 shadow"
			style="inset: unset;"
		>
			<form action="?/add" method="post" use:enhance>
				<div class="flex flex-col gap-3">
					<label class="">
						<div>Name<span class="text-error">*</span></div>
						<input type="text" class="input" name="name" required />
					</label>
					<label class="">
						<div>Grade<span class="text-error">*</span>:</div>
						<select name="grade" class="select" required>
							{#each data.classGradeOptions as option}
								<option value={option.value}>{option.name}</option>
							{/each}
						</select>
					</label>
					<div>Teachers:</div>
					<details class="collapse">
						<summary class="collapse-title">
							<span class="text-sm">Expand to assign teachers to homeroom</span>
						</summary>
						<div class="collapse-content">
							<ul>
								{#each teachers as teacher}
									<li>
										<label class="label">
											<input type="checkbox" class="checkbox" name="teachers" value={teacher.id} />
											<span>{teacher.name}</span>
										</label>
									</li>
								{/each}
							</ul>
						</div>
					</details>
					{#each data.classGradeOptions as option}
						<option value={option.value}>{option.name}</option>
					{/each}
					<div class="mt-2 grid grid-cols-2 gap-2">
						<button
							class="btn"
							popovertarget="new-homeroom-form"
							popovertargetaction="hide"
							type="reset">Cancel</button
						>
						<button
							type="submit"
							class="btn btn-primary"
							popovertarget="new-homeroom-form"
							popovertargetaction="hide">Submit</button
						>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="max-md:hidden">
		<table class="table-pin-cols table">
			<thead>
				<tr>
					<Column title="Grade" {sortBy} {sortDirection} key="grade" />
					<Column title="Name" {sortBy} {sortDirection} key="name" />
					<Column title="Teachers" {sortBy} {sortDirection} key="teachers" />
					<Column title="Students" {sortBy} {sortDirection} key="students" className="text-right" />
					<Column title="Actions" key="actions" />
				</tr>
			</thead>
			<tbody>
				{#each homerooms as homeroom}
					<tr>
						<th>{getHomeroomGrade(homeroom.grade)}</th>
						<td>{homeroom.name}</td>
						<td>
							<div class="flex">
								{#each homeroom.teachers as teacher, index}
									<a href={`/teachers/${teacher.id}`} class="link link-primary">{teacher.name}</a
									>{index < homeroom.teachers.length - 1 ? ', ' : ''}
								{/each}
							</div>
						</td>
						<td>{homeroom.students.length}</td>
						<td class="text-right">
							<a
								href={`/homerooms/${homeroom.id}`}
								title="View Homeroom"
								class="btn btn-square hover:btn-secondary focus:hover:btn-secondary active:btn-secondary focus-within:btn-secondary"
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
										d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
									/>
								</svg>
								<span class="sr-only">View Homeroom</span>
							</a>
						</td></tr
					>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="md:hidden">
		<ul class="list">
			{#each homerooms as homeroom}
				<li class="list-row rounded-box flex w-full items-center gap-2 tracking-wide shadow">
					<div class="flex w-full grow justify-between gap-2">
						<div>
							<p class="font-semibold">{getHomeroomGrade(homeroom.grade)}</p>
							<p>{homeroom.name}</p>
						</div>
						<div>
							<p class="text-sm font-semibold uppercase">Teacher(s)</p>
							<span>
								<ul>
									{#each homeroom.teachers as teacher, index}
										<li>
											{`${teacher.name}${index < homeroom.teachers.length - 1 ? ', ' : ''}`}
										</li>
									{/each}
								</ul>
							</span>
						</div>
					</div>
					<a
						href={`/homerooms/${homeroom.id}`}
						title="View Homeroom"
						class="btn btn-square hover:btn-secondary focus:hover:btn-secondary active:btn-secondary focus-within:btn-secondary"
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
								d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
							/>
						</svg>
						<span class="sr-only">Press to view homeroom</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	details > summary {
		list-style: none;
	}
	details > summary::-webkit-details-marker {
		display: none;
	}
</style>
