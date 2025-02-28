import { api } from '$lib/server';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => await api.getClassGradeOptions();

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const grade = data.get('grade') as string;

		return await api.addHomeroom({ name, grade });
	}
};
