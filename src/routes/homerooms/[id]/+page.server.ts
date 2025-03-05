import { api } from '$lib/server';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => await api.getHomeroom(params.id);

export const actions: Actions = {
	edit: async ({ params, request }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const grade = data.get('grade') as string;

		return await api.editHomeroom(params.id, { name, grade });
	},
	delete: async ({ params }) => {
		await api.deleteHomeroom(params.id);
		return redirect(303, '/homerooms');
	}
};
