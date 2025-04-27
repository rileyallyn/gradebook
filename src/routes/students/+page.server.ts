import { api } from "$lib/server";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const load = async () => {
    const { students } = await api.getStudents();
    const { homerooms } = await api.getHomerooms();
    return { students, homerooms };
};

function validateStudent(data: FormData) {
    const name = data.get('name') as string;
    if (!name) {
        throw fail(400, {
            name: 'Name is required'
        })
    }

    const homeroom = data.get('homeroom') as string;
    if (!homeroom) {
        throw fail(400, {
            homeroom: 'Homeroom is required'
        })
    }

    return {
        name,
        homeroom
    }
}

export const actions: Actions = {
    add: async ({ request }) => {
        const data = await request.formData();
        // should be guaranteed to get a value from the form
        const { name, homeroom } = validateStudent(data);

        try {
            await api.addStudent({
                name: name as string
            }, {
                homeroom: homeroom as string
            });
        } catch (error) {
            console.error(error);
            return fail(500, {
                name: 'Failed to add student',
                error: error instanceof Error ? error.message : 'Unknown error'
            })
        }
        return {
            success: true
        }


    }
}