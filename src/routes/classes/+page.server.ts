import { api } from '$lib/server';

export const load = async () => {
    try {
        const { classes } = await api.getClasses(); // Fetch classes
        return { classes }; // Return classes to the Svelte component
    } catch (error) {
        return { classes: [] }; // Return an empty array on error
    }
};