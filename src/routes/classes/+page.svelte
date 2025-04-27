<script lang="ts">
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import type { PageData, PageProps } from './$types';

    const { data }: PageProps = $props();
</script>

<h1 class="text-3xl font-bold text-center mb-6">Classes</h1>
<p class="text-lg text-center mb-4">Classes available to enroll students in</p>

<div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
        <button
            class="btn btn-primary"
            onclick={() => alert('Add Class functionality not implemented yet')}
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
            Add Class
        </button>
    </div>

    <div class="overflow-x-auto">
        <table class="table-auto border-collapse border border-gray-300 w-full shadow-lg rounded-lg">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border border-gray-300 px-6 py-3 text-left font-semibold text-gray-700">
                        Name
                    </th>
                    <th class="border border-gray-300 px-6 py-3 text-left font-semibold text-gray-700">
                        Description
                    </th>
                    <th class="border border-gray-300 px-6 py-3 text-left font-semibold text-gray-700">
                        Students
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each data.classes as classy}
                    <tr>
                        <td class="border border-gray-300 px-6 py-4">{classy.name}</td>
                        <td class="border border-gray-300 px-6 py-4">{classy.description}</td>
                        <td class="border border-gray-300 px-6 py-4">
                            <button
                                class="btn btn-secondary flex items-center"
                                onclick={() => (window.location.href = `/classes/${classy.id}`)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5 mr-2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.75 9V5.25m0 0H12m3.75 0h3.75M4.5 12h15m-15 0l3 3m-3-3l3-3"
                                    />
                                </svg>
                                See Students
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>