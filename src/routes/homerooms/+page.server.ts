import { api } from '$lib/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => await api.getHomerooms();

export const actions: Actions = {
	add: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const grade = data.get('grade') as string;
		const teachers = data.getAll('teachers') as string[];

		return await api.addHomeroom({ name, grade }, { teachers });
	}
};
