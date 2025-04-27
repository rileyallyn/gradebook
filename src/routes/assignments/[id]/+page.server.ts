import { api } from "$lib/server";
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
    if (!params.id) {
        throw error(404, 'Assignment not found');
    }
    const { assignments } = await api.getAssignment(params.id);
    if (assignments.length === 0) {
        throw error(404, 'Assignment not found');
    }
    return { assignment: assignments[0] };
};
