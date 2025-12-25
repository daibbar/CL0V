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
"[project]/CL0V/actions/activity-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00d7abac122d2009179788ee8ba03e756a794d1668":"getActivities","402836b906fe1a896e3e13ce8df53cffa7ece3719c":"getActivityGuests","403743946631f84fffc6b2e0cf41a09587cd4e8b15":"getActivityRegistrations","40509477903f07b033aa6707b1fadb9b733c60d2f9":"getActivityClub","4056bc820f2c930d8b70f3b8408ed3d51ea16a3d7c":"deleteActivity","4056f4d7605604cd5848f7cac4947d48023e1fa31f":"createActivity","406c87a631657372fe92405ee9aecf16948758609c":"addStudentToActivity","40827adc5cb82f88807f3cceaadd9dccb2d352dc4e":"getActivityReservations","40937c43e914adda587cb7e80333349a5d18623975":"removeStudentFromActivity","40980ed63f3fe1f7d6d7d8c8fe97a163769addb434":"getActivityById","40fd6fd1a4e486d3084405a2e10a04886aed6dc85b":"getActivityEvent","60e36e300aaa5b3e43b04781cdeded8c39f3d3ebf1":"updateActivity"},"",""] */ __turbopack_context__.s([
    "addStudentToActivity",
    ()=>addStudentToActivity,
    "createActivity",
    ()=>createActivity,
    "deleteActivity",
    ()=>deleteActivity,
    "getActivities",
    ()=>getActivities,
    "getActivityById",
    ()=>getActivityById,
    "getActivityClub",
    ()=>getActivityClub,
    "getActivityEvent",
    ()=>getActivityEvent,
    "getActivityGuests",
    ()=>getActivityGuests,
    "getActivityRegistrations",
    ()=>getActivityRegistrations,
    "getActivityReservations",
    ()=>getActivityReservations,
    "removeStudentFromActivity",
    ()=>removeStudentFromActivity,
    "updateActivity",
    ()=>updateActivity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function createActivity(formData) {
    const activityName = formData.get('activityName');
    const description = formData.get('description');
    const type = formData.get('type');
    const maxCapacity = formData.get('maxCapacity') ? Number(formData.get('maxCapacity')) : null;
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const clubId = formData.get('clubId') ? Number(formData.get('clubId')) : null;
    const eventId = formData.get('eventId') ? Number(formData.get('eventId')) : null;
    try {
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      INSERT INTO activities (activityName, description, type, maxCapacity, startDate, endDate, clubId, eventId)
      VALUES (@activityName, @description, @type, @maxCapacity, @startDate, @endDate, @clubId, @eventId)
    `);
        stmt.run({
            activityName,
            description,
            type,
            maxCapacity,
            startDate,
            endDate,
            clubId,
            eventId
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/activities');
        return {
            success: true,
            message: 'Activity created successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
async function getActivities() {
    try {
        const activities = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      SELECT 
        a.*,
        e.eventName,
        c.clubName
      FROM activities a
      LEFT JOIN events e ON a.eventId = e.eventId
      LEFT JOIN clubs c ON a.clubId = c.clubId
      ORDER BY a.startDate DESC
    `).all();
        return activities;
    } catch (error) {
        console.error("Failed to fetch activities:", error);
        return [];
    }
}
async function getActivityById(activityId) {
    try {
        const activity = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      SELECT 
        a.*,
        e.eventName,
        c.clubName
      FROM activities a
      LEFT JOIN events e ON a.eventId = e.eventId
      LEFT JOIN clubs c ON a.clubId = c.clubId
      WHERE a.activityId = ?
    `).get(activityId);
        return activity || null;
    } catch (error) {
        console.error("Failed to fetch activity:", error);
        return null;
    }
}
async function updateActivity(activityId, formData) {
    const activityName = formData.get('activityName');
    const description = formData.get('description');
    const type = formData.get('type');
    const maxCapacity = formData.get('maxCapacity') ? Number(formData.get('maxCapacity')) : null;
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const clubId = formData.get('clubId') ? Number(formData.get('clubId')) : null;
    const eventId = formData.get('eventId') ? Number(formData.get('eventId')) : null;
    try {
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      UPDATE activities 
      SET activityName = @activityName,
          description = @description,
          type = @type,
          maxCapacity = @maxCapacity,
          startDate = @startDate,
          endDate = @endDate,
          clubId = @clubId,
          eventId = @eventId
      WHERE activityId = @activityId
    `);
        stmt.run({
            activityName,
            description,
            type,
            maxCapacity,
            startDate,
            endDate,
            clubId,
            eventId,
            activityId
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/activities');
        return {
            success: true,
            message: 'Activity updated successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
async function deleteActivity(activityId) {
    try {
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM activities WHERE activityId = ?');
        stmt.run(activityId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/activities');
        return {
            success: true,
            message: 'Activity deleted successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
async function getActivityRegistrations(activityId) {
    try {
        const registrations = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      SELECT 
        r.*,
        s.firstName,
        s.lastName,
        s.cne,
        s.email
      FROM registrations r
      JOIN students s ON r.studentId = s.studentId
      WHERE r.activityId = ?
      ORDER BY s.lastName ASC
    `).all(activityId);
        return registrations || [];
    } catch (error) {
        console.error("Failed to fetch registrations:", error);
        return [];
    }
}
async function addStudentToActivity(formData) {
    const activityId = Number(formData.get('activityId'));
    const studentId = Number(formData.get('studentId'));
    if (!activityId || !studentId) {
        return {
            success: false,
            message: 'Invalid Activity or Student ID'
        };
    }
    try {
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      INSERT INTO registrations (studentId, activityId)
      VALUES (@studentId, @activityId)
    `);
        stmt.run({
            studentId,
            activityId
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/activities');
        return {
            success: true,
            message: 'Student successfully registered for activity'
        };
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_PRIMARYKEY' || error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return {
                success: false,
                message: 'Student is already registered for this activity'
            };
        }
        return {
            success: false,
            message: error.message
        };
    }
}
async function removeStudentFromActivity(formData) {
    const activityId = Number(formData.get('activityId'));
    const studentId = Number(formData.get('studentId'));
    if (!activityId || !studentId) {
        return {
            success: false,
            message: 'Invalid Activity or Student ID'
        };
    }
    try {
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM registrations WHERE activityId = ? AND studentId = ?');
        stmt.run(activityId, studentId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/activities');
        return {
            success: true,
            message: 'Student removed from activity'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
async function getActivityReservations(activityId) {
    try {
        const reservations = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      SELECT 
        res.*,
        r.resourceName,
        r.type
      FROM reservations res
      JOIN resources r ON res.resourceId = r.resourceId
      WHERE res.activityId = ?
      ORDER BY res.startDate ASC
    `).all(activityId);
        return reservations || [];
    } catch (error) {
        console.error("Failed to fetch reservations:", error);
        return [];
    }
}
async function getActivityEvent(eventId) {
    if (!eventId) return null;
    try {
        const event = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      SELECT * FROM events WHERE eventId = ?
    `).get(eventId);
        return event || null;
    } catch (error) {
        console.error("Failed to fetch event:", error);
        return null;
    }
}
async function getActivityClub(clubId) {
    if (!clubId) return null;
    try {
        const club = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      SELECT * FROM clubs WHERE clubId = ?
    `).get(clubId);
        return club || null;
    } catch (error) {
        console.error("Failed to fetch club:", error);
        return null;
    }
}
async function getActivityGuests(activityId) {
    try {
        const guests = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      SELECT gr.*, g.fullName, g.email, g.phone
      FROM guestRoles gr
      JOIN guests g ON gr.guestId = g.guestId
      WHERE gr.activityId = ?
      ORDER BY gr.startDate ASC
    `).all(activityId);
        return guests || [];
    } catch (error) {
        console.error("Failed to fetch activity guests:", error);
        return [];
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createActivity,
    getActivities,
    getActivityById,
    updateActivity,
    deleteActivity,
    getActivityRegistrations,
    addStudentToActivity,
    removeStudentFromActivity,
    getActivityReservations,
    getActivityEvent,
    getActivityClub,
    getActivityGuests
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createActivity, "4056f4d7605604cd5848f7cac4947d48023e1fa31f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getActivities, "00d7abac122d2009179788ee8ba03e756a794d1668", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getActivityById, "40980ed63f3fe1f7d6d7d8c8fe97a163769addb434", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateActivity, "60e36e300aaa5b3e43b04781cdeded8c39f3d3ebf1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteActivity, "4056bc820f2c930d8b70f3b8408ed3d51ea16a3d7c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getActivityRegistrations, "403743946631f84fffc6b2e0cf41a09587cd4e8b15", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addStudentToActivity, "406c87a631657372fe92405ee9aecf16948758609c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeStudentFromActivity, "40937c43e914adda587cb7e80333349a5d18623975", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getActivityReservations, "40827adc5cb82f88807f3cceaadd9dccb2d352dc4e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getActivityEvent, "40fd6fd1a4e486d3084405a2e10a04886aed6dc85b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getActivityClub, "40509477903f07b033aa6707b1fadb9b733c60d2f9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getActivityGuests, "402836b906fe1a896e3e13ce8df53cffa7ece3719c", null);
}),
"[project]/CL0V/actions/student-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"000c05c8913e8b991c02dcbc9a6588eb11351ad47d":"getTotalActivitiesCount","0076e1ee761f3c725f60e6b94644d057cf1652cdf3":"getStudents","00fe3536568a6c117a4b57577e978eb83ea68f419d":"getMajors","40409b46f825f48fd11d0bbe12e6eb545405bce9bd":"getStudentActivities","405896ee1640fc439a0edc4e76ed44615f302849a8":"getStudentEvents","4058c552c6e5832b78d3ff3972d188e1e2544edc4f":"getStudentClubs","405fda7eb3a9b799d827ff4332611a9f0e62f6c74e":"deleteStudent","40852ca8bcc92030e1c2fec9a5d89cb0a554ab764e":"createStudent","60a0ef4ce8b4795ac36b4acc6df890381a47990a1b":"updateStudent"},"",""] */ __turbopack_context__.s([
    "createStudent",
    ()=>createStudent,
    "deleteStudent",
    ()=>deleteStudent,
    "getMajors",
    ()=>getMajors,
    "getStudentActivities",
    ()=>getStudentActivities,
    "getStudentClubs",
    ()=>getStudentClubs,
    "getStudentEvents",
    ()=>getStudentEvents,
    "getStudents",
    ()=>getStudents,
    "getTotalActivitiesCount",
    ()=>getTotalActivitiesCount,
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
    // And we include counts for clubs, activities, and events
    const students = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
    SELECT 
      students.*, 
      majors.majorName,
      (SELECT COUNT(*) FROM clubMemberships WHERE clubMemberships.studentId = students.studentId) as clubCount,
      (SELECT COUNT(*) FROM registrations WHERE registrations.studentId = students.studentId) as activityCount,
      (SELECT COUNT(*) FROM eventParticipants WHERE eventParticipants.studentId = students.studentId) as eventCount
    FROM students 
    LEFT JOIN majors ON students.majorId = majors.majorId
    ORDER BY students.lastName ASC
  `).all();
    return students;
}
async function getStudentEvents(studentId) {
    const events = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
    SELECT e.* 
    FROM events e
    JOIN eventParticipants ep ON e.eventId = ep.eventId
    WHERE ep.studentId = ?
    ORDER BY e.startDate DESC
  `).all(studentId);
    return events;
}
async function getStudentClubs(studentId) {
    const clubs = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
    SELECT c.* 
    FROM clubs c
    JOIN clubMemberships cm ON c.clubId = cm.clubId
    WHERE cm.studentId = ?
    ORDER BY c.clubName ASC
  `).all(studentId);
    return clubs;
}
async function getStudentActivities(studentId) {
    const activities = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
    SELECT a.* 
    FROM activities a
    JOIN registrations r ON a.activityId = r.activityId
    WHERE r.studentId = ?
    ORDER BY a.startDate DESC
  `).all(studentId);
    return activities;
}
async function getTotalActivitiesCount() {
    const result = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('SELECT COUNT(*) as count FROM activities').get();
    return result.count;
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
    getStudentEvents,
    getStudentClubs,
    getStudentActivities,
    getTotalActivitiesCount,
    getMajors,
    createStudent,
    updateStudent,
    deleteStudent
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudents, "0076e1ee761f3c725f60e6b94644d057cf1652cdf3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudentEvents, "405896ee1640fc439a0edc4e76ed44615f302849a8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudentClubs, "4058c552c6e5832b78d3ff3972d188e1e2544edc4f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudentActivities, "40409b46f825f48fd11d0bbe12e6eb545405bce9bd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTotalActivitiesCount, "000c05c8913e8b991c02dcbc9a6588eb11351ad47d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMajors, "00fe3536568a6c117a4b57577e978eb83ea68f419d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createStudent, "40852ca8bcc92030e1c2fec9a5d89cb0a554ab764e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateStudent, "60a0ef4ce8b4795ac36b4acc6df890381a47990a1b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteStudent, "405fda7eb3a9b799d827ff4332611a9f0e62f6c74e", null);
}),
"[project]/CL0V/actions/event-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00b3e34c4e07d70cddec963eb433f89987d4b1ecc1":"getEvents","403e5a982f8755e6b16f59f4809c421466d15886a0":"createEvent","405eda02ecdfa76802a6324bc23adc89fb34d879a0":"addStudentToEvent","4065cfb9e2b3af6bead2163348801ce68958481d8f":"removeStudentFromEvent","409f3fef78c4c40ab3c98ef2dadb38b8619061c46d":"getEventParticipants","40b9392a185f6ffae43160a7f170e8f4ebbaa456c0":"deleteEvent","606b7e8b78018ace53376c80e58e5d16cf5092564f":"updateEvent"},"",""] */ __turbopack_context__.s([
    "addStudentToEvent",
    ()=>addStudentToEvent,
    "createEvent",
    ()=>createEvent,
    "deleteEvent",
    ()=>deleteEvent,
    "getEventParticipants",
    ()=>getEventParticipants,
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
    // clubIds is expected to be a JSON string of numbers, e.g., "[1, 2]"
    const clubIdsJson = formData.get('clubIds');
    let clubIds = [];
    if (clubIdsJson) {
        try {
            clubIds = JSON.parse(clubIdsJson);
        } catch (e) {
            console.error("Invalid clubIds JSON", e);
        }
    }
    try {
        const createTransaction = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].transaction(()=>{
            const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
        INSERT INTO events (eventName, startDate, endDate)
        VALUES (@eventName, @startDate, @endDate)
        `);
            const info = stmt.run({
                eventName,
                startDate,
                endDate
            });
            const eventId = info.lastInsertRowid;
            if (clubIds.length > 0) {
                const insertOrg = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
                INSERT INTO eventOrganizers (eventId, clubId) VALUES (?, ?)
            `);
                for (const clubId of clubIds){
                    insertOrg.run(eventId, clubId);
                }
            }
            return eventId;
        });
        createTransaction();
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
    const clubIdsJson = formData.get('clubIds');
    let clubIds = [];
    if (clubIdsJson) {
        try {
            clubIds = JSON.parse(clubIdsJson);
        } catch (e) {
            console.error("Invalid clubIds JSON", e);
        }
    }
    try {
        const updateTransaction = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].transaction(()=>{
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
            // Update organizers: delete existing, insert new
            // Only do this if clubIds was actually passed (even if empty array, meaning clear all)
            // If undefined/null logic was needed we'd check formData.has('clubIds'), but here we assume it's sent.
            if (clubIdsJson !== null) {
                const deleteOrgs = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM eventOrganizers WHERE eventId = ?');
                deleteOrgs.run(eventId);
                if (clubIds.length > 0) {
                    const insertOrg = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('INSERT INTO eventOrganizers (eventId, clubId) VALUES (?, ?)');
                    for (const clubId of clubIds){
                        insertOrg.run(eventId, clubId);
                    }
                }
            }
        });
        updateTransaction();
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
async function getEventParticipants(eventId) {
    try {
        const participants = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      SELECT s.*
      FROM eventParticipants ep
      JOIN students s ON ep.studentId = s.studentId
      WHERE ep.eventId = ?
      ORDER BY s.lastName ASC
    `).all(eventId);
        return participants || [];
    } catch (error) {
        console.error("Failed to fetch event participants:", error);
        return [];
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    addStudentToEvent,
    removeStudentFromEvent,
    getEventParticipants
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createEvent, "403e5a982f8755e6b16f59f4809c421466d15886a0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getEvents, "00b3e34c4e07d70cddec963eb433f89987d4b1ecc1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateEvent, "606b7e8b78018ace53376c80e58e5d16cf5092564f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteEvent, "40b9392a185f6ffae43160a7f170e8f4ebbaa456c0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addStudentToEvent, "405eda02ecdfa76802a6324bc23adc89fb34d879a0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeStudentFromEvent, "4065cfb9e2b3af6bead2163348801ce68958481d8f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getEventParticipants, "409f3fef78c4c40ab3c98ef2dadb38b8619061c46d", null);
}),
"[project]/CL0V/.next-internal/server/app/activities/page/actions.js { ACTIONS_MODULE0 => \"[project]/CL0V/actions/activity-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/CL0V/actions/student-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/CL0V/actions/event-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/activity-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$student$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/student-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/event-actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/CL0V/.next-internal/server/app/activities/page/actions.js { ACTIONS_MODULE0 => \"[project]/CL0V/actions/activity-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/CL0V/actions/student-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/CL0V/actions/event-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0076e1ee761f3c725f60e6b94644d057cf1652cdf3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$student$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStudents"],
    "00b3e34c4e07d70cddec963eb433f89987d4b1ecc1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEvents"],
    "00d7abac122d2009179788ee8ba03e756a794d1668",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActivities"],
    "402836b906fe1a896e3e13ce8df53cffa7ece3719c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActivityGuests"],
    "403743946631f84fffc6b2e0cf41a09587cd4e8b15",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActivityRegistrations"],
    "40509477903f07b033aa6707b1fadb9b733c60d2f9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActivityClub"],
    "4056bc820f2c930d8b70f3b8408ed3d51ea16a3d7c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteActivity"],
    "4056f4d7605604cd5848f7cac4947d48023e1fa31f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createActivity"],
    "406c87a631657372fe92405ee9aecf16948758609c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addStudentToActivity"],
    "40827adc5cb82f88807f3cceaadd9dccb2d352dc4e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActivityReservations"],
    "40937c43e914adda587cb7e80333349a5d18623975",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeStudentFromActivity"],
    "40980ed63f3fe1f7d6d7d8c8fe97a163769addb434",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActivityById"],
    "40fd6fd1a4e486d3084405a2e10a04886aed6dc85b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActivityEvent"],
    "60e36e300aaa5b3e43b04781cdeded8c39f3d3ebf1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateActivity"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f2e$next$2d$internal$2f$server$2f$app$2f$activities$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$CL0V$2f$actions$2f$student$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$CL0V$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/CL0V/.next-internal/server/app/activities/page/actions.js { ACTIONS_MODULE0 => "[project]/CL0V/actions/activity-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/CL0V/actions/student-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/CL0V/actions/event-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/activity-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$student$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/student-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/event-actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2176d8a7._.js.map