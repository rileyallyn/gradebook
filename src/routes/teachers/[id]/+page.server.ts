import { api } from "$lib/server";
import { error } from "@sveltejs/kit";
export const load = async ({ params }) => {
    if (!params.id) {
        throw error(404, 'Teacher not found');
    }
    const { teachers } = await api.getTeachers();
    if (teachers.length === 0) {
        throw error(404, 'Teacher not found');
    }
    return { teacher: teachers[0] };
};
