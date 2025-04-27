<script lang="ts">
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import type { PageData, PageProps } from './$types';

    const { data }: PageProps = $props();
</script>

<h1 class="text-3xl font-bold text-center mb-6">Students</h1>
<p class="text-lg text-center mb-4">List of students enrolled in this class</p>

<div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
        <button
            class="btn btn-primary"
            onclick={() => alert('Add Student functionality not implemented yet')}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 mr-2"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Student
        </button>
    </div>

    <div class="overflow-x-auto">
        <table class="table-auto border-collapse border border-gray-300 w-full shadow-lg rounded-lg">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border border-gray-300 px-6 py-3 text-left font-semibold text-gray-700">
                        Name
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each data.students as student}
                    <tr>
                        <td class="border border-gray-300 px-6 py-4">{student.name}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>