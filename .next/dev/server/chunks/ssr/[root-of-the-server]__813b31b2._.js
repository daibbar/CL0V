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
"[project]/CL0V/actions/resource-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00905ced75f03995e227b455995464dedb302e1ced":"getResources","40396c3f28fed8b5da41699c47aa596277509cfbc9":"deleteResource","40ee5438c8961451bbfb3b0b77f7e9f178c2c524ba":"createResource","607a8e08b05b1a1ebb58971bc65ba06677a6fe31ae":"updateResource"},"",""] */ __turbopack_context__.s([
    "createResource",
    ()=>createResource,
    "deleteResource",
    ()=>deleteResource,
    "getResources",
    ()=>getResources,
    "updateResource",
    ()=>updateResource
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function createResource(formData) {
    const resourceName = formData.get('nom');
    const type = formData.get('type_ressource');
    try {
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      INSERT INTO resources (resourceName, type)
      VALUES (@resourceName, @type)
    `);
        stmt.run({
            resourceName,
            type
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/resources');
        return {
            success: true,
            message: 'Resource created successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
async function getResources() {
    try {
        const resources = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM resources ORDER BY resourceName ASC').all();
        return resources;
    } catch (error) {
        console.error("Failed to fetch resources:", error);
        return [];
    }
}
async function updateResource(resourceId, formData) {
    const resourceName = formData.get('nom');
    const type = formData.get('type_ressource');
    try {
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      UPDATE resources 
      SET resourceName = @resourceName,
          type = @type
      WHERE resourceId = @resourceId
    `);
        stmt.run({
            resourceName,
            type,
            resourceId
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/resources');
        return {
            success: true,
            message: 'Resource updated successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
async function deleteResource(resourceId) {
    try {
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM resources WHERE resourceId = ?');
        stmt.run(resourceId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/resources');
        return {
            success: true,
            message: 'Resource deleted successfully'
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
    createResource,
    getResources,
    updateResource,
    deleteResource
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createResource, "40ee5438c8961451bbfb3b0b77f7e9f178c2c524ba", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getResources, "00905ced75f03995e227b455995464dedb302e1ced", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateResource, "607a8e08b05b1a1ebb58971bc65ba06677a6fe31ae", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteResource, "40396c3f28fed8b5da41699c47aa596277509cfbc9", null);
}),
"[project]/CL0V/actions/reservation-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"004b16872264b7de30e368c2e395d8c92468b04c65":"getReservations","40284b035f4c334da0822a91ad88d37d2186c22267":"deleteReservation","408458f0b75839577084502fa49599c1f41c447faf":"getReservationsByResource","40abac75f02495a1afb4eee1758bc3a1a22c59ed7d":"createReservation"},"",""] */ __turbopack_context__.s([
    "createReservation",
    ()=>createReservation,
    "deleteReservation",
    ()=>deleteReservation,
    "getReservations",
    ()=>getReservations,
    "getReservationsByResource",
    ()=>getReservationsByResource
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function createReservation(formData) {
    const reservationName = formData.get('reservationName');
    const resourceId = Number(formData.get('resourceId'));
    const activityId = Number(formData.get('activityId'));
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    try {
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      INSERT INTO reservations (reservationName, resourceId, activityId, startDate, endDate)
      VALUES (@reservationName, @resourceId, @activityId, @startDate, @endDate)
    `);
        stmt.run({
            reservationName,
            resourceId,
            activityId,
            startDate,
            endDate
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/resources');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/reservations');
        return {
            success: true,
            message: 'Reservation created successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
async function getReservations() {
    try {
        const reservations = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      SELECT 
        r.*,
        res.resourceName,
        res.type as resourceType,
        a.activityName,
        a.type as activityType
      FROM reservations r
      JOIN resources res ON r.resourceId = res.resourceId
      JOIN activities a ON r.activityId = a.activityId
      ORDER BY r.startDate DESC
    `).all();
        return reservations;
    } catch (error) {
        console.error("Failed to fetch reservations:", error);
        return [];
    }
}
async function deleteReservation(reservationId) {
    try {
        const stmt = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM reservations WHERE reservationId = ?');
        stmt.run(reservationId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/resources');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/reservations');
        return {
            success: true,
            message: 'Reservation deleted successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
async function getReservationsByResource(resourceId) {
    try {
        const reservations = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      SELECT 
        r.*,
        a.activityName
      FROM reservations r
      JOIN activities a ON r.activityId = a.activityId
      WHERE r.resourceId = ?
      ORDER BY r.startDate DESC
    `).all(resourceId);
        return reservations;
    } catch (error) {
        console.error("Failed to fetch reservations by resource:", error);
        return [];
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createReservation,
    getReservations,
    deleteReservation,
    getReservationsByResource
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createReservation, "40abac75f02495a1afb4eee1758bc3a1a22c59ed7d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getReservations, "004b16872264b7de30e368c2e395d8c92468b04c65", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteReservation, "40284b035f4c334da0822a91ad88d37d2186c22267", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getReservationsByResource, "408458f0b75839577084502fa49599c1f41c447faf", null);
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
"[project]/CL0V/.next-internal/server/app/resources/page/actions.js { ACTIONS_MODULE0 => \"[project]/CL0V/actions/resource-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/CL0V/actions/reservation-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/CL0V/actions/activity-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$resource$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/resource-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$reservation$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/reservation-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/activity-actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
}),
"[project]/CL0V/.next-internal/server/app/resources/page/actions.js { ACTIONS_MODULE0 => \"[project]/CL0V/actions/resource-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/CL0V/actions/reservation-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/CL0V/actions/activity-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "004b16872264b7de30e368c2e395d8c92468b04c65",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$reservation$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getReservations"],
    "00905ced75f03995e227b455995464dedb302e1ced",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$resource$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getResources"],
    "00d7abac122d2009179788ee8ba03e756a794d1668",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActivities"],
    "40284b035f4c334da0822a91ad88d37d2186c22267",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$reservation$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteReservation"],
    "40396c3f28fed8b5da41699c47aa596277509cfbc9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$resource$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteResource"],
    "40abac75f02495a1afb4eee1758bc3a1a22c59ed7d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$reservation$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createReservation"],
    "40ee5438c8961451bbfb3b0b77f7e9f178c2c524ba",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$resource$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createResource"],
    "607a8e08b05b1a1ebb58971bc65ba06677a6fe31ae",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$resource$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateResource"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f2e$next$2d$internal$2f$server$2f$app$2f$resources$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$CL0V$2f$actions$2f$resource$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$CL0V$2f$actions$2f$reservation$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/CL0V/.next-internal/server/app/resources/page/actions.js { ACTIONS_MODULE0 => "[project]/CL0V/actions/resource-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/CL0V/actions/reservation-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/CL0V/actions/activity-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$resource$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/resource-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$reservation$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/reservation-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$activity$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/activity-actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__813b31b2._.js.map