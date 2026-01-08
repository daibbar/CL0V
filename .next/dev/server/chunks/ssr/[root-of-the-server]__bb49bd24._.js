module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/CL0V/auth.config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authConfig",
    ()=>authConfig
]);
const authConfig = {
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt ({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session ({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
        authorized ({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const role = auth?.user?.role;
            const isOnAdminDashboard = nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname.startsWith('/students') || nextUrl.pathname.startsWith('/clubs') || nextUrl.pathname.startsWith('/events') || nextUrl.pathname.startsWith('/activities') || nextUrl.pathname.startsWith('/memberships') || nextUrl.pathname.startsWith('/resources') || nextUrl.pathname.startsWith('/guests') || nextUrl.pathname.startsWith('/reservations');
            const isOnStudentDashboard = nextUrl.pathname.startsWith('/student');
            const isOnLogin = nextUrl.pathname.startsWith('/login');
            const isOnRegister = nextUrl.pathname.startsWith('/register');
            const isOnHome = nextUrl.pathname.startsWith('/home') || nextUrl.pathname === '/';
            // Redirect logic for logged-in users trying to access public pages
            if (isLoggedIn && (isOnLogin || isOnRegister || isOnHome)) {
                if (role === 'student') {
                    return Response.redirect(new URL('/student/dashboard', nextUrl));
                } else {
                    return Response.redirect(new URL('/dashboard', nextUrl));
                }
            }
            // Protect Admin Routes
            if (isOnAdminDashboard) {
                if (!isLoggedIn) return false;
                if (role !== 'admin') {
                    return Response.redirect(new URL('/student/dashboard', nextUrl));
                }
                return true;
            }
            // Protect Student Routes
            if (isOnStudentDashboard) {
                if (!isLoggedIn) return false;
                if (role !== 'student') {
                    // Optionally allow admins to view student dashboard or redirect them back
                    return Response.redirect(new URL('/dashboard', nextUrl));
                }
                return true;
            }
            return true;
        }
    },
    providers: []
};
}),
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
// Prevent multiple instances of better-sqlite3 in development
const globalForDb = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const db = globalForDb.db || new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__["default"](dbPath, {
    verbose: console.log
});
if ("TURBOPACK compile-time truthy", 1) globalForDb.db = db;
db.pragma('foreign_keys = ON');
const __TURBOPACK__default__export__ = db;
}),
"[project]/CL0V/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "handlers",
    ()=>handlers,
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$5$2e$0$2e$0$2d$beta$2e$30_next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next-auth@5.0.0-beta.30_next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0__react@19.2.0/node_modules/next-auth/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$5$2e$0$2e$0$2d$beta$2e$30_next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next-auth@5.0.0-beta.30_next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0__react@19.2.0/node_modules/next-auth/providers/credentials.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f40$auth$2b$core$40$0$2e$41$2e$0$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/@auth+core@0.41.0/node_modules/@auth/core/providers/credentials.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$auth$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/auth.config.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/bcryptjs@3.0.3/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function getAdmin(email) {
    try {
        const admin = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM admins WHERE email = ?').get(email);
        return admin;
    } catch (error) {
        console.error('Failed to fetch admin:', error);
        throw new Error('Failed to fetch admin.');
    }
}
async function getStudent(email) {
    try {
        const student = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM students WHERE email = ?').get(email);
        return student;
    } catch (error) {
        console.error('Failed to fetch student:', error);
        throw new Error('Failed to fetch student.');
    }
}
const { auth, signIn, signOut, handlers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$5$2e$0$2e$0$2d$beta$2e$30_next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])({
    ...__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$auth$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authConfig"],
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f40$auth$2b$core$40$0$2e$41$2e$0$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])({
            async authorize (credentials) {
                const parsedCredentials = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
                    email: __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email(),
                    password: __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6),
                    role: __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
                }).safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password, role } = parsedCredentials.data;
                    // If role is 'admin' or unspecified, check Admin
                    if (!role || role === 'admin') {
                        const admin = await getAdmin(email);
                        if (admin) {
                            if (!admin.password) return null;
                            if (admin.status !== 'accepted') return null;
                            const passwordsMatch = await __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].compare(password, admin.password);
                            if (passwordsMatch) {
                                return {
                                    id: String(admin.adminId),
                                    name: `${admin.firstName} ${admin.lastName}`,
                                    email: admin.email,
                                    role: 'admin'
                                };
                            }
                        }
                    }
                    // If role is 'student' or unspecified, check Student
                    if (!role || role === 'student') {
                        const student = await getStudent(email);
                        if (student) {
                            if (!student.password) return null;
                            const passwordsMatch = await __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].compare(password, student.password);
                            if (passwordsMatch) {
                                return {
                                    id: String(student.studentId),
                                    name: `${student.firstName} ${student.lastName}`,
                                    email: student.email,
                                    role: 'student'
                                };
                            }
                        }
                    }
                }
                console.log('Invalid credentials');
                return null;
            }
        })
    ]
});
}),
"[project]/CL0V/actions/auth-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"002248bac64ab24ef697de83b40bf4e9c7242fef37":"logout","601e1e61cf0b81486ecf74c718d8ebec8963627758":"authenticate"},"",""] */ __turbopack_context__.s([
    "authenticate",
    ()=>authenticate,
    "logout",
    ()=>logout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$5$2e$0$2e$0$2d$beta$2e$30_next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next-auth@5.0.0-beta.30_next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0__react@19.2.0/node_modules/next-auth/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f40$auth$2b$core$40$0$2e$41$2e$0$2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/@auth+core@0.41.0/node_modules/@auth/core/errors.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function authenticate(prevState, formData) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signIn"])('credentials', formData);
    } catch (error) {
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f40$auth$2b$core$40$0$2e$41$2e$0$2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AuthError"]) {
            switch(error.type){
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}
async function logout() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signOut"])({
        redirectTo: '/login'
    });
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    authenticate,
    logout
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(authenticate, "601e1e61cf0b81486ecf74c718d8ebec8963627758", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logout, "002248bac64ab24ef697de83b40bf4e9c7242fef37", null);
}),
"[project]/CL0V/actions/student-portal-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0003a2251e10145f1ad727f8826393d4104156f05c":"getAllActivitiesForStudent","006e2ee10c482947dc39eeccef4577f2aad83ba306":"getAllEventsForStudent","00cf8f8dbf05024e46fa07a0b32f187f13ba01a040":"getAllClubsForStudent","4033beccb9c98d8f1db665c4cf76141f0dc94249f9":"registerForActivity","404397fa9efbdd2ddcad5ad8a297c4974316f63738":"unregisterFromEvent","407e11f5fe5d42be312f2ec88e4181383125224c9d":"joinClub","409838616881d662fd0406e414a0c2a371ac33213b":"changePassword","40a4208f0ee462841e716b7693868d243a472c3375":"unregisterFromActivity","40a687c45b3fc03c00ca174396c52e1b21ff092aa3":"registerForEvent","40af6c7c079a3be09fa4a248b23dec95ce5d4d44d2":"leaveClub"},"",""] */ __turbopack_context__.s([
    "changePassword",
    ()=>changePassword,
    "getAllActivitiesForStudent",
    ()=>getAllActivitiesForStudent,
    "getAllClubsForStudent",
    ()=>getAllClubsForStudent,
    "getAllEventsForStudent",
    ()=>getAllEventsForStudent,
    "joinClub",
    ()=>joinClub,
    "leaveClub",
    ()=>leaveClub,
    "registerForActivity",
    ()=>registerForActivity,
    "registerForEvent",
    ()=>registerForEvent,
    "unregisterFromActivity",
    ()=>unregisterFromActivity,
    "unregisterFromEvent",
    ()=>unregisterFromEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/bcryptjs@3.0.3/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
// --- HELPERS ---
async function getStudentId() {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user?.id || session.user.role !== 'student') {
        throw new Error('Unauthorized');
    }
    return parseInt(session.user.id);
}
async function getAllEventsForStudent() {
    const studentId = await getStudentId();
    try {
        const events = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      SELECT e.*, 
        CASE WHEN ep.studentId IS NOT NULL THEN 1 ELSE 0 END as isRegistered
      FROM events e
      LEFT JOIN eventParticipants ep ON e.eventId = ep.eventId AND ep.studentId = ?
      ORDER BY e.startDate DESC
    `).all(studentId);
        return events;
    } catch (error) {
        console.error("Failed to fetch events:", error);
        return [];
    }
}
async function getAllClubsForStudent() {
    const studentId = await getStudentId();
    try {
        const clubs = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      SELECT c.*, 
        CASE WHEN cm.studentId IS NOT NULL THEN 1 ELSE 0 END as isMember,
        cm.status as membershipStatus
      FROM clubs c
      LEFT JOIN clubMemberships cm ON c.clubId = cm.clubId AND cm.studentId = ?
      ORDER BY c.clubName ASC
    `).all(studentId);
        return clubs;
    } catch (error) {
        console.error("Failed to fetch clubs:", error);
        return [];
    }
}
async function getAllActivitiesForStudent() {
    const studentId = await getStudentId();
    try {
        const activities = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      SELECT a.*, 
        CASE WHEN r.studentId IS NOT NULL THEN 1 ELSE 0 END as isRegistered
      FROM activities a
      LEFT JOIN registrations r ON a.activityId = r.activityId AND r.studentId = ?
      ORDER BY a.startDate DESC
    `).all(studentId);
        return activities;
    } catch (error) {
        console.error("Failed to fetch activities:", error);
        return [];
    }
}
async function registerForEvent(eventId) {
    const studentId = await getStudentId();
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('INSERT INTO eventParticipants (eventId, studentId) VALUES (?, ?)').run(eventId, studentId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/student/events');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/student/dashboard');
        return {
            success: true,
            message: 'Registered successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
async function unregisterFromEvent(eventId) {
    const studentId = await getStudentId();
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM eventParticipants WHERE eventId = ? AND studentId = ?').run(eventId, studentId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/student/events');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/student/dashboard');
        return {
            success: true,
            message: 'Unregistered successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
async function joinClub(clubId) {
    const studentId = await getStudentId();
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('INSERT INTO clubMemberships (clubId, studentId, status) VALUES (?, ?, ?)').run(clubId, studentId, 'pending');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/student/clubs');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/student/dashboard');
        return {
            success: true,
            message: 'Request to join club sent. Awaiting approval.'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
async function leaveClub(clubId) {
    const studentId = await getStudentId();
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM clubMemberships WHERE clubId = ? AND studentId = ?').run(clubId, studentId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/student/clubs');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/student/dashboard');
        return {
            success: true,
            message: 'Left club successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
async function registerForActivity(activityId) {
    const studentId = await getStudentId();
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('INSERT INTO registrations (activityId, studentId) VALUES (?, ?)').run(activityId, studentId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/student/activities');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/student/dashboard');
        return {
            success: true,
            message: 'Registered for activity successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
async function unregisterFromActivity(activityId) {
    const studentId = await getStudentId();
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM registrations WHERE activityId = ? AND studentId = ?').run(activityId, studentId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/student/activities');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/student/dashboard');
        return {
            success: true,
            message: 'Unregistered from activity successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
async function changePassword(formData) {
    const studentId = await getStudentId();
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    try {
        const student = __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM students WHERE studentId = ?').get(studentId);
        const match = await __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].compare(currentPassword, student.password);
        if (!match) {
            return {
                success: false,
                message: 'Incorrect current password'
            };
        }
        const hashed = await __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].hash(newPassword, 10);
        __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('UPDATE students SET password = ? WHERE studentId = ?').run(hashed, studentId);
        return {
            success: true,
            message: 'Password changed successfully'
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
    getAllEventsForStudent,
    getAllClubsForStudent,
    getAllActivitiesForStudent,
    registerForEvent,
    unregisterFromEvent,
    joinClub,
    leaveClub,
    registerForActivity,
    unregisterFromActivity,
    changePassword
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAllEventsForStudent, "006e2ee10c482947dc39eeccef4577f2aad83ba306", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAllClubsForStudent, "00cf8f8dbf05024e46fa07a0b32f187f13ba01a040", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAllActivitiesForStudent, "0003a2251e10145f1ad727f8826393d4104156f05c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerForEvent, "40a687c45b3fc03c00ca174396c52e1b21ff092aa3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(unregisterFromEvent, "404397fa9efbdd2ddcad5ad8a297c4974316f63738", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(joinClub, "407e11f5fe5d42be312f2ec88e4181383125224c9d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(leaveClub, "40af6c7c079a3be09fa4a248b23dec95ce5d4d44d2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerForActivity, "4033beccb9c98d8f1db665c4cf76141f0dc94249f9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(unregisterFromActivity, "40a4208f0ee462841e716b7693868d243a472c3375", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(changePassword, "409838616881d662fd0406e414a0c2a371ac33213b", null);
}),
"[project]/CL0V/.next-internal/server/app/student/profile/page/actions.js { ACTIONS_MODULE0 => \"[project]/CL0V/actions/auth-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/CL0V/actions/student-portal-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$auth$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/auth-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$student$2d$portal$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/student-portal-actions.ts [app-rsc] (ecmascript)");
;
;
}),
"[project]/CL0V/.next-internal/server/app/student/profile/page/actions.js { ACTIONS_MODULE0 => \"[project]/CL0V/actions/auth-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/CL0V/actions/student-portal-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "002248bac64ab24ef697de83b40bf4e9c7242fef37",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$auth$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "409838616881d662fd0406e414a0c2a371ac33213b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$student$2d$portal$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["changePassword"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f2e$next$2d$internal$2f$server$2f$app$2f$student$2f$profile$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$CL0V$2f$actions$2f$auth$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$CL0V$2f$actions$2f$student$2d$portal$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/CL0V/.next-internal/server/app/student/profile/page/actions.js { ACTIONS_MODULE0 => "[project]/CL0V/actions/auth-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/CL0V/actions/student-portal-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$auth$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/auth-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CL0V$2f$actions$2f$student$2d$portal$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CL0V/actions/student-portal-actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bb49bd24._.js.map