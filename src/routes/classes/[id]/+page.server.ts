import { api } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const classId = params.id; // Get the class ID from the URL
    const { classes } = await api.getClass(classId); // Fetch class data
    const students = classes[0]?.students || []; // Extract students from the first class
    
    return { students };
};