import { api } from "$lib/server";
import { error } from "@sveltejs/kit";
export const load = async ({ params }) => {
    if (!params.id) {
        throw error(404, 'Student not found');
    }
    const { students } = await api.getStudent(params.id);
    if (students.length === 0) {
        throw error(404, 'Student not found');
    }
    return { student: students[0] };
};
