module.exports=[14258,a=>{"use strict";var b=a.i(50479),c=a.i(96547),d=a.i(56790);async function e(){try{return c.default.prepare("SELECT * FROM guests ORDER BY fullName ASC").all()}catch(a){return console.error("Failed to fetch guests:",a),[]}}async function f(a){let b=a.get("guest_name"),e=a.get("guest_phone"),f=a.get("guest_email");try{return c.default.prepare(`
      INSERT INTO guests (fullName, phone, email)
      VALUES (@fullName, @phone, @email)
    `).run({fullName:b,phone:e,email:f}),(0,d.revalidatePath)("/guests"),{success:!0,message:"Guest created successfully"}}catch(a){return{success:!1,message:a.message}}}async function g(a){try{return c.default.prepare("DELETE FROM guests WHERE guestId = ?").run(a),(0,d.revalidatePath)("/guests"),{success:!0,message:"Guest deleted successfully"}}catch(a){return{success:!1,message:a.message}}}async function h(a){try{return c.default.prepare(`
      SELECT 
        a.activityName,
        a.type as activityType,
        a.startDate,
        gr.roleDescription,
        e.eventName,
        c.clubName
      FROM guestRoles gr
      JOIN activities a ON gr.activityId = a.activityId
      LEFT JOIN events e ON a.eventId = e.eventId
      LEFT JOIN clubs c ON a.clubId = c.clubId
      WHERE gr.guestId = ?
      ORDER BY a.startDate DESC
    `).all(a)}catch(a){return console.error("Failed to fetch guest activities:",a),[]}}(0,a.i(66759).ensureServerEntryExports)([e,f,g,h]),(0,b.registerServerReference)(e,"00f0fbd698796520ff05242b59f678368a7d863381",null),(0,b.registerServerReference)(f,"40d7baee599e7dd3c0eed2fc9c70e5a30bc8ef4d9d",null),(0,b.registerServerReference)(g,"4085dcb6e0f2f3ac91072545b3585e7dd370b1b303",null),(0,b.registerServerReference)(h,"408d74a6d16580f8f48508ec8b892ba29f00ad2c4d",null),a.s(["createGuest",()=>f,"deleteGuest",()=>g,"getGuestActivities",()=>h,"getGuests",()=>e])},90445,a=>{"use strict";var b=a.i(67493),c=a.i(14258);a.s([],18677),a.i(18677),a.s(["00f0fbd698796520ff05242b59f678368a7d863381",()=>c.getGuests,"00f497f1f80dfe93943451c06664f4127784cb3b2c",()=>b.logout,"4085dcb6e0f2f3ac91072545b3585e7dd370b1b303",()=>c.deleteGuest,"408d74a6d16580f8f48508ec8b892ba29f00ad2c4d",()=>c.getGuestActivities,"40d7baee599e7dd3c0eed2fc9c70e5a30bc8ef4d9d",()=>c.createGuest],90445)}];

//# sourceMappingURL=CL0V_657c74d5._.js.map