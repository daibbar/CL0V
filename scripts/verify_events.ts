
import { getStudentEvents } from './actions/student-actions';
import db from './lib/db';

async function verifyEvents() {
    // 1. Get a student ID
    const student = db.prepare('SELECT studentId FROM students LIMIT 1').get() as { studentId: number } | undefined;

    if (!student) {
        console.log("No students found.");
        return;
    }

    console.log(`Checking events for student ID: ${student.studentId}`);
    
    // 2. Call the action
    const events = await getStudentEvents(student.studentId);
    console.log("Events found:", events);
}

verifyEvents();
