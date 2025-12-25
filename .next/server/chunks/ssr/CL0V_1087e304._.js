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
    `).run({joinedAt:f,clubId:e,studentId:b}),(0,d.revalidatePath)("/memberships"),{success:!0}}catch(a){return console.error("Failed to create club membership",a),{success:!1,message:a.message}}}async function o(a){try{return c.default.prepare("DELETE FROM clubMemberships WHERE membershipId = ?").run(a),(0,d.revalidatePath)("/memberships"),{success:!0}}catch(a){return console.error("Failed to delete club membership",a),{success:!1,message:a.message}}}(0,a.i(66759).ensureServerEntryExports)([e,f,g,h,i,j,k,l,m,n,o]),(0,b.registerServerReference)(e,"40cc7ee1355da82c16e371972e28f7e30849d71969",null),(0,b.registerServerReference)(f,"00e1ea61c1c9e73b2b6038b22b957d4558fcf03f9a",null),(0,b.registerServerReference)(g,"60cee25155eb268da38739ba2e407d54bb593b1df7",null),(0,b.registerServerReference)(h,"405b392b39a10b6121ccadaa05f71f247ebe3ed014",null),(0,b.registerServerReference)(i,"40d4a516cb6d9e3cd5c1afb94abab069aeefe610b8",null),(0,b.registerServerReference)(j,"4093cad3ee0ecc3b0fef2e61956b43f07c74a082a5",null),(0,b.registerServerReference)(k,"4067996a687fa4cdbc7335e58587de60a556e5ae59",null),(0,b.registerServerReference)(l,"40c8af38a81f3624f6b01079a706aa468b028c92a6",null),(0,b.registerServerReference)(m,"00e17c4962392047d0f48ab309a4a8703a32602fc6",null),(0,b.registerServerReference)(n,"4019ce0314a3ef0d9310b27138c4e9157ec3fde5aa",null),(0,b.registerServerReference)(o,"40aea864c595b60796632145a9e143e53296fa8e11",null),a.s(["createClub",()=>e,"createClubMembership",()=>n,"deleteClub",()=>h,"deleteClubMembership",()=>o,"getClubActivities",()=>l,"getClubEvents",()=>k,"getClubMembers",()=>j,"getClubMemberships",()=>m,"getClubs",()=>f,"getClubsByEvent",()=>i,"updateClub",()=>g])},45042,a=>{"use strict";var b=a.i(67493),c=a.i(97735),d=a.i(45044);a.s([],1020),a.i(1020),a.s(["00d9aceb431ba52b8dbfaaa55a20c815bf08a93a45",()=>c.getStudents,"00e17c4962392047d0f48ab309a4a8703a32602fc6",()=>d.getClubMemberships,"00e1ea61c1c9e73b2b6038b22b957d4558fcf03f9a",()=>d.getClubs,"00f497f1f80dfe93943451c06664f4127784cb3b2c",()=>b.logout,"4019ce0314a3ef0d9310b27138c4e9157ec3fde5aa",()=>d.createClubMembership,"40aea864c595b60796632145a9e143e53296fa8e11",()=>d.deleteClubMembership],45042)}];

//# sourceMappingURL=CL0V_1087e304._.js.map