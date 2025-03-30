<script lang="ts">
	import type { PageProps } from './$types';
	import { page } from '$app/state';
	import { get } from 'svelte/store';
	import { enhance } from '$app/forms';

	const { data }: PageProps = $props();
	const getHomeroomGrade = (grade: string) =>
		data.classGradeOptions.find((option) => option.value === grade)?.name ?? '-';
</script>

{#snippet columnHeader(title: string, className?: string, srOnlyText?: string)}
	<th scope="col" class={className}>
		<span>{title}</span>
		{#if srOnlyText}
			<span class="sr-only">{srOnlyText}</span>
		{/if}
	</th>
{/snippet}

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
								{#each data.teachers as teacher}
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
					{@render columnHeader('Grade')}
					{@render columnHeader('Name')}
					{@render columnHeader('Teachers')}
					{@render columnHeader('Students', 'text-right')}
					{@render columnHeader('', 'text-right', 'Links')}
				</tr>
			</thead>
			<tbody>
				{#each data.homerooms as homeroom}
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
						<td class="text-right">{homeroom.students.length}</td>
						<td class="text-right">
							<a
								href={`/homerooms/${homeroom.id}`}
								title="Go To Homeroom"
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
										d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
								<span class="sr-only">Go to homeroom</span>
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="md:hidden">
		<ul class="list">
			{#each data.homerooms as homeroom}
				<li class="list-row rounded-box flex w-full items-center gap-2 tracking-wide shadow">
					<div class="flex w-full grow justify-between gap-2">
						<div>
							<p class="font-semibold">{getHomeroomGrade(homeroom.grade)}</p>
							<p>{homeroom.name}</p>
						</div>
						<div>
							<dl>
								<dt>Teacher(s)</dt>
								<dd>
									<ul>
										{#each homeroom.teachers as teacher, index}
											<li>
												{`${teacher.name}${index < homeroom.teachers.length - 1 ? ', ' : ''}`}
											</li>
										{/each}
									</ul>
								</dd>
								<dt>Student(s)</dt>
								<dd>
									{data.students.length}
								</dd>
							</dl>
							<!-- <p class="text-sm font-semibold uppercase">Teacher(s)</p>
							<span>
								<ul>
									{#each homeroom.teachers as teacher, index}
										<li>
											{`${teacher.name}${index < homeroom.teachers.length - 1 ? ', ' : ''}`}
										</li>
									{/each}
								</ul>
							</span> -->
						</div>
					</div>
					<a
						href={`/homerooms/${homeroom.id}`}
						title="Go To Homeroom"
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
								d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
						<span class="sr-only">Press to go to homeroom</span>
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
