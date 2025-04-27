import { api } from '$lib/server';

export const load = async () => {
    try {
        const { grades } = await api.getGrades(); // Fetch classes
        const { students } = await api.getStudents(); // Fetch classes
        return { grades, students }; // Return classes to the Svelte component
    } catch (error) {
        return { classes: [] }; // Return an empty array on error
    }
};