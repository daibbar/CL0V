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
    `).run({firstName:e,lastName:f,cne:g,email:h,majorId:i,studentId:a}),(0,d.revalidatePath)("/students"),{success:!0,message:"Student updated successfully"}}catch(a){if("SQLITE_CONSTRAINT_UNIQUE"===a.code)return{success:!1,message:"Error: Student Code or Email is already taken."};return{success:!1,message:a.message}}}async function m(a){try{return c.default.prepare("DELETE FROM students WHERE studentId = ?").run(a),(0,d.revalidatePath)("/students"),{success:!0,message:"Student deleted successfully"}}catch(a){return{success:!1,message:a.message}}}(0,a.i(66759).ensureServerEntryExports)([e,f,g,h,i,j,k,l,m]),(0,b.registerServerReference)(e,"00d9aceb431ba52b8dbfaaa55a20c815bf08a93a45",null),(0,b.registerServerReference)(f,"40edd7616a956db407e5876c1e4e2561d131617518",null),(0,b.registerServerReference)(g,"4038c1fcdff1fc82b5c9e9705f7933053c2019cc58",null),(0,b.registerServerReference)(h,"40624e09ca7caf0e861c0b570569dc47cbaa64a66e",null),(0,b.registerServerReference)(i,"0031492db042306ed80fdd8cc1ae52f1dd5ce12325",null),(0,b.registerServerReference)(j,"006d9c3697adedd4c6ad617895be501712b2a672c2",null),(0,b.registerServerReference)(k,"408d8a16dd65eab3a2c2cf1b16b17a43ecc72344cf",null),(0,b.registerServerReference)(l,"60e243126889f36f9a9b65c200d76716e49b00f85a",null),(0,b.registerServerReference)(m,"40d1c9713cde1b9aa52074219535e617ab69d29443",null),a.s(["createStudent",()=>k,"deleteStudent",()=>m,"getMajors",()=>j,"getStudentActivities",()=>h,"getStudentClubs",()=>g,"getStudentEvents",()=>f,"getStudents",()=>e,"getTotalActivitiesCount",()=>i,"updateStudent",()=>l])},87978,a=>{"use strict";var b=a.i(67493),c=a.i(97735);a.s([],80769),a.i(80769),a.s(["0031492db042306ed80fdd8cc1ae52f1dd5ce12325",()=>c.getTotalActivitiesCount,"006d9c3697adedd4c6ad617895be501712b2a672c2",()=>c.getMajors,"00d9aceb431ba52b8dbfaaa55a20c815bf08a93a45",()=>c.getStudents,"00f497f1f80dfe93943451c06664f4127784cb3b2c",()=>b.logout,"4038c1fcdff1fc82b5c9e9705f7933053c2019cc58",()=>c.getStudentClubs,"40624e09ca7caf0e861c0b570569dc47cbaa64a66e",()=>c.getStudentActivities,"408d8a16dd65eab3a2c2cf1b16b17a43ecc72344cf",()=>c.createStudent,"40d1c9713cde1b9aa52074219535e617ab69d29443",()=>c.deleteStudent,"40edd7616a956db407e5876c1e4e2561d131617518",()=>c.getStudentEvents,"60e243126889f36f9a9b65c200d76716e49b00f85a",()=>c.updateStudent],87978)}];

//# sourceMappingURL=CL0V_297a208d._.js.map