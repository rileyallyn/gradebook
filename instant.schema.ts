import { i } from '@instantdb/admin';

const _schema = i.schema({
	entities: {
		$users: i.entity({
			email: i.string().unique().indexed()
		}),
		$files: i.entity({
			'content-disposition': i.string().indexed(),
			'content-type': i.string().indexed(),
			'key-version': i.number(),
			'location-id': i.string().indexed().unique(),
			path: i.string().indexed().unique(),
			size: i.number().indexed(),
			url: i.any()
		}),
		homerooms: i.entity({
			name: i.string(),
			grade: i.string()
		}),
		teachers: i.entity({
			name: i.string()
		}),
		students: i.entity({
			name: i.string()
		}),
		classes: i.entity({
			name: i.string(),
			description: i.string().optional()
		}),
		assignments: i.entity({
			name: i.string(),
			description: i.string().optional(),
			standard: i.string().optional(),
			max_points: i.number()
		}),
		grades: i.entity({
			standard_score: i.json<number[]>().optional(),
			score: i.number().optional()
		}),
		classGradeOptions: i.entity({
			value: i.string().indexed(),
			name: i.string()
		})
	},
	links: {
		teacherHomeroom: {
			forward: { on: 'teachers', has: 'many', label: 'homerooms' },
			reverse: { on: 'homerooms', has: 'many', label: 'teachers' }
		},
		studentHomerooms: {
			forward: { on: 'students', has: 'one', label: 'homeroom' },
			reverse: { on: 'homerooms', has: 'many', label: 'students' }
		},
		teacherClass: {
			forward: { on: 'teachers', has: 'many', label: 'classes' },
			reverse: { on: 'classes', has: 'many', label: 'teachers' }
		},
		studentClass: {
			forward: { on: 'students', has: 'many', label: 'classes' },
			reverse: { on: 'classes', has: 'many', label: 'students' }
		},
		studentAssignment: {
			forward: { on: 'students', has: 'many', label: 'assignments' },
			reverse: { on: 'assignments', has: 'many', label: 'students' }
		},
		studentGrade: {
			forward: { on: 'students', has: 'many', label: 'grades' },
			reverse: { on: 'grades', has: 'one', label: 'student', onDelete: 'cascade' }
		},
		classAssignemt: {
			forward: { on: 'classes', has: 'many', label: 'assignemnts' },
			reverse: { on: 'assignments', has: 'one', label: 'class', onDelete: 'cascade' }
		},
		assignmentGrade: {
			forward: { on: 'assignments', has: 'many', label: 'grades' },
			reverse: { on: 'grades', has: 'one', label: 'assignment', onDelete: 'cascade' }
		}
	}
});

// This helps Typescript display better intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
