
import { getStudentClubs } from './actions/student-actions';
import db from './lib/db';

async function verifyClubs() {
    // 1. Get a student ID who likely has a club membership
    // We can join with clubMemberships to find one
    const student = db.prepare(`
        SELECT s.studentId, s.firstName 
        FROM students s 
        JOIN clubMemberships cm ON s.studentId = cm.studentId 
        LIMIT 1
    `).get() as { studentId: number; firstName: string } | undefined;

    if (!student) {
        console.log("No students with club memberships found. Trying any student...");
        const anyStudent = db.prepare('SELECT studentId FROM students LIMIT 1').get() as { studentId: number } | undefined;
        if (!anyStudent) {
             console.log("No students found at all.");
             return;
        }
        student = { studentId: anyStudent.studentId, firstName: "Unknown" };
    }

    console.log(`Checking clubs for student ID: ${student.studentId} (${student.firstName})`);
    
    // 2. Call the action
    const clubs = await getStudentClubs(student.studentId);
    console.log("Clubs found:", clubs);
}

verifyClubs();
