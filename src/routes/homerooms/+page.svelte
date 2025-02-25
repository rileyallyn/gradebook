<script lang="ts">
	import type { PageServerData } from './$types';

	const { data }: { data: PageServerData } = $props();
</script>

<h1>Homerooms</h1>
<a href="/homerooms/new">Add New Homeroom</a>
<ul class="">
	{#each data.homerooms as homeroom}
		<li>
			<details class="collapse-arrow border-base-200 collapse border">
				<summary class="collapse-title">
					<ul class="list">
						<li class="list-row">{homeroom.name}</li>
						{#if homeroom.grade}
							<li class="list-row font-semibold">{homeroom.grade} Grade</li>
						{/if}
					</ul>
				</summary>
				<div class="collapse-content">
					<dl>
						<dt>Teacher(s)</dt>
						<dl>
							<ul>
								{#each homeroom.teachers as teacher, index}
									<li>{teacher.name}{index < homeroom.teachers.length - 1 ? ', ' : ''}</li>
								{/each}
							</ul>
						</dl>
					</dl>
				</div>
			</details>
		</li>
	{/each}
</ul>
