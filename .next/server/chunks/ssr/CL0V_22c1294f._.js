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
    `).all(a)}catch(a){return console.error("Failed to fetch guest activities:",a),[]}}(0,a.i(66759).ensureServerEntryExports)([e,f,g,h]),(0,b.registerServerReference)(e,"00f0fbd698796520ff05242b59f678368a7d863381",null),(0,b.registerServerReference)(f,"40d7baee599e7dd3c0eed2fc9c70e5a30bc8ef4d9d",null),(0,b.registerServerReference)(g,"4085dcb6e0f2f3ac91072545b3585e7dd370b1b303",null),(0,b.registerServerReference)(h,"408d74a6d16580f8f48508ec8b892ba29f00ad2c4d",null),a.s(["createGuest",()=>f,"deleteGuest",()=>g,"getGuestActivities",()=>h,"getGuests",()=>e])},5936,a=>{"use strict";var b=a.i(67493),c=a.i(60585),d=a.i(97735),e=a.i(22878),f=a.i(45044),g=a.i(14258);a.s([],28945),a.i(28945),a.s(["0029907054bb533d649e0cb8363cb92ada7167165e",()=>c.getActivities,"00c9aac6b33d1d5b8b4a10e4a172d3a9f8ea8c3f92",()=>e.getEvents,"00d9aceb431ba52b8dbfaaa55a20c815bf08a93a45",()=>d.getStudents,"00e1ea61c1c9e73b2b6038b22b957d4558fcf03f9a",()=>f.getClubs,"00f0fbd698796520ff05242b59f678368a7d863381",()=>g.getGuests,"00f497f1f80dfe93943451c06664f4127784cb3b2c",()=>b.logout,"40556636c39d7e57a9b537d18c9d96372cb097778a",()=>c.addGuestToActivity,"4059e57844d4ecdbe90674012c6944c857f0d2e812",()=>c.deleteActivity,"405ec7b88a7417ca9286d6d3f1eb7f5278f5dd0875",()=>c.removeStudentFromActivity,"406e02b10a7397e5dc5b47a78b613db42fbb599d85",()=>c.getActivityRegistrations,"406f178211d76a54e61fe86f5f14c9006f5beb072b",()=>c.addStudentToActivity,"4088ca76255c9d7d24cdbac7e2ada697db7876ce7b",()=>c.removeGuestFromActivity,"408ce5a9f748b35313f03680b86ec2bb0a70ac3bf6",()=>c.getActivityEvent,"4093677df15a691f79b9cb9ce3b204c7a80ac2e1f6",()=>c.createActivity,"40ab32aabd37baaf13619ac786fe6ba3b765614849",()=>c.getActivityReservations,"40ccc803938615b356e948a03f53eba1c89b055021",()=>c.getActivityGuests,"40dddd9cd1381153508219f86179015b0a89e2f7b6",()=>c.getActivityClub,"40e025b20ccdc23e088c3bf2009f19c7eb055378d3",()=>c.getActivityById,"608b8ecf7bcf672259111e83ff9d1fdd254243c838",()=>c.updateActivity],5936)}];

//# sourceMappingURL=CL0V_22c1294f._.js.map