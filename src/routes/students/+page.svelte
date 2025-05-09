<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	let isAddingStudent = $state(false);
	let selectedStudents = $state(new Set<string>());
	let allStudentsSelected = $derived(selectedStudents.size === data.students.length);

	const toggleStudent = (studentId: string) => {
		const newSelectedStudents = new Set(selectedStudents);
		if (newSelectedStudents.has(studentId)) {
			newSelectedStudents.delete(studentId);
		} else {
			newSelectedStudents.add(studentId);
		}
		selectedStudents = newSelectedStudents;
	};

	const toggleAllStudents = () => {
		selectedStudents =
			selectedStudents.size === data.students.length
				? new Set()
				: new Set(data.students.map((student) => student.id));
	};
</script>

<svelte:head>
	<title>Students</title>
</svelte:head>

<div class="flex flex-col gap-3">
	<div class="breadcrumbs text-sm">
		<ul>
			<li>
				<a href="/">Home</a>
			</li>
			<li class="font-semibold">Students</li>
		</ul>
	</div>
	<div class=" flex flex-row gap-3">
		<button
			class="btn btn-secondary"
			onclick={() => (isAddingStudent = true)}
			popovertarget="add-student-form"
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
			<span>Add a student</span>
		</button>
		{#if isAddingStudent}
			<div
				id="add-student-form"
				popover="auto"
				style="inset: unset;"
				class="rounded-box border-neutral relative mt-11 border p-4 shadow"
			>
				<form
					method="post"
					class=""
					action="?/add"
					use:enhance={() => {
						isAddingStudent = false;
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
							<div>Homeroom</div>
							<select name="homeroom" class="select rounded-lg">
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
			<button class="btn join-item md:hidden" onclick={toggleAllStudents}>
				{allStudentsSelected ? 'Unselect All' : 'Select All'}
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
				{#each [...selectedStudents] as student}
					<input type="text" name="studentId" value={student} hidden />
				{/each}
				<div class="indicator">
					<span class="indicator-item badge badge-neutral">{selectedStudents.size}</span>
					<button class="btn" type="submit" disabled={selectedStudents.size === 0}>
						Delete Selected Students
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
							title="Select All Students"
							type="checkbox"
							class="checkbox"
							checked={selectedStudents.size === data.students.length}
							onchange={toggleAllStudents}
						/>
						<span class="sr-only">Select All Students</span>
					</th>
					<th>Name</th>
					<th>Homeroom</th>
					<th>Classes</th>
					<th class="text-right">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.students as student}
					<tr>
						<td>
							<input
								title="Select Student"
								type="checkbox"
								class="checkbox"
								checked={selectedStudents.has(student.id)}
								onchange={() => toggleStudent(student.id)}
							/>
							<span class="sr-only">Select Student</span>
						</td>
						<td>{student.name}</td>
						<td>
							<div class="badge badge-lg badge-neutral">
								{#if student.homeroom}
									<a href={`/homerooms/${student.homeroom.id}`} class="text-xs"
										>{student.homeroom.name}</a
									>
								{:else}
									<span class="text-xs">No homeroom</span>
								{/if}
							</div>
						</td>
						<td>
							<div class="flex flex-wrap gap-1">
								{#each student.classes as classItem}
									<span class="badge badge-primary">{classItem.name}</span>
								{/each}
							</div>
						</td>
						<td class="text-right">
							<a
								href={`/students/${student.id}`}
								title="View Student Details"
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
								<span class="sr-only">View student details</span>
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="md:hidden">
		<div class="join mb-4">
			<button class="btn join-item" onclick={toggleAllStudents}>
				{allStudentsSelected ? 'Unselect All' : 'Select All'}
			</button>
			<form class="join-item" method="post" action="?/delete">
				{#each [...selectedStudents] as student}
					<input type="text" name="studentId" value={student} hidden />
				{/each}
				<div class="indicator">
					<span class="indicator-item badge badge-neutral">{selectedStudents.size}</span>
					<button class="btn" type="submit" disabled={selectedStudents.size === 0}>
						Delete Selected
					</button>
				</div>
			</form>
		</div>
		<ul class="list">
			{#each data.students as student}
				<li class="list-row rounded-box flex w-full items-center gap-2 tracking-wide shadow">
					<div class="flex w-full grow justify-between gap-2">
						<div class="flex items-center gap-2">
							<div>
								<input
									title="Select Student"
									type="checkbox"
									class="checkbox"
									checked={selectedStudents.has(student.id)}
									onchange={() => toggleStudent(student.id)}
								/>
								<span class="sr-only">Select Student</span>
							</div>
							<div>
								<p class="font-semibold">{student.name}</p>
								<div class="mt-2">
									<dl>
										<dt class="font-semibold uppercase">Homeroom</dt>
										<dd>
											<div class="badge badge-lg badge-neutral">
												{#if student.homeroom}
													<span class="text-xs">{student.homeroom.name}</span>
												{:else}
													<span class="text-xs">No homeroom</span>
												{/if}
											</div>
										</dd>
										<dt class="font-semibold uppercase">Classes</dt>
										<dd>
											<div class="flex flex-wrap gap-1">
												{#each student.classes as classItem}
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
						href={`/students/${student.id}`}
						title="View Student Details"
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
						<span class="sr-only">View student details</span>
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
