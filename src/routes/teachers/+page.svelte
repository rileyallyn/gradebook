<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	let isAddingTeacher = $state(false);
	let selectedTeachers = $state(new Set<string>());
	let allTeachersSelected = $derived(selectedTeachers.size === data.teachers.length);

	const toggleTeacher = (teacherId: string) => {
		const newSelectedTeachers = new Set(selectedTeachers);
		if (newSelectedTeachers.has(teacherId)) {
			newSelectedTeachers.delete(teacherId);
		} else {
			newSelectedTeachers.add(teacherId);
		}
		selectedTeachers = newSelectedTeachers;
	};

	const toggleAllTeachers = () => {
		selectedTeachers =
			selectedTeachers.size === data.teachers.length
				? new Set()
				: new Set(data.teachers.map((teacher) => teacher.id));
	};
</script>

<svelte:head>
	<title>Teachers</title>
</svelte:head>

<div class="flex flex-col gap-3">
	<div class="breadcrumbs text-sm">
		<ul>
			<li>
				<a href="/">Home</a>
			</li>
			<li class="font-semibold">Teachers</li>
		</ul>
	</div>
	<div class="flex flex-row gap-3">
		<button
			class="btn btn-secondary"
			onclick={() => (isAddingTeacher = true)}
			popovertarget="add-teacher-form"
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
			<span>Add a teacher</span>
		</button>
		{#if isAddingTeacher}
			<div
				id="add-teacher-form"
				popover="auto"
				style="inset: unset;"
				class="rounded-box border-neutral relative mt-11 border p-4 shadow"
			>
				<form
					method="post"
					class=""
					action="?/add"
					use:enhance={() => {
						isAddingTeacher = false;
						return async ({ result }) => {
							if (result.type === 'success') {
								await invalidateAll();
							}
						};
					}}
				>
					<div class="flex flex-col gap-3">
						<label class="flex flex-col gap-2">
							<div>Name<span class="text-error">*</span></div>
							<input type="text" name="name" placeholder="Name" class="input rounded-lg" required />
						</label>
						<label class="flex flex-col gap-2">
							<div>Classes<span class="text-error">*</span></div>
							<select name="classes" class="select" required>
								{#each data.classes as classItem}
									<option value={classItem.id}>{classItem.name}</option>
								{/each}
							</select>
						</label>
						<label class="flex flex-col gap-2">
							<div>Homeroom<span class="text-error">*</span></div>
							<select name="homeroom" class="select" required>
								{#each data.homerooms as homeroom}
									<option value={homeroom.id}>{homeroom.name}</option>
								{/each}
							</select>
						</label>
					</div>
					<button type="submit" class="btn btn-primary mt-2">Add</button>
				</form>
			</div>
		{/if}

		<div class="join mb-4">
			<button class="btn join-item md:hidden" onclick={toggleAllTeachers}>
				{allTeachersSelected ? 'Unselect All' : 'Select All'}
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
				{#each [...selectedTeachers] as teacher}
					<input type="text" name="teacherId" value={teacher} hidden />
				{/each}
				<div class="indicator">
					<span class="indicator-item badge badge-neutral">{selectedTeachers.size}</span>
					<button class="btn" type="submit" disabled={selectedTeachers.size === 0}>
						Delete Selected Teachers
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
							title="Select All Teachers"
							type="checkbox"
							class="checkbox"
							checked={selectedTeachers.size === data.teachers.length}
							onchange={toggleAllTeachers}
						/>
						<span class="sr-only">Select All Teachers</span>
					</th>
					<th>Name</th>
					<th>Classes</th>
					<th class="text-right">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.teachers as teacher}
					<tr>
						<td>
							<input
								title="Select Teacher"
								type="checkbox"
								class="checkbox"
								checked={selectedTeachers.has(teacher.id)}
								onchange={() => toggleTeacher(teacher.id)}
							/>
							<span class="sr-only">Select Teacher</span>
						</td>
						<td>{teacher.name}</td>
						<td>
							<div class="flex flex-wrap gap-1">
								{#each teacher.classes as classItem}
									<span class="badge badge-primary">{classItem.name}</span>
								{/each}
							</div>
						</td>
						<td class="text-right">
							<a
								href={`/teachers/${teacher.id}`}
								title="View Teacher Details"
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
								<span class="sr-only">View teacher details</span>
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="md:hidden">
		<div class="join mb-4">
			<button class="btn join-item" onclick={toggleAllTeachers}>
				{allTeachersSelected ? 'Unselect All' : 'Select All'}
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
				{#each [...selectedTeachers] as teacher}
					<input type="text" name="teacherId" value={teacher} hidden />
				{/each}
				<div class="indicator">
					<span class="indicator-item badge badge-neutral">{selectedTeachers.size}</span>
					<button class="btn" type="submit" disabled={selectedTeachers.size === 0}>
						Delete Selected
					</button>
				</div>
			</form>
		</div>
		<ul class="list">
			{#each data.teachers as teacher}
				<li class="list-row rounded-box flex w-full items-center gap-2 tracking-wide shadow">
					<div class="flex w-full grow justify-between gap-2">
						<div class="flex items-center gap-2">
							<div>
								<input
									title="Select Teacher"
									type="checkbox"
									class="checkbox"
									checked={selectedTeachers.has(teacher.id)}
									onchange={() => toggleTeacher(teacher.id)}
								/>
								<span class="sr-only">Select Teacher</span>
							</div>
							<div>
								<p class="font-semibold">{teacher.name}</p>
								<div class="mt-2">
									<dl>
										<dt class="font-semibold uppercase">Classes</dt>
										<dd>
											<div class="flex flex-wrap gap-1">
												{#each teacher.classes as classItem}
													<span class="badge badge-primary">{classItem.name}</span>
												{/each}
											</div>
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
					<a
						href={`/teachers/${teacher.id}`}
						title="View Teacher Details"
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
						<span class="sr-only">View teacher details</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	dl > dt,
	dd {
		display: inline;
	}
	dl > dt::after {
		content: ': ';
	}
</style>
