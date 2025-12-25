module.exports=[60585,a=>{"use strict";var b=a.i(50479),c=a.i(96547),d=a.i(56790);async function e(a){let b=a.get("activityName"),e=a.get("description"),f=a.get("type"),g=a.get("maxCapacity")?Number(a.get("maxCapacity")):null,h=a.get("startDate"),i=a.get("endDate"),j=a.get("clubId")?Number(a.get("clubId")):null,k=a.get("eventId")?Number(a.get("eventId")):null;try{return c.default.prepare(`
      INSERT INTO activities (activityName, description, type, maxCapacity, startDate, endDate, clubId, eventId)
      VALUES (@activityName, @description, @type, @maxCapacity, @startDate, @endDate, @clubId, @eventId)
    `).run({activityName:b,description:e,type:f,maxCapacity:g,startDate:h,endDate:i,clubId:j,eventId:k}),(0,d.revalidatePath)("/activities"),{success:!0,message:"Activity created successfully"}}catch(a){return{success:!1,message:a.message}}}async function f(){try{return c.default.prepare(`
      SELECT 
        a.*,
        e.eventName,
        c.clubName
      FROM activities a
      LEFT JOIN events e ON a.eventId = e.eventId
      LEFT JOIN clubs c ON a.clubId = c.clubId
      ORDER BY a.startDate DESC
    `).all()}catch(a){return console.error("Failed to fetch activities:",a),[]}}async function g(a){try{return c.default.prepare(`
      SELECT 
        a.*,
        e.eventName,
        c.clubName
      FROM activities a
      LEFT JOIN events e ON a.eventId = e.eventId
      LEFT JOIN clubs c ON a.clubId = c.clubId
      WHERE a.activityId = ?
    `).get(a)||null}catch(a){return console.error("Failed to fetch activity:",a),null}}async function h(a,b){let e=b.get("activityName"),f=b.get("description"),g=b.get("type"),h=b.get("maxCapacity")?Number(b.get("maxCapacity")):null,i=b.get("startDate"),j=b.get("endDate"),k=b.get("clubId")?Number(b.get("clubId")):null,l=b.get("eventId")?Number(b.get("eventId")):null;try{return c.default.prepare(`
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
    `).run({activityName:e,description:f,type:g,maxCapacity:h,startDate:i,endDate:j,clubId:k,eventId:l,activityId:a}),(0,d.revalidatePath)("/activities"),{success:!0,message:"Activity updated successfully"}}catch(a){return{success:!1,message:a.message}}}async function i(a){try{return c.default.prepare("DELETE FROM activities WHERE activityId = ?").run(a),(0,d.revalidatePath)("/activities"),{success:!0,message:"Activity deleted successfully"}}catch(a){return{success:!1,message:a.message}}}async function j(a){try{return c.default.prepare(`
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
    `).all(a)||[]}catch(a){return console.error("Failed to fetch registrations:",a),[]}}async function k(a){let b=Number(a.get("activityId")),e=Number(a.get("studentId"));if(!b||!e)return{success:!1,message:"Invalid Activity or Student ID"};try{return c.default.prepare(`
      INSERT INTO registrations (studentId, activityId)
      VALUES (@studentId, @activityId)
    `).run({studentId:e,activityId:b}),(0,d.revalidatePath)("/activities"),{success:!0,message:"Student successfully registered for activity"}}catch(a){if("SQLITE_CONSTRAINT_PRIMARYKEY"===a.code||"SQLITE_CONSTRAINT_UNIQUE"===a.code)return{success:!1,message:"Student is already registered for this activity"};return{success:!1,message:a.message}}}async function l(a){let b=Number(a.get("activityId")),e=Number(a.get("studentId"));if(!b||!e)return{success:!1,message:"Invalid Activity or Student ID"};try{return c.default.prepare("DELETE FROM registrations WHERE activityId = ? AND studentId = ?").run(b,e),(0,d.revalidatePath)("/activities"),{success:!0,message:"Student removed from activity"}}catch(a){return{success:!1,message:a.message}}}async function m(a){try{return c.default.prepare(`
      SELECT 
        res.*,
        r.resourceName,
        r.type
      FROM reservations res
      JOIN resources r ON res.resourceId = r.resourceId
      WHERE res.activityId = ?
      ORDER BY res.startDate ASC
    `).all(a)||[]}catch(a){return console.error("Failed to fetch reservations:",a),[]}}async function n(a){if(!a)return null;try{return c.default.prepare(`
      SELECT * FROM events WHERE eventId = ?
    `).get(a)||null}catch(a){return console.error("Failed to fetch event:",a),null}}async function o(a){if(!a)return null;try{return c.default.prepare(`
      SELECT * FROM clubs WHERE clubId = ?
    `).get(a)||null}catch(a){return console.error("Failed to fetch club:",a),null}}async function p(a){try{return c.default.prepare(`
      SELECT gr.*, g.fullName, g.email, g.phone
      FROM guestRoles gr
      JOIN guests g ON gr.guestId = g.guestId
      WHERE gr.activityId = ?
      ORDER BY gr.startDate ASC
    `).all(a)||[]}catch(a){return console.error("Failed to fetch activity guests:",a),[]}}async function q(a){let b=Number(a.get("activityId")),e=Number(a.get("guestId")),f=a.get("roleDescription"),g=a.get("startDate"),h=a.get("endDate");if(!b||!e)return{success:!1,message:"Invalid Activity or Guest ID"};try{return c.default.prepare(`
      INSERT INTO guestRoles (guestId, activityId, roleDescription, startDate, endDate)
      VALUES (@guestId, @activityId, @roleDescription, @startDate, @endDate)
    `).run({guestId:e,activityId:b,roleDescription:f,startDate:g,endDate:h}),(0,d.revalidatePath)("/activities"),{success:!0,message:"Guest added to activity successfully"}}catch(a){return{success:!1,message:a.message}}}async function r(a){if(!a)return{success:!1,message:"Invalid Guest Role ID"};try{return c.default.prepare("DELETE FROM guestRoles WHERE guestRoleId = ?").run(a),(0,d.revalidatePath)("/activities"),{success:!0,message:"Guest removed from activity"}}catch(a){return{success:!1,message:a.message}}}(0,a.i(66759).ensureServerEntryExports)([e,f,g,h,i,j,k,l,m,n,o,p,q,r]),(0,b.registerServerReference)(e,"4093677df15a691f79b9cb9ce3b204c7a80ac2e1f6",null),(0,b.registerServerReference)(f,"0029907054bb533d649e0cb8363cb92ada7167165e",null),(0,b.registerServerReference)(g,"40e025b20ccdc23e088c3bf2009f19c7eb055378d3",null),(0,b.registerServerReference)(h,"608b8ecf7bcf672259111e83ff9d1fdd254243c838",null),(0,b.registerServerReference)(i,"4059e57844d4ecdbe90674012c6944c857f0d2e812",null),(0,b.registerServerReference)(j,"406e02b10a7397e5dc5b47a78b613db42fbb599d85",null),(0,b.registerServerReference)(k,"406f178211d76a54e61fe86f5f14c9006f5beb072b",null),(0,b.registerServerReference)(l,"405ec7b88a7417ca9286d6d3f1eb7f5278f5dd0875",null),(0,b.registerServerReference)(m,"40ab32aabd37baaf13619ac786fe6ba3b765614849",null),(0,b.registerServerReference)(n,"408ce5a9f748b35313f03680b86ec2bb0a70ac3bf6",null),(0,b.registerServerReference)(o,"40dddd9cd1381153508219f86179015b0a89e2f7b6",null),(0,b.registerServerReference)(p,"40ccc803938615b356e948a03f53eba1c89b055021",null),(0,b.registerServerReference)(q,"40556636c39d7e57a9b537d18c9d96372cb097778a",null),(0,b.registerServerReference)(r,"4088ca76255c9d7d24cdbac7e2ada697db7876ce7b",null),a.s(["addGuestToActivity",()=>q,"addStudentToActivity",()=>k,"createActivity",()=>e,"deleteActivity",()=>i,"getActivities",()=>f,"getActivityById",()=>g,"getActivityClub",()=>o,"getActivityEvent",()=>n,"getActivityGuests",()=>p,"getActivityRegistrations",()=>j,"getActivityReservations",()=>m,"removeGuestFromActivity",()=>r,"removeStudentFromActivity",()=>l,"updateActivity",()=>h])},73754,a=>{"use strict";var b=a.i(67493),c=a.i(50479),d=a.i(96547),e=a.i(56790),f=a.i(66759);async function g(a){let b=a.get("nom"),c=a.get("type_ressource");try{return d.default.prepare(`
      INSERT INTO resources (resourceName, type)
      VALUES (@resourceName, @type)
    `).run({resourceName:b,type:c}),(0,e.revalidatePath)("/resources"),{success:!0,message:"Resource created successfully"}}catch(a){return{success:!1,message:a.message}}}async function h(){try{return d.default.prepare("SELECT * FROM resources ORDER BY resourceName ASC").all()}catch(a){return console.error("Failed to fetch resources:",a),[]}}async function i(a,b){let c=b.get("nom"),f=b.get("type_ressource");try{return d.default.prepare(`
      UPDATE resources 
      SET resourceName = @resourceName,
          type = @type
      WHERE resourceId = @resourceId
    `).run({resourceName:c,type:f,resourceId:a}),(0,e.revalidatePath)("/resources"),{success:!0,message:"Resource updated successfully"}}catch(a){return{success:!1,message:a.message}}}async function j(a){try{return d.default.prepare("DELETE FROM resources WHERE resourceId = ?").run(a),(0,e.revalidatePath)("/resources"),{success:!0,message:"Resource deleted successfully"}}catch(a){return{success:!1,message:a.message}}}async function k(a){let b=a.get("reservationName"),c=Number(a.get("resourceId")),f=Number(a.get("activityId")),g=a.get("startDate"),h=a.get("endDate");try{return d.default.prepare(`
      INSERT INTO reservations (reservationName, resourceId, activityId, startDate, endDate)
      VALUES (@reservationName, @resourceId, @activityId, @startDate, @endDate)
    `).run({reservationName:b,resourceId:c,activityId:f,startDate:g,endDate:h}),(0,e.revalidatePath)("/resources"),(0,e.revalidatePath)("/reservations"),{success:!0,message:"Reservation created successfully"}}catch(a){return{success:!1,message:a.message}}}async function l(){try{return d.default.prepare(`
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
    `).all()}catch(a){return console.error("Failed to fetch reservations:",a),[]}}async function m(a){try{return d.default.prepare("DELETE FROM reservations WHERE reservationId = ?").run(a),(0,e.revalidatePath)("/resources"),(0,e.revalidatePath)("/reservations"),{success:!0,message:"Reservation deleted successfully"}}catch(a){return{success:!1,message:a.message}}}async function n(a){try{return d.default.prepare(`
      SELECT 
        r.*,
        a.activityName
      FROM reservations r
      JOIN activities a ON r.activityId = a.activityId
      WHERE r.resourceId = ?
      ORDER BY r.startDate DESC
    `).all(a)}catch(a){return console.error("Failed to fetch reservations by resource:",a),[]}}(0,f.ensureServerEntryExports)([g,h,i,j]),(0,c.registerServerReference)(g,"407f81cec20b4a4841cefb5568a48822a27ad3a5ef",null),(0,c.registerServerReference)(h,"00e654ceabdc2ef0b3abb64113b50455102b755fa8",null),(0,c.registerServerReference)(i,"601411d3b4eab9a02b85129d9bcac63b0a3552b743",null),(0,c.registerServerReference)(j,"40f77f8aeebe4126b29849e4c8e7bfd327abd48476",null),(0,f.ensureServerEntryExports)([k,l,m,n]),(0,c.registerServerReference)(k,"404eebf20e5aa1690ea82ec4e4c684ed18c777e83a",null),(0,c.registerServerReference)(l,"0072b14644364f2ab70443cec4b8a509feedfa6503",null),(0,c.registerServerReference)(m,"40d043237f4dbfa7f5cd74ae0594e29d76ac23a32e",null),(0,c.registerServerReference)(n,"4089807368ac87c2b929fba2e74a9ce9371944ae7a",null);var o=a.i(60585);a.s([],32237),a.i(32237),a.s(["0029907054bb533d649e0cb8363cb92ada7167165e",()=>o.getActivities,"0072b14644364f2ab70443cec4b8a509feedfa6503",()=>l,"00e654ceabdc2ef0b3abb64113b50455102b755fa8",()=>h,"00f497f1f80dfe93943451c06664f4127784cb3b2c",()=>b.logout,"404eebf20e5aa1690ea82ec4e4c684ed18c777e83a",()=>k,"407f81cec20b4a4841cefb5568a48822a27ad3a5ef",()=>g,"40d043237f4dbfa7f5cd74ae0594e29d76ac23a32e",()=>m,"40f77f8aeebe4126b29849e4c8e7bfd327abd48476",()=>j,"601411d3b4eab9a02b85129d9bcac63b0a3552b743",()=>i],73754)}];

//# sourceMappingURL=CL0V_340c0765._.js.map