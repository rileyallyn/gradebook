<script lang="ts">
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
</script>

<h1 class="text-2xl font-bold">
	{data.student.name}
</h1>
