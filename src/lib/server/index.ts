import { INSTANT_APP_ADMIN_TOKEN, INSTANT_APP_ID } from '$env/static/private';
import { id, init, tx, type InstaQLEntity } from '@instantdb/admin';
import schema, { type AppSchema } from '../../../instant.schema';
import { updated } from '$app/state';
import { assets } from '$app/paths';

const db = init({
	appId: INSTANT_APP_ID,
	adminToken: INSTANT_APP_ADMIN_TOKEN,
	schema
});

type Entity<T extends keyof AppSchema['entities']> = InstaQLEntity<AppSchema, T>;
type NoIdEntity<T extends keyof AppSchema['entities']> = Omit<InstaQLEntity<AppSchema, T>, 'id'>;

export const api = {
	getHomerooms: async () =>
		await db.query({
			homerooms: {
				teachers: {},
				students: {}
			},
			classGradeOptions: {},
			teachers: {},
			students: {}
		}),
	getHomeroom: async (homeroomId: string) =>
		await db.query({
			homerooms: {
				$: {
					where: {
						id: homeroomId
					}
				},
				teachers: {},
				students: {}
			},
			teachers: {},
			students: {}
		}),
	addHomeroom: async (newHomeroom: NoIdEntity<'homerooms'>, link: { teachers?: string[] }) =>
		await db.transact([db.tx.homerooms[id()].update(newHomeroom).link(link)]),
	editHomeroom: async (
		homeroomId: string,
		updatedHomeroom: NoIdEntity<'homerooms'>,
		link: { teachers?: string[] },
		unlink: { teachers?: string[] }
	) =>
		await db.transact([
			db.tx.homerooms[homeroomId].update(updatedHomeroom).link(link).unlink(unlink)
		]),
	deleteHomeroom: async (homeroomId: string) =>
		await db.transact([db.tx.homerooms[homeroomId].delete()]),
	deleteHomerooms: async (homeroomIds: string[]) =>
		await db.transact(homeroomIds.map((homeroomId) => db.tx.homerooms[homeroomId].delete())),
	getTeachers: async () =>
		await db.query({
			teachers: {
				classes: {},
				homerooms: {}
			}
		}),
	getTeacher: async () =>
		await db.query({
			teachers: {}
		}),
	addTeacher: async (
		newTeacher: NoIdEntity<'teachers'>,
		link: { classes?: string[]; homerooms?: string[] }
	) => await db.transact([db.tx.teachers[id()].update(newTeacher).link(link)]),
	editTeacher: async (
		teacherId: string,
		updatedTeacher: NoIdEntity<'teachers'>,
		link: { classes?: string[]; homerooms?: string[] }
	) => await db.transact([db.tx.teachers[teacherId].update(updatedTeacher).link(link)]),
	deleteTeacher: async (homeroomId: string) =>
		await db.transact([db.tx.teachers[homeroomId].delete()]),
	deleteTeachers: async (teacherIds: string[]) =>
		await db.transact(teacherIds.map((teacherId) => db.tx.teachers[teacherId].delete())),
	getStudents: async () =>
		await db.query({
			students: {
				homeroom: {},
				classes: {
					assignments: {
						grades: {}
					}
				},
				assignments: {
					grades: {}
				}
			}
		}),
	getStudent: async (studentId: string) =>
		await db.query({
			students: {
				$: {
					where: {
						id: studentId
					}
				},
				homeroom: {
					teachers: {}
				},
				classes: {
					assignemnts: {
						grades: {}
					},
					teachers: {}
				},
				assignments: {
					grades: {}
				},
				grades: {}
			}
		}),
	addStudent: async (
		newStudent: NoIdEntity<'students'>,
		link: { homeroom?: string; classes?: string[]; assignments?: [] }
	) => await db.transact([db.tx.students[id()].update(newStudent).link(link)]),
	editStudent: async (
		studentId: string,
		updatedStudent: NoIdEntity<'students'>,
		link: { homeroom?: string; classes?: string[]; assignments?: [] }
	) => await db.transact([db.tx.students[studentId].update(updatedStudent).link(link)]),
	deleteStudent: async (studentId: string) =>
		await db.transact([db.tx.students[studentId].delete()]),
	deleteStudents: async (studentIds: string[]) =>
		await db.transact(studentIds.map((studentId) => db.tx.students[studentId].delete())),
	getClasses: async () =>
		await db.query({
			classes: {
				assignemnts: {},
				students: {}
			}
		}),
	getClass: async (classId: string) =>
		await db.query({
			classes: {
				$: {
					where: {
						id: classId
					}
				},
				assignemnts: {},
				students: {}
			}
		}),
	addClass: async (
		newClass: NoIdEntity<'classes'>,
		link: { assignments?: string[]; students?: string[] }
	) => await db.transact([db.tx.classes[id()].update(newClass).link(link)]),
	editClass: async (
		classId: string,
		updatedClass: NoIdEntity<'classes'>,
		link: { assignments?: string[]; students?: string[] },
		unlink: { assignments?: string[]; students?: string[] }
	) => await db.transact([db.tx.classes[classId].update(updatedClass).link(link).unlink(unlink)]),
	deleteClass: async (classId: string) => await db.transact([db.tx.classes[classId].delete()]),
	deleteClasses: async (classIds: string[]) =>
		await db.transact(classIds.map((classId) => db.tx.classes[classId].delete())),
	getAssignments: async () =>
		await db.query({
			assignments: {
				grades: {},
				students: {
					grades: {}
				},
				class: {
					teachers: {}
				}
			}
		}),
	getAssignment: async (assignmentId: string) =>
		await db.query({
			assignments: {
				$: {
					where: {
						id: assignmentId
					}
				},
				grades: {},
				students: {
					grades: {}
				},
				class: {
					teachers: {}
				}
			}
		}),
	addAssignment: async (
		newAssigment: NoIdEntity<'assignments'>,
		link: { grades?: string[]; students?: string[]; class?: string }
	) => await db.transact([db.tx.assignments[id()].update(newAssigment).link(link)]),
	editAssignment: async (
		assignmentId: string,
		newAssigment: NoIdEntity<'assignments'>,
		link: { grades?: string[]; students?: string[]; class?: string },
		unlink: { grades?: string[]; students?: string[]; class?: string }
	) =>
		await db.transact([
			db.tx.assignments[assignmentId].update(newAssigment).link(link).unlink(unlink)
		]),
	deleleAssignment: async (assignmentId: string) =>
		await db.transact([db.tx.assignments[assignmentId].delete()]),
	deleteAssignments: async (assignmentIds: string[]) =>
		await db.transact(
			assignmentIds.map((assignmentId) => db.tx.assignments[assignmentId].delete())
		),
	getGrades: async () =>
		await db.query({
			grades: {
				student: {
					homeroom: {}
				},
				assignment: {
					class: {}
				}
			}
		}),
	getGrade: async (gradeId: string) =>
		await db.query({
			grades: {
				$: {
					where: {
						id: gradeId
					}
				},
				student: {
					homeroom: {}
				},
				assignment: {
					class: {}
				}
			}
		}),
	addGrade: async (
		newGrade: NoIdEntity<'grades'>,
		link: { student?: string; assignment?: string }
	) => await db.transact([db.tx.grades[id()].update(newGrade).link(link)]),
	editGrade: async (
		gradeId: string,
		newGrade: NoIdEntity<'grades'>,
		link: { student?: string; assignment?: string },
		unlink: { student?: string; assignment?: string }
	) => await db.transact([db.tx.grades[gradeId].update(newGrade).link(link).unlink(unlink)]),
	deleleGrade: async (gradeId: string) => await db.transact([db.tx.grades[gradeId].delete()]),
	deleteGrades: async (gradeIds: string[]) =>
		await db.transact(gradeIds.map((grade) => db.tx.grades[grade].delete())),
	getClassGradeOptions: async () => await db.query({ classGradeOptions: {} })
};
