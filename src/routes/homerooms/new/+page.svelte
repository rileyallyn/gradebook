<script lang="ts">
	import type { PageServerData } from './$types';

	const { data }: { data: PageServerData } = $props();
	console.log(data);
</script>

<h1 class="mb-3">Add new Homeroom</h1>
<form method="post">
	<div class="flex flex-col gap-3">
		<label class="flex items-center gap-3">
			<div>Name<span class="text-error">*</span>:</div>
			<input type="text" class="input" name="name" required />
		</label>
		<label class="flex items-center gap-3">
			<div>Grade<span class="text-error">*</span>:</div>
			<select class="select" name="grade" required>
				{#each data.classGrades as grade}
					<option value={grade.name}>{grade.name}</option>
				{/each}
			</select>
		</label>
		<button type="submit" class="btn btn-primary">Submit</button>
	</div>
</form>
