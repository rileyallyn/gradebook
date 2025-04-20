// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from '@instantdb/admin';

const _schema = i.schema({
	entities: {
		$files: i.entity({
			path: i.string().unique().indexed(),
			url: i.any()
		}),
		$users: i.entity({
			email: i.string().unique().indexed()
		}),
		assignments: i.entity({
			description: i.string().optional(),
			max_points: i.number(),
			name: i.string(),
			standard: i.string().optional()
		}),
		classes: i.entity({
			description: i.string().optional(),
			name: i.string()
		}),
		classGradeOptions: i.entity({
			name: i.string(),
			value: i.string().indexed()
		}),
		grades: i.entity({
			score: i.number(),
			standard_score: i.json<string[]>().optional(),
			comments: i.string().optional()
		}),
		homerooms: i.entity({
			grade: i.string(),
			name: i.string()
		}),
		students: i.entity({
			name: i.string()
		}),
		teachers: i.entity({
			name: i.string()
		})
	},
	links: {
		assignmentsGrades: {
			forward: {
				on: 'assignments',
				has: 'many',
				label: 'grades'
			},
			reverse: {
				on: 'grades',
				has: 'one',
				label: 'assignment',
				onDelete: 'cascade'
			}
		},
		classesAssignments: {
			forward: {
				on: 'classes',
				has: 'many',
				label: 'assignments'
			},
			reverse: {
				on: 'assignments',
				has: 'one',
				label: 'class',
				onDelete: 'cascade'
			}
		},
		studentsAssignments: {
			forward: {
				on: 'students',
				has: 'many',
				label: 'assignments'
			},
			reverse: {
				on: 'assignments',
				has: 'many',
				label: 'students'
			}
		},
		studentsClasses: {
			forward: {
				on: 'students',
				has: 'many',
				label: 'classes'
			},
			reverse: {
				on: 'classes',
				has: 'many',
				label: 'students'
			}
		},
		studentsGrades: {
			forward: {
				on: 'students',
				has: 'many',
				label: 'grades'
			},
			reverse: {
				on: 'grades',
				has: 'one',
				label: 'student',
				onDelete: 'cascade'
			}
		},
		studentsHomeroom: {
			forward: {
				on: 'students',
				has: 'one',
				label: 'homeroom'
			},
			reverse: {
				on: 'homerooms',
				has: 'many',
				label: 'students'
			}
		},
		studentsTeachers: {
			forward: {
				on: 'students',
				has: 'many',
				label: 'teachers'
			},
			reverse: {
				on: 'teachers',
				has: 'many',
				label: 'students'
			}
		},
		teachersClasses: {
			forward: {
				on: 'teachers',
				has: 'many',
				label: 'classes'
			},
			reverse: {
				on: 'classes',
				has: 'many',
				label: 'teachers'
			}
		},
		teachersHomerooms: {
			forward: {
				on: 'teachers',
				has: 'many',
				label: 'homerooms'
			},
			reverse: {
				on: 'homerooms',
				has: 'many',
				label: 'teachers'
			}
		}
	},
	rooms: {}
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
