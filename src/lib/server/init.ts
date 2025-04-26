/**
  This is an init script for test data.
  If the database breaks or needs to be reset, you can delete all the namespaces in the Explorer that are not
  prefixed with a $ and run the following script in the Sandbox
*/

/** These imports are available in the Sandbox and should not be imported */
import { id, tx } from '@instantdb/admin';
import { db } from './db';
/** */

const classGradeOptionsArray = [
	{ name: 'Kindergarten', value: '0' },
	{ name: '1st Grade', value: '1' },
	{ name: '2nd Grade', value: '2' },
	{ name: '3rd Grade', value: '3' },
	{ name: '4th Grade', value: '4' },
	{ name: '5th Grade', value: '5' },
	{ name: '6th Grade', value: '6' },
	{ name: '7th Grade', value: '7' },
	{ name: '8th Grade', value: '8' }
];
const homeroomsArray = [
	{ name: 'The Curious Caterpillars', grade: '0' },
	{ name: 'The Playful Puppies', grade: '0' },
	{ name: 'The Busy Bees', grade: '1' },
	{ name: 'The Bouncing Bunnies', grade: '2' },
	{ name: 'The Gentle Giraffes', grade: '3' },
	{ name: 'The Leaping Leopards', grade: '4' },
	{ name: 'The Jazzy Jaguars', grade: '5' },
	{ name: 'The Giggly Grapes', grade: '6' },
	{ name: 'The Tangy Tangerines', grade: '7' },
	{ name: 'The Wonderful Watermelons', grade: '8' }
];
const teachersArray = [
	{ name: 'Eleanor Vance' },
	{ name: 'Samuel Davies' },
	{ name: 'Olivia Chen' },
	{ name: 'Benjamin Carter' },
	{ name: 'Sophia Rodriguez' },
	{ name: 'Ethan Miller' },
	{ name: 'Isabella Wilson' },
	{ name: 'Noah Garcia' },
	{ name: 'Amelia Lewis' },
	{ name: 'Caleb Hall' },
	{ name: 'Victoria Allen' },
	{ name: 'Owen Young' },
	{ name: 'Penelope King' },
	{ name: 'Henry Wright' },
	{ name: 'Scarlett Green' }
];
const studentsArray = [
	{ name: 'Liam Johnson' },
	{ name: 'Olivia Smith' },
	{ name: 'Noah Williams' },
	{ name: 'Emma Brown' },
	{ name: 'Oliver Jones' },
	{ name: 'Ava Garcia' },
	{ name: 'Elijah Miller' },
	{ name: 'Sophia Davis' },
	{ name: 'William Rodriguez' },
	{ name: 'Isabella Martinez' },
	{ name: 'James Wilson' },
	{ name: 'Mia Anderson' },
	{ name: 'Benjamin Taylor' },
	{ name: 'Charlotte Thomas' },
	{ name: 'Lucas Hernandez' },
	{ name: 'Amelia Moore' },
	{ name: 'Henry Jackson' },
	{ name: 'Evelyn White' },
	{ name: 'Alexander Harris' },
	{ name: 'Abigail Martin' },
	{ name: 'Samuel Thompson' },
	{ name: 'Elizabeth Lewis' },
	{ name: 'Daniel Walker' },
	{ name: 'Grace Clark' },
	{ name: 'Matthew Hall' },
	{ name: 'Chloe Allen' },
	{ name: 'Joseph Young' },
	{ name: 'Victoria King' },
	{ name: 'David Wright' },
	{ name: 'Scarlett Green' },
	{ name: 'Michael Adams' },
	{ name: 'Madison Baker' },
	{ name: 'Andrew Nelson' },
	{ name: 'Lily Carter' },
	{ name: 'Christopher Mitchell' },
	{ name: 'Layla Roberts' },
	{ name: 'Joshua Phillips' },
	{ name: 'Natalie Hill' },
	{ name: 'Ryan Turner' },
	{ name: 'Audrey Collins' },
	{ name: 'Nathan Long' },
	{ name: 'Brooklyn Stewart' },
	{ name: 'Gabriel Price' },
	{ name: 'Savannah Morris' },
	{ name: 'Christian Bailey' },
	{ name: 'Allison Rivera' },
	{ name: 'Jonathan Cooper' },
	{ name: 'Claire Kelly' },
	{ name: 'Aaron Howard' },
	{ name: 'Samantha Reed' },
	{ name: 'Charles Powell' },
	{ name: 'Anna Bell' },
	{ name: 'Thomas Murphy' },
	{ name: 'Lucy Sanders' },
	{ name: 'Caleb Peterson' },
	{ name: 'Paisley Cox' },
	{ name: 'Anthony Griffin' },
	{ name: 'Ella Richardson' },
	{ name: 'Isaac Wood' },
	{ name: 'Violet Brooks' },
	{ name: 'Gavin Bennett' },
	{ name: 'Stella Gray' },
	{ name: 'Dylan James' },
	{ name: 'Caroline Hayes' },
	{ name: 'Austin Ford' },
	{ name: 'Hazel Perry' },
	{ name: 'Brandon Butler' },
	{ name: 'Eleanor Coleman' },
	{ name: 'Kevin Jenkins' },
	{ name: 'Willow Bryant' },
	{ name: 'Justin Sanders' },
	{ name: 'Skylar Torres' },
	{ name: 'Nicholas Ross' },
	{ name: 'Sadie Morgan' },
	{ name: 'Tyler Lopez' },
	{ name: 'Ruby Edwards' },
	{ name: 'Connor Ward' },
	{ name: 'Autumn Flores' },
	{ name: 'Angel Ramirez' },
	{ name: 'Naomi Simmons' },
	{ name: 'Hunter Watson' },
	{ name: 'Riley Hayes' },
	{ name: 'Evan Barnes' },
	{ name: 'Ariana Gonzales' },
	{ name: 'Adam Sullivan' },
	{ name: 'Ellie Russell' },
	{ name: 'Jose Myers' },
	{ name: 'Genesis Mendoza' },
	{ name: 'Cameron Chapman' },
	{ name: 'Eva Stone' },
	{ name: 'Adrian Romero' },
	{ name: 'Nova Barnes' },
	{ name: 'Jeremiah Reyes' },
	{ name: 'Emilia Price' },
	{ name: 'Jordan Bell' },
	{ name: 'Penelope Butler' },
	{ name: 'Wesley Long' },
	{ name: 'Aubrey Diaz' },
	{ name: 'Robert Perry' },
	{ name: 'Lila Coleman' },
	{ name: 'Chase Jenkins' },
	{ name: 'Maya Bryant' },
	{ name: 'Owen Torres' },
	{ name: 'Ivy Sanders' },
	{ name: 'Eric Ross' },
	{ name: 'Serenity Morgan' },
	{ name: 'Cole Lopez' },
	{ name: 'Luna Edwards' },
	{ name: 'Blake Ward' },
	{ name: 'Aurora Flores' },
	{ name: 'Vincent Ramirez' },
	{ name: 'Willow Simmons' },
	{ name: 'Miles Watson' },
	{ name: 'Summer Hayes' },
	{ name: 'Dominic Barnes' },
	{ name: 'Bella Gonzales' },
	{ name: 'Alex Sullivan' },
	{ name: 'Hazel Russell' },
	{ name: 'Tristan Myers' },
	{ name: 'Jade Mendoza' },
	{ name: 'Parker Chapman' },
	{ name: 'Gianna Stone' },
	{ name: 'Leo Romero' },
	{ name: 'Skye Barnes' },
	{ name: 'Jaxon Reyes' },
	{ name: 'Clara Price' },
	{ name: 'Eli Bell' },
	{ name: 'Violet Butler' },
	{ name: 'Asher Long' },
	{ name: 'Scarlett Diaz' },
	{ name: 'Lincoln Perry' },
	{ name: 'Nora Coleman' },
	{ name: 'Silas Jenkins' },
	{ name: 'Iris Bryant' },
	{ name: 'Jasper Torres' },
	{ name: 'Leah Sanders' },
	{ name: 'Finn Ross' },
	{ name: 'Adeline Morgan' },
	{ name: 'Owen Lopez' },
	{ name: 'Rose Edwards' },
	{ name: 'Declan Ward' },
	{ name: 'Wren Flores' },
	{ name: 'Theodore Ramirez' },
	{ name: 'Chloe Simmons' }
];
const classesArray = [
	// the classes should have names like "Music", "Art", "Science", etc, and should have longer descriptions
	{
		name: 'Classroom Music',
		description:
			'A class for children to learn music, including singing, playing instruments, and music theory'
	},
	{ name: 'Handbells', description: 'A class for children to learn handbells and music theory' },
	{ name: 'Choir', description: 'A class for children to learn singing and music theory' },
	{
		name: 'Band',
		description: 'A class for children to learn playing instruments and music theory'
	},
	{
		name: 'Art 1',
		description: 'A class for children to learn art, including drawing, painting, and sculpture'
	},
	{
		name: 'Art 2',
		description: 'A class for children to learn art, including drawing, painting, and sculpture'
	},
	{
		name: 'Science',
		description: 'A class for children to learn science, including biology, chemistry, and physics'
	},
	{
		name: 'Math',
		description: 'A class for children to learn math, including arithmetic, algebra, and geometry'
	},
	{
		name: 'English',
		description: 'A class for children to learn English, including reading, writing, and grammar'
	},
	{
		name: 'History',
		description:
			'A class for children to learn history, including world history, US history, and ancient history'
	},
	{
		name: 'Geography',
		description:
			'A class for children to learn geography, including world geography, US geography, and ancient geography'
	},
	{
		name: 'Physical Education 1',
		description:
			'A class for children to learn physical education, including sports, fitness, and health'
	},
	{
		name: 'Physical Education 2',
		description:
			'A class for children to learn physical education, including sports, fitness, and health'
	},
	{ name: 'Computer Science', description: 'A class for children to learn about computers' },
	{ name: 'Spanish 1', description: 'A class for children to learn Spanish' },
	{ name: 'Spanish 2', description: 'A class for children to learn Spanish' }
];
await db.transact(
	classGradeOptionsArray.map((classGradeOption) =>
		tx.classGradeOptions[id()].update(classGradeOption)
	)
);
await db.transact(homeroomsArray.map((homeroom) => tx.homerooms[id()].update(homeroom)));
await db.transact(teachersArray.map((teacher) => tx.teachers[id()].update(teacher)));
await db.transact(studentsArray.map((student) => tx.students[id()].update(student)));
await db.transact(classesArray.map((classItem) => tx.classes[id()].update(classItem)));

const homerooms = await db
	.query({ homerooms: { $: { fields: ['id'] } } })
	.then((res) => res.homerooms);
const teachers = await db
	.query({ teachers: { $: { fields: ['id'] } } })
	.then((res) => res.teachers);
const students = await db
	.query({ students: { $: { fields: ['id'] } } })
	.then((res) => res.students);
const classes = await db.query({ classes: { $: { fields: ['id'] } } }).then((res) => res.classes);

await db.transact(homerooms.map((v, i) => tx.homerooms[v.id].link({ teachers: [teachers[i].id] })));
await db.transact(
	students.map((v, i) => tx.students[v.id].link({ homeroom: homerooms[i % homerooms.length].id }))
);
await db.transact(
	classes.map((v, i) => {
		const startIndex = Math.floor(Math.random() * students.length);
		const endIndex = startIndex + Math.floor(Math.random() * (students.length - startIndex + 1));
		return tx.classes[v.id].link({
			students: students.slice(startIndex, endIndex).map((c) => c.id)
		});
	})
);
await db.transact(
	classes.map((v, i) => tx.classes[v.id].link({ teachers: [teachers[i % teachers.length].id] }))
);
