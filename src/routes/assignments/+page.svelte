<script lang="ts">
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	const { data }: PageProps = $props();
	let isAddingAssignment = $state(false);
	let selectedAssignments = $state(new Set<string>());
	let allAssignmentsSelected = $derived(selectedAssignments.size === data.assignments.length);

	const toggleAssignment = (assignmentId: string) => {
		const newSelectedAssignments = new Set(selectedAssignments);
		if (newSelectedAssignments.has(assignmentId)) {
			newSelectedAssignments.delete(assignmentId);
		} else {
			newSelectedAssignments.add(assignmentId);
		}
		selectedAssignments = newSelectedAssignments;
	};

	const toggleAllAssignments = () => {
		selectedAssignments =
			selectedAssignments.size === data.assignments.length
				? new Set()
				: new Set(data.assignments.map((assignment) => assignment.id));
	};
</script>

<svelte:head>
	<title>Assignments</title>
</svelte:head>

<div class="flex flex-col gap-3">
	<div class="breadcrumbs text-sm">
		<ul>
			<li>
				<a href="/">Home</a>
			</li>
			<li class="font-semibold">Assignments</li>
		</ul>
	</div>
	<div class="flex flex-row gap-3">
		<button
			class="btn btn-secondary"
			onclick={() => (isAddingAssignment = true)}
			popovertarget="add-assignment-form"
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
			<span>Add an assignment</span>
		</button>
		{#if isAddingAssignment}
			<div
				id="add-assignment-form"
				popover="auto"
				style="inset: unset;"
				class="rounded-box border-neutral relative mt-11 w-lg border p-4 shadow"
			>
				<form
					class="flex flex-col gap-2"
					method="post"
					action="?/add"
					use:enhance={() => {
						return async ({ result }) => {
							if (result.type === 'success') {
								await invalidateAll();
							}
						};
					}}
				>
					<label for="name">Name</label>
					<input type="text" name="name" class="input input-bordered w-full" />
					<label for="description">Description</label>
					<input type="text" name="description" class="input input-bordered w-full" />
					<label for="maxPoints">Max Points</label>
					<input type="number" name="maxPoints" class="input input-bordered w-full" />
					<label for="standard">Standard</label>
					<input type="text" name="standard" class="input input-bordered w-full" />
					<label for="classId">Class</label>
					<select name="classId" class="select select-bordered w-full">
						{#each data.classes as _class}
							<option value={_class.id}>{_class.name}</option>
						{/each}
					</select>
					<button type="submit" class="btn btn-primary mt-2">Add</button>
				</form>
			</div>
		{/if}
		<div class="join mb-4">
			<button class="btn join-item md:hidden" onclick={toggleAllAssignments}>
				{allAssignmentsSelected ? 'Unselect All' : 'Select All'}
			</button>
			<form
				class="join-item"
				method="post"
				action="?/delete"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type === 'success') {
							await invalidateAll();
						}
					};
				}}
			>
				{#each [...selectedAssignments] as assignment}
					<input type="text" name="assignmentId" value={assignment} hidden />
				{/each}
				<div class="indicator">
					<span class="indicator-item badge badge-neutral">{selectedAssignments.size}</span>
					<button class="btn" type="submit" disabled={selectedAssignments.size === 0}>
						Delete Selected Assignments
					</button>
				</div>
			</form>
		</div>
	</div>
	<div class="max-md:hidden">
		<table class="table-pin-cols table">
			<thead>
				<tr>
					<th class="w-10">
						<input
							title="Select All Assignments"
							type="checkbox"
							class="checkbox"
							checked={allAssignmentsSelected}
							onchange={toggleAllAssignments}
						/>
					</th>
					<th>Name</th>
					<th>Description</th>
					<th>Max Points</th>
					<th>Standard</th>
					<th>Class</th>
					<th class="text-right">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.assignments as assignment}
					<tr>
						<td>
							<input
								title="Select Assignment"
								type="checkbox"
								class="checkbox"
								checked={selectedAssignments.has(assignment.id)}
								onchange={() => toggleAssignment(assignment.id)}
							/>
						</td>
						<td>{assignment.name}</td>
						<td>{assignment.description}</td>
						<td>{assignment.max_points}</td>
						<td>{assignment.standard}</td>
						<td>
							<div class="badge badge-lg badge-neutral">
								{#if assignment.class}
									<a href={`/classes/${assignment.class.id}`} class="text-xs"
										>{assignment.class.name}</a
									>
								{:else}
									<span class="text-xs">No class</span>
								{/if}
							</div>
						</td>
						<td class="text-right">
							<a
								href={`/assignments/${assignment.id}`}
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
								<span class="sr-only">View Assignment</span>
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="md:hidden">
		<div class="join mb-4">
			<button class="btn join-item" onclick={toggleAllAssignments}>
				{allAssignmentsSelected ? 'Unselect All' : 'Select All'}
			</button>
			<form class="join-item" method="post" action="?/delete">
				{#each [...selectedAssignments] as assignment}
					<input type="text" name="assignmentId" value={assignment} hidden />
				{/each}
				<div class="indicator">
					<span class="indicator-item badge badge-neutral">{selectedAssignments.size}</span>
					<button class="btn" type="submit" disabled={selectedAssignments.size === 0}>
						Delete Selected Assignments
					</button>
				</div>
			</form>
		</div>
		<ul class="list">
			{#each data.assignments as assignment}
				<li class="list-row rounded-box flex w-full items-center gap-2 tracking-wide shadow">
					<div class="flex w-full grow justify-between gap-2">
						<div class="flex items-center gap-2">
							<div>
								<input
									title="Select Assignment"
									type="checkbox"
									class="checkbox"
									checked={selectedAssignments.has(assignment.id)}
									onchange={() => toggleAssignment(assignment.id)}
								/>
								<span class="sr-only">Select Assignment</span>
							</div>
							<div>
								<p class="font-semibold">{assignment.name}</p>
								<div class="mt-2">
									<dl>
										<dt class="font-semibold uppercase">Standard</dt>
										<dd>
											<div class="badge badge-lg badge-neutral">
												{assignment.standard}
											</div>
										</dd>
									</dl>
									<dl>
										<dt class="font-semibold uppercase">Class</dt>
										<dd>
											<div class="badge badge-lg badge-neutral">
												{#if assignment.class}
													<a href={`/classes/${assignment.class.id}`} class="text-xs"
														>{assignment.class.name}</a
													>
												{/if}
											</div>
										</dd>
									</dl>
								</div>
							</div>
						</div>
						<a
							href={`/assignments/${assignment.id}`}
							class="btn btn-square hover:btn-primary focus:hover:btn-primary active:btn-primary focus-within:btn-primary"
						>
							<span class="sr-only">View Assignment</span>
						</a>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
