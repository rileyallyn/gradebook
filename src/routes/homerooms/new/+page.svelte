<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData, PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<div class="mx-auto max-w-2xl">
	<h1 class="mb-3">Add new Homeroom</h1>
	<form method="post" use:enhance>
		<div class="flex flex-col gap-3">
			<label class="flex items-center gap-3">
				<div>Name<span class="text-error">*</span>:</div>
				<input type="text" class="input" name="name" required />
			</label>
			<label class="flex items-center gap-3">
				<div>Grade<span class="text-error">*</span>:</div>
				<select name="grade" class="select" required>
					{#each data.classGradeOptions as option}
						<option value={option.value}>{option.name}</option>
					{/each}
				</select>
			</label>
			<button type="submit" class="btn btn-primary mt-4">Submit</button>
		</div>
	</form>
</div>
