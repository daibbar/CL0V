module.exports = [
"[externals]/better-sqlite3 [external] (better-sqlite3, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("better-sqlite3", () => require("better-sqlite3"));

module.exports = mod;
}),
"[project]/CL0V/lib/db.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/better-sqlite3 [external] (better-sqlite3, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const dbPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'cl0v.db');
const db = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__["default"](dbPath, {
    verbose: console.log
});
db.pragma('foreign_keys = ON');
const __TURBOPACK__default__export__ = db;
}),
"[project]/CL0V/actions/event-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00b3e34c4e07d70cddec963eb433f89987d4b1ecc1":"getEvents","403e5a982f8755e6b16f59f4809c421466d15886a0":"createEvent","405eda02ecdfa76802a6324bc23adc89fb34d879a0":"addStudentToEvent","4065cfb9e2b3af6bead2163348801ce68958481d8f":"removeStudentFromEvent","40b9392a185f6ffae43160a7f170e8f4ebbaa456c0":"deleteEvent","606b7e8b78018ace53376c80e58e5d16cf5092564f":"updateEvent"},"",""] */ __turbopack_context__.s([
    "addStudentToEvent",
    ()=>addStudentToEvent,
    "createEvent",
    ()=>createEvent,
    "deleteEvent",
    ()=>deleteEvent,
    "getEvents",
    ()=>getEvents,
    "removeStudentFromEvent",
    ()=>removeStudentFromEvent,
    "updateEvent",
    ()=>updateEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function createEvent(formData) {
    const eventName = formData.get('eventName');
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    try {
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      INSERT INTO events (eventName, startDate, endDate)
      VALUES (@eventName, @startDate, @endDate)
    `);
        stmt.run({
            eventName,
            startDate,
            endDate
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/events');
        return {
            success: true,
            message: 'Event created successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
async function getEvents() {
    try {
        const events = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM events ORDER BY startDate DESC').all();
        return events;
    } catch (error) {
        console.error("Failed to fetch events:", error);
        return [];
    }
}
async function updateEvent(eventId, formData) {
    const eventName = formData.get('eventName');
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    try {
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      UPDATE events 
      SET eventName = @eventName, 
          startDate = @startDate, 
          endDate = @endDate
      WHERE eventId = @eventId
    `);
        stmt.run({
            eventName,
            startDate,
            endDate,
            eventId
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/events');
        return {
            success: true,
            message: 'Event updated successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
async function deleteEvent(eventId) {
    try {
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM events WHERE eventId = ?');
        stmt.run(eventId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/events');
        return {
            success: true,
            message: 'Event deleted successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
async function addStudentToEvent(formData) {
    const eventId = Number(formData.get('eventId'));
    const studentId = Number(formData.get('studentId'));
    if (!eventId || !studentId) {
        return {
            success: false,
            message: 'Invalid Event or Student ID'
        };
    }
    try {
        // Uses the camelCase table name 'eventParticipants' matching your schema
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      INSERT INTO eventParticipants (eventId, studentId)
      VALUES (@eventId, @studentId)
    `);
        stmt.run({
            eventId,
            studentId
        });
        // Revalidate events to update the UI counts/lists immediately
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/events');
        return {
            success: true,
            message: 'Student successfully registered for event'
        };
    } catch (error) {
        // Handle Unique Constraint (Student already added)
        if (error.code === 'SQLITE_CONSTRAINT_PRIMARYKEY' || error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return {
                success: false,
                message: 'Student is already registered for this event'
            };
        }
        return {
            success: false,
            message: error.message
        };
    }
}
async function removeStudentFromEvent(formData) {
    const eventId = Number(formData.get('eventId'));
    const studentId = Number(formData.get('studentId'));
    if (!eventId || !studentId) {
        return {
            success: false,
            message: 'Invalid Event or Student ID'
        };
    }
    try {
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM eventParticipants WHERE eventId = ? AND studentId = ?');
        stmt.run(eventId, studentId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/events');
        return {
            success: true,
            message: 'Student removed from event'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    addStudentToEvent,
    removeStudentFromEvent
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createEvent, "403e5a982f8755e6b16f59f4809c421466d15886a0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getEvents, "00b3e34c4e07d70cddec963eb433f89987d4b1ecc1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateEvent, "606b7e8b78018ace53376c80e58e5d16cf5092564f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteEvent, "40b9392a185f6ffae43160a7f170e8f4ebbaa456c0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addStudentToEvent, "405eda02ecdfa76802a6324bc23adc89fb34d879a0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeStudentFromEvent, "4065cfb9e2b3af6bead2163348801ce68958481d8f", null);
}),
"[project]/CL0V/actions/student-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0076e1ee761f3c725f60e6b94644d057cf1652cdf3":"getStudents","00fe3536568a6c117a4b57577e978eb83ea68f419d":"getMajors","405fda7eb3a9b799d827ff4332611a9f0e62f6c74e":"deleteStudent","40852ca8bcc92030e1c2fec9a5d89cb0a554ab764e":"createStudent","60a0ef4ce8b4795ac36b4acc6df890381a47990a1b":"updateStudent"},"",""] */ __turbopack_context__.s([
    "createStudent",
    ()=>createStudent,
    "deleteStudent",
    ()=>deleteStudent,
    "getMajors",
    ()=>getMajors,
    "getStudents",
    ()=>getStudents,
    "updateStudent",
    ()=>updateStudent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getStudents() {
    // We JOIN with majors to get the readable name (e.g., 'IID') instead of just a number
    const students = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
    SELECT 
      students.*, 
      majors.majorName 
    FROM students 
    LEFT JOIN majors ON students.majorId = majors.majorId
    ORDER BY students.lastName ASC
  `).all();
    return students;
}
async function getMajors() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM majors ORDER BY majorName ASC').all();
}
async function createStudent(formData) {
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const cne = formData.get('cne');
    const email = formData.get('email');
    // Convert string "1" to number 1, or null if empty
    const majorId = formData.get('majorId') ? parseInt(formData.get('majorId')) : null;
    try {
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      INSERT INTO students (firstName, lastName, cne, email, majorId)
      VALUES (@firstName, @lastName, @cne, @email, @majorId)
    `);
        stmt.run({
            firstName,
            lastName,
            cne,
            email,
            majorId
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/students');
        return {
            success: true,
            message: 'Student registered successfully'
        };
    } catch (error) {
        // Handle Unique Constraints (Duplicate CNE or Email)
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return {
                success: false,
                message: 'Error: Student Code (CNE) or Email already exists.'
            };
        }
        return {
            success: false,
            message: error.message
        };
    }
}
async function updateStudent(studentId, formData) {
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const cne = formData.get('cne');
    const email = formData.get('email');
    const majorId = formData.get('majorId') ? parseInt(formData.get('majorId')) : null;
    try {
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      UPDATE students 
      SET firstName = @firstName, 
          lastName = @lastName, 
          cne = @cne, 
          email = @email, 
          majorId = @majorId
      WHERE studentId = @studentId
    `);
        stmt.run({
            firstName,
            lastName,
            cne,
            email,
            majorId,
            studentId
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/students');
        return {
            success: true,
            message: 'Student updated successfully'
        };
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return {
                success: false,
                message: 'Error: Student Code or Email is already taken.'
            };
        }
        return {
            success: false,
            message: error.message
        };
    }
}
async function deleteStudent(studentId) {
    try {
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM students WHERE studentId = ?');
        stmt.run(studentId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/students');
        return {
            success: true,
            message: 'Student deleted successfully'
        };
    } catch (error) {
        // SQLITE_CONSTRAINT_FOREIGNKEY happens if you try to delete a student 
        // who is arguably an "Organizer" of an event or has critical linked data.
        // (Though usually, ON DELETE CASCADE handles this, it's good to be safe)
        return {
            success: false,
            message: error.message
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getStudents,
    getMajors,
    createStudent,
    updateStudent,
    deleteStudent
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudents, "0076e1ee761f3c725f60e6b94644d057cf1652cdf3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMajors, "00fe3536568a6c117a4b57577e978eb83ea68f419d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createStudent, "40852ca8bcc92030e1c2fec9a5d89cb0a554ab764e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateStudent, "60a0ef4ce8b4795ac36b4acc6df890381a47990a1b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteStudent, "405fda7eb3a9b799d827ff4332611a9f0e62f6c74e", null);
}),
"[project]/CL0V/.next-internal/server/app/events/page/actions.js { ACTIONS_MODULE0 => \"[project]/CL0V/actions/event-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/CL0V/actions/student-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/event-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$student$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/student-actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/CL0V/.next-internal/server/app/events/page/actions.js { ACTIONS_MODULE0 => \"[project]/CL0V/actions/event-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/CL0V/actions/student-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0076e1ee761f3c725f60e6b94644d057cf1652cdf3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$student$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStudents"],
    "00b3e34c4e07d70cddec963eb433f89987d4b1ecc1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEvents"],
    "403e5a982f8755e6b16f59f4809c421466d15886a0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createEvent"],
    "405eda02ecdfa76802a6324bc23adc89fb34d879a0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addStudentToEvent"],
    "4065cfb9e2b3af6bead2163348801ce68958481d8f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeStudentFromEvent"],
    "40b9392a185f6ffae43160a7f170e8f4ebbaa456c0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteEvent"],
    "606b7e8b78018ace53376c80e58e5d16cf5092564f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateEvent"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f2e$next$2d$internal$2f$server$2f$app$2f$events$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$CL0V$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$CL0V$2f$actions$2f$student$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/CL0V/.next-internal/server/app/events/page/actions.js { ACTIONS_MODULE0 => "[project]/CL0V/actions/event-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/CL0V/actions/student-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/event-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$student$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/student-actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9fd5bcce._.js.map