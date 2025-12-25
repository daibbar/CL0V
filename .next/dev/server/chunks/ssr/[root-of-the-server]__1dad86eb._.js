module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/CL0V/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/CL0V/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/CL0V/app/events/events-client.tsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/CL0V/app/events/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$app$2f$events$2f$events$2d$client$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/app/events/events-client.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/event-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/lib/db.ts [app-rsc] (ecmascript)"); // Direct DB access for lists is fine in Server Components
;
;
;
;
// Helper to fetch students for the dropdown
async function getStudents() {
    try {
        // Return all students formatted for the UI
        const students = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('SELECT studentId, cne, firstName as prenom, lastName as nom, email FROM students').all();
        return students;
    } catch (error) {
        return [];
    }
}
async function EventsPage() {
    // 1. Fetch Real Events
    const events = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEvents"])();
    // 2. Fetch Real Students (for the "Add Student" dialog)
    const students = await getStudents();
    // 3. Pass data to the Client Component
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$app$2f$events$2f$events$2d$client$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        initialEvents: events,
        initialStudents: students
    }, void 0, false, {
        fileName: "[project]/CL0V/app/events/page.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}),
"[project]/CL0V/app/events/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/CL0V/app/events/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1dad86eb._.js.map