import { api } from "$lib/server";
import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
export const load = async () => {
    const { assignments } = await api.getAssignments();
    const { classes } = await api.getClasses();
    return { assignments, classes };
}

function validateAssignment(data: FormData) {
    const name = data.get('name')?.toString();
    if (!name) {
        throw new Error('Name is required');
    }
    const description = data.get('description')?.toString();
    if (!description) {
        throw new Error('Description is required');
    }
    const maxPoints = data.get('maxPoints')?.toString();
    if (!maxPoints) {
        throw new Error('Max points is required');
    }
    const standard = data.get('standard')?.toString();
    if (!standard) {
        throw new Error('Standard is required');
    }
    const classId = data.get('classId')?.toString();
    if (!classId) {
        throw new Error('Class is required');
    }
    return { name, description, maxPoints, standard, classId };
}

export const actions: Actions = {
    add: async ({ request }) => {
        const data = await request.formData();
        const { name, description, maxPoints, standard, classId } = validateAssignment(data);
        try {
            await api.addAssignment({
                name,
                description,
                max_points: parseInt(maxPoints),
                standard
            }, {
                class: classId
            });
        } catch (error) {
            console.error(error);
            return fail(500, {
                name: 'Failed to add assignment',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
        return { success: true };
    }
}