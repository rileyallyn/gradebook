import { api } from '$lib/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => await api.getClassGrades();

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const homeroomName = data.get('name') as string;
		const grade = data.get('grade') as string;
		return await api.addHomeroom(homeroomName, grade);
	}
};
