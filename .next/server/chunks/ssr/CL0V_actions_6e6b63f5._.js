module.exports=[97735,a=>{"use strict";var b=a.i(50479),c=a.i(96547),d=a.i(56790);async function e(){return c.default.prepare(`
    SELECT 
      students.*, 
      majors.majorName,
      (SELECT COUNT(*) FROM clubMemberships WHERE clubMemberships.studentId = students.studentId) as clubCount,
      (SELECT COUNT(*) FROM registrations WHERE registrations.studentId = students.studentId) as activityCount,
      (SELECT COUNT(*) FROM eventParticipants WHERE eventParticipants.studentId = students.studentId) as eventCount
    FROM students 
    LEFT JOIN majors ON students.majorId = majors.majorId
    ORDER BY students.lastName ASC
  `).all()}async function f(a){return c.default.prepare(`
    SELECT e.* 
    FROM events e
    JOIN eventParticipants ep ON e.eventId = ep.eventId
    WHERE ep.studentId = ?
    ORDER BY e.startDate DESC
  `).all(a)}async function g(a){return c.default.prepare(`
    SELECT c.* 
    FROM clubs c
    JOIN clubMemberships cm ON c.clubId = cm.clubId
    WHERE cm.studentId = ?
    ORDER BY c.clubName ASC
  `).all(a)}async function h(a){return c.default.prepare(`
    SELECT a.* 
    FROM activities a
    JOIN registrations r ON a.activityId = r.activityId
    WHERE r.studentId = ?
    ORDER BY a.startDate DESC
  `).all(a)}async function i(){return c.default.prepare("SELECT COUNT(*) as count FROM activities").get().count}async function j(){return c.default.prepare("SELECT * FROM majors ORDER BY majorName ASC").all()}async function k(a){let b=a.get("firstName"),e=a.get("lastName"),f=a.get("cne"),g=a.get("email"),h=a.get("majorId")?parseInt(a.get("majorId")):null;try{return c.default.prepare(`
      INSERT INTO students (firstName, lastName, cne, email, majorId)
      VALUES (@firstName, @lastName, @cne, @email, @majorId)
    `).run({firstName:b,lastName:e,cne:f,email:g,majorId:h}),(0,d.revalidatePath)("/students"),{success:!0,message:"Student registered successfully"}}catch(a){if("SQLITE_CONSTRAINT_UNIQUE"===a.code)return{success:!1,message:"Error: Student Code (CNE) or Email already exists."};return{success:!1,message:a.message}}}async function l(a,b){let e=b.get("firstName"),f=b.get("lastName"),g=b.get("cne"),h=b.get("email"),i=b.get("majorId")?parseInt(b.get("majorId")):null;try{return c.default.prepare(`
      UPDATE students 
      SET firstName = @firstName, 
          lastName = @lastName, 
          cne = @cne, 
          email = @email, 
          majorId = @majorId
      WHERE studentId = @studentId
    `).run({firstName:e,lastName:f,cne:g,email:h,majorId:i,studentId:a}),(0,d.revalidatePath)("/students"),{success:!0,message:"Student updated successfully"}}catch(a){if("SQLITE_CONSTRAINT_UNIQUE"===a.code)return{success:!1,message:"Error: Student Code or Email is already taken."};return{success:!1,message:a.message}}}async function m(a){try{return c.default.prepare("DELETE FROM students WHERE studentId = ?").run(a),(0,d.revalidatePath)("/students"),{success:!0,message:"Student deleted successfully"}}catch(a){return{success:!1,message:a.message}}}(0,a.i(66759).ensureServerEntryExports)([e,f,g,h,i,j,k,l,m]),(0,b.registerServerReference)(e,"00d9aceb431ba52b8dbfaaa55a20c815bf08a93a45",null),(0,b.registerServerReference)(f,"40edd7616a956db407e5876c1e4e2561d131617518",null),(0,b.registerServerReference)(g,"4038c1fcdff1fc82b5c9e9705f7933053c2019cc58",null),(0,b.registerServerReference)(h,"40624e09ca7caf0e861c0b570569dc47cbaa64a66e",null),(0,b.registerServerReference)(i,"0031492db042306ed80fdd8cc1ae52f1dd5ce12325",null),(0,b.registerServerReference)(j,"006d9c3697adedd4c6ad617895be501712b2a672c2",null),(0,b.registerServerReference)(k,"408d8a16dd65eab3a2c2cf1b16b17a43ecc72344cf",null),(0,b.registerServerReference)(l,"60e243126889f36f9a9b65c200d76716e49b00f85a",null),(0,b.registerServerReference)(m,"40d1c9713cde1b9aa52074219535e617ab69d29443",null),a.s(["createStudent",()=>k,"deleteStudent",()=>m,"getMajors",()=>j,"getStudentActivities",()=>h,"getStudentClubs",()=>g,"getStudentEvents",()=>f,"getStudents",()=>e,"getTotalActivitiesCount",()=>i,"updateStudent",()=>l])},45044,a=>{"use strict";var b=a.i(50479),c=a.i(96547),d=a.i(56790);async function e(a){let b=a.get("clubName"),e=a.get("category"),f=a.get("description"),g=a.get("createdAt");try{return c.default.prepare(`
      INSERT INTO clubs (clubName, category, description, createdAt)
      VALUES (@clubName, @category, @description, @createdAt)
    `).run({clubName:b,category:e,description:f,createdAt:g}),(0,d.revalidatePath)("/clubs"),{success:!0,message:"Club created successfully"}}catch(a){return{success:!1,message:a.message}}}async function f(){return c.default.prepare("SELECT * FROM clubs ORDER BY createdAt DESC").all()}async function g(a,b){let e=b.get("clubName"),f=b.get("category"),g=b.get("description"),h=b.get("createdAt");try{return c.default.prepare(`
      UPDATE clubs 
      SET clubName = @clubName, 
          category = @category, 
          description = @description, 
          createdAt = @createdAt
      WHERE clubId = @clubId
    `).run({clubName:e,category:f,description:g,createdAt:h,clubId:a}),(0,d.revalidatePath)("/clubs"),{success:!0,message:"Club updated successfully"}}catch(a){return{success:!1,message:a.message}}}async function h(a){try{return c.default.prepare("DELETE FROM clubs WHERE clubId = ?").run(a),(0,d.revalidatePath)("/clubs"),{success:!0,message:"Club deleted successfully"}}catch(a){return{success:!1,message:a.message}}}async function i(a){try{return c.default.prepare(`
      SELECT c.*
      FROM clubs c
      JOIN eventOrganizers eo ON c.clubId = eo.clubId
      WHERE eo.eventId = ?
    `).all(a)||[]}catch(a){return console.error("Failed to fetch clubs for event:",a),[]}}async function j(a){try{return c.default.prepare(`
      SELECT s.*, cm.joinedAt
      FROM students s
      JOIN clubMemberships cm ON s.studentId = cm.studentId
      WHERE cm.clubId = ?
      ORDER BY cm.joinedAt DESC
    `).all(a)}catch(a){return console.error("Failed to fetch club members:",a),[]}}async function k(a){try{return c.default.prepare(`
      SELECT e.*
      FROM events e
      JOIN eventOrganizers eo ON e.eventId = eo.eventId
      WHERE eo.clubId = ?
      ORDER BY e.startDate DESC
    `).all(a)}catch(a){return console.error("Failed to fetch club events:",a),[]}}async function l(a){try{return c.default.prepare(`
      SELECT * FROM activities WHERE clubId = ? ORDER BY startDate DESC
    `).all(a)}catch(a){return console.error("Failed to fetch club activities:",a),[]}}async function m(){try{return c.default.prepare(`
      SELECT cm.membershipId, cm.joinedAt,
             c.clubName as clubName, c.category as clubCategory,
             s.studentId, s.firstName || ' ' || s.lastName as studentName, s.cne as studentCne, s.email as studentEmail
      FROM clubMemberships cm
      JOIN clubs c ON cm.clubId = c.clubId
      JOIN students s ON cm.studentId = s.studentId
      ORDER BY cm.joinedAt DESC
    `).all()||[]}catch(a){return console.error("Failed to fetch club memberships",a),[]}}async function n(a){let b=parseInt(a.get("studentId")),e=parseInt(a.get("clubId")),f=a.get("joinedAt")||new Date().toISOString();try{return c.default.prepare(`
      INSERT INTO clubMemberships (joinedAt, clubId, studentId)
      VALUES (@joinedAt, @clubId, @studentId)
    `).run({joinedAt:f,clubId:e,studentId:b}),(0,d.revalidatePath)("/memberships"),{success:!0}}catch(a){return console.error("Failed to create club membership",a),{success:!1,message:a.message}}}async function o(a){try{return c.default.prepare("DELETE FROM clubMemberships WHERE membershipId = ?").run(a),(0,d.revalidatePath)("/memberships"),{success:!0}}catch(a){return console.error("Failed to delete club membership",a),{success:!1,message:a.message}}}(0,a.i(66759).ensureServerEntryExports)([e,f,g,h,i,j,k,l,m,n,o]),(0,b.registerServerReference)(e,"40cc7ee1355da82c16e371972e28f7e30849d71969",null),(0,b.registerServerReference)(f,"00e1ea61c1c9e73b2b6038b22b957d4558fcf03f9a",null),(0,b.registerServerReference)(g,"60cee25155eb268da38739ba2e407d54bb593b1df7",null),(0,b.registerServerReference)(h,"405b392b39a10b6121ccadaa05f71f247ebe3ed014",null),(0,b.registerServerReference)(i,"40d4a516cb6d9e3cd5c1afb94abab069aeefe610b8",null),(0,b.registerServerReference)(j,"4093cad3ee0ecc3b0fef2e61956b43f07c74a082a5",null),(0,b.registerServerReference)(k,"4067996a687fa4cdbc7335e58587de60a556e5ae59",null),(0,b.registerServerReference)(l,"40c8af38a81f3624f6b01079a706aa468b028c92a6",null),(0,b.registerServerReference)(m,"00e17c4962392047d0f48ab309a4a8703a32602fc6",null),(0,b.registerServerReference)(n,"4019ce0314a3ef0d9310b27138c4e9157ec3fde5aa",null),(0,b.registerServerReference)(o,"40aea864c595b60796632145a9e143e53296fa8e11",null),a.s(["createClub",()=>e,"createClubMembership",()=>n,"deleteClub",()=>h,"deleteClubMembership",()=>o,"getClubActivities",()=>l,"getClubEvents",()=>k,"getClubMembers",()=>j,"getClubMemberships",()=>m,"getClubs",()=>f,"getClubsByEvent",()=>i,"updateClub",()=>g])},60585,a=>{"use strict";var b=a.i(50479),c=a.i(96547),d=a.i(56790);async function e(a){let b=a.get("activityName"),e=a.get("description"),f=a.get("type"),g=a.get("maxCapacity")?Number(a.get("maxCapacity")):null,h=a.get("startDate"),i=a.get("endDate"),j=a.get("clubId")?Number(a.get("clubId")):null,k=a.get("eventId")?Number(a.get("eventId")):null;try{return c.default.prepare(`
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
    `).run({guestId:e,activityId:b,roleDescription:f,startDate:g,endDate:h}),(0,d.revalidatePath)("/activities"),{success:!0,message:"Guest added to activity successfully"}}catch(a){return{success:!1,message:a.message}}}async function r(a){if(!a)return{success:!1,message:"Invalid Guest Role ID"};try{return c.default.prepare("DELETE FROM guestRoles WHERE guestRoleId = ?").run(a),(0,d.revalidatePath)("/activities"),{success:!0,message:"Guest removed from activity"}}catch(a){return{success:!1,message:a.message}}}(0,a.i(66759).ensureServerEntryExports)([e,f,g,h,i,j,k,l,m,n,o,p,q,r]),(0,b.registerServerReference)(e,"4093677df15a691f79b9cb9ce3b204c7a80ac2e1f6",null),(0,b.registerServerReference)(f,"0029907054bb533d649e0cb8363cb92ada7167165e",null),(0,b.registerServerReference)(g,"40e025b20ccdc23e088c3bf2009f19c7eb055378d3",null),(0,b.registerServerReference)(h,"608b8ecf7bcf672259111e83ff9d1fdd254243c838",null),(0,b.registerServerReference)(i,"4059e57844d4ecdbe90674012c6944c857f0d2e812",null),(0,b.registerServerReference)(j,"406e02b10a7397e5dc5b47a78b613db42fbb599d85",null),(0,b.registerServerReference)(k,"406f178211d76a54e61fe86f5f14c9006f5beb072b",null),(0,b.registerServerReference)(l,"405ec7b88a7417ca9286d6d3f1eb7f5278f5dd0875",null),(0,b.registerServerReference)(m,"40ab32aabd37baaf13619ac786fe6ba3b765614849",null),(0,b.registerServerReference)(n,"408ce5a9f748b35313f03680b86ec2bb0a70ac3bf6",null),(0,b.registerServerReference)(o,"40dddd9cd1381153508219f86179015b0a89e2f7b6",null),(0,b.registerServerReference)(p,"40ccc803938615b356e948a03f53eba1c89b055021",null),(0,b.registerServerReference)(q,"40556636c39d7e57a9b537d18c9d96372cb097778a",null),(0,b.registerServerReference)(r,"4088ca76255c9d7d24cdbac7e2ada697db7876ce7b",null),a.s(["addGuestToActivity",()=>q,"addStudentToActivity",()=>k,"createActivity",()=>e,"deleteActivity",()=>i,"getActivities",()=>f,"getActivityById",()=>g,"getActivityClub",()=>o,"getActivityEvent",()=>n,"getActivityGuests",()=>p,"getActivityRegistrations",()=>j,"getActivityReservations",()=>m,"removeGuestFromActivity",()=>r,"removeStudentFromActivity",()=>l,"updateActivity",()=>h])},22878,a=>{"use strict";var b=a.i(50479),c=a.i(96547),d=a.i(56790);async function e(a){let b=a.get("eventName"),e=a.get("startDate"),f=a.get("endDate"),g=a.get("clubIds"),h=[];if(g)try{h=JSON.parse(g)}catch(a){console.error("Invalid clubIds JSON",a)}try{return c.default.transaction(()=>{let a=c.default.prepare(`
        INSERT INTO events (eventName, startDate, endDate)
        VALUES (@eventName, @startDate, @endDate)
        `).run({eventName:b,startDate:e,endDate:f}).lastInsertRowid;if(h.length>0){let b=c.default.prepare(`
                INSERT INTO eventOrganizers (eventId, clubId) VALUES (?, ?)
            `);for(let c of h)b.run(a,c)}return a})(),(0,d.revalidatePath)("/events"),{success:!0,message:"Event created successfully"}}catch(a){return{success:!1,message:a.message}}}async function f(){try{return c.default.prepare("SELECT * FROM events ORDER BY startDate DESC").all()}catch(a){return console.error("Failed to fetch events:",a),[]}}async function g(a,b){let e=b.get("eventName"),f=b.get("startDate"),g=b.get("endDate"),h=b.get("clubIds"),i=[];if(h)try{i=JSON.parse(h)}catch(a){console.error("Invalid clubIds JSON",a)}try{return c.default.transaction(()=>{if(c.default.prepare(`
        UPDATE events 
        SET eventName = @eventName, 
            startDate = @startDate, 
            endDate = @endDate
        WHERE eventId = @eventId
        `).run({eventName:e,startDate:f,endDate:g,eventId:a}),null!==h&&(c.default.prepare("DELETE FROM eventOrganizers WHERE eventId = ?").run(a),i.length>0)){let b=c.default.prepare("INSERT INTO eventOrganizers (eventId, clubId) VALUES (?, ?)");for(let c of i)b.run(a,c)}})(),(0,d.revalidatePath)("/events"),{success:!0,message:"Event updated successfully"}}catch(a){return{success:!1,message:a.message}}}async function h(a){try{return c.default.prepare("DELETE FROM events WHERE eventId = ?").run(a),(0,d.revalidatePath)("/events"),{success:!0,message:"Event deleted successfully"}}catch(a){return{success:!1,message:a.message}}}async function i(a){let b=Number(a.get("eventId")),e=Number(a.get("studentId"));if(!b||!e)return{success:!1,message:"Invalid Event or Student ID"};try{return c.default.prepare(`
      INSERT INTO eventParticipants (eventId, studentId)
      VALUES (@eventId, @studentId)
    `).run({eventId:b,studentId:e}),(0,d.revalidatePath)("/events"),{success:!0,message:"Student successfully registered for event"}}catch(a){if("SQLITE_CONSTRAINT_PRIMARYKEY"===a.code||"SQLITE_CONSTRAINT_UNIQUE"===a.code)return{success:!1,message:"Student is already registered for this event"};return{success:!1,message:a.message}}}async function j(a){let b=Number(a.get("eventId")),e=Number(a.get("studentId"));if(!b||!e)return{success:!1,message:"Invalid Event or Student ID"};try{return c.default.prepare("DELETE FROM eventParticipants WHERE eventId = ? AND studentId = ?").run(b,e),(0,d.revalidatePath)("/events"),{success:!0,message:"Student removed from event"}}catch(a){return{success:!1,message:a.message}}}async function k(a){try{return c.default.prepare(`
      SELECT s.*
      FROM eventParticipants ep
      JOIN students s ON ep.studentId = s.studentId
      WHERE ep.eventId = ?
      ORDER BY s.lastName ASC
    `).all(a)||[]}catch(a){return console.error("Failed to fetch event participants:",a),[]}}(0,a.i(66759).ensureServerEntryExports)([e,f,g,h,i,j,k]),(0,b.registerServerReference)(e,"409a62e4825b2a7cc16a8400b989c636c9d61a0221",null),(0,b.registerServerReference)(f,"00c9aac6b33d1d5b8b4a10e4a172d3a9f8ea8c3f92",null),(0,b.registerServerReference)(g,"60ec2722d7a705cb9400a975958d975a53e7fd74fb",null),(0,b.registerServerReference)(h,"4018a712f12a5cbec5f62bf866d82bfa0827e60e4e",null),(0,b.registerServerReference)(i,"40306314807f3bb6334ee871910aa7ed5b76fc8461",null),(0,b.registerServerReference)(j,"402c4ac4da7a996f4c2f1276d2b607f37aa2afc157",null),(0,b.registerServerReference)(k,"401cbc40149f4dc4929f8138f0d0071b57c8cad766",null),a.s(["addStudentToEvent",()=>i,"createEvent",()=>e,"deleteEvent",()=>h,"getEventParticipants",()=>k,"getEvents",()=>f,"removeStudentFromEvent",()=>j,"updateEvent",()=>g])}];

//# sourceMappingURL=CL0V_actions_6e6b63f5._.js.map