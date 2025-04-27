import { api } from "$lib/server";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const load = async () => {
    const { teachers } = await api.getTeachers();
    const { classes } = await api.getClasses();
    const { homerooms } = await api.getHomerooms();
    return { teachers, classes, homerooms };
};

function validateTeacher(data: FormData) {
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

    const classes = data.getAll('classes') as string[];
    if (!classes) {
        throw fail(400, {
            classes: 'Classes are required'
        })
    }

    return {
        name,
        homeroom,
        classes
    }
}

export const actions: Actions = {
    add: async ({ request }) => {
        const data = await request.formData();
        // should be guaranteed to get a value from the form
        const { name, classes, homeroom } = validateTeacher(data);

        try {
            await api.addTeacher({
                name: name as string
            }, {
                classes: classes,
                homerooms: [homeroom]
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
    },
    delete: async ({ request }) => {
        const data = await request.formData();
        const teacherIds = data.getAll('teacherId') as string[];

        try {
            await api.deleteTeachers(teacherIds);
        } catch (error) {
            console.error(error);
            return fail(500, {
                error: error instanceof Error ? error.message : 'Unknown error'
            })
        }
        return {
            success: true
        }
    }
}