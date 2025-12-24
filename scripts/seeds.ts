import db from '../lib/db';

const seed = () => {
  try {
    console.log('🧹 Cleaning old data...');
    // Delete in order to respect Foreign Keys
    db.exec(`
      DELETE FROM guestRoles;
      DELETE FROM guests;
      DELETE FROM registrations;
      DELETE FROM eventParticipants;
      DELETE FROM eventOrganizers;
      DELETE FROM reservations;
      DELETE FROM clubMemberships;
      DELETE FROM activities;
      DELETE FROM students;
      DELETE FROM resources;
      DELETE FROM events;
      DELETE FROM clubs;
      DELETE FROM majors;
      DELETE FROM admins;
      DELETE FROM sqlite_sequence; -- Resets Auto-Increment IDs
    `);

    // 1. Majors
    console.log('🌱 Seeding Majors...');
    const insertMajor = db.prepare('INSERT INTO majors (majorName) VALUES (?)');
    const majors = ['IID', 'GI', 'IRIC', 'GE', 'GPEE', 'MGSI'];
    majors.forEach((m) => insertMajor.run(m));

    // 2. Clubs
    console.log('🌱 Seeding Clubs...');
    const insertClub = db.prepare(`
      INSERT INTO clubs (clubName, category, description, createdAt) 
      VALUES (@clubName, @category, @description, @createdAt)
    `);

    const club1 = insertClub.run({
      clubName: 'AI Club',
      category: 'technologie',
      description: 'Artificial Intelligence and Data Science enthusiasts.',
      createdAt: '2023-09-01'
    });
    const clubId = club1.lastInsertRowid;

    insertClub.run({
      clubName: 'Enactus',
      category: 'entrepreneuriat social',
      description: 'Social entrepreneurship for a better world.',
      createdAt: '2022-10-15'
    });

    // 3. Events
    console.log('🌱 Seeding Events...');
    const insertEvent = db.prepare(`
      INSERT INTO events (eventName, startDate, endDate) 
      VALUES (@eventName, @startDate, @endDate)
    `);

    const event1 = insertEvent.run({
      eventName: 'Hackathon 2024',
      startDate: '2024-12-01 09:00',
      endDate: '2024-12-03 18:00'
    });
    const eventId = event1.lastInsertRowid;

    // 4. Students
    console.log('🌱 Seeding Students...');
    const insertStudent = db.prepare(`
      INSERT INTO students (firstName, lastName, cne, email, majorId) 
      VALUES (@firstName, @lastName, @cne, @email, @majorId)
    `);
    
    // Get major ID for 'IID' (Assuming it's ID 1 because we inserted it first)
    insertStudent.run({
      firstName: 'Ahmed',
      lastName: 'Benali',
      cne: 'D1300001',
      email: 'ahmed.benali@student.ma',
      majorId: 1
    });

    // 5. Activities (Testing the "Club OR Event" Logic)
    console.log('🌱 Seeding Activities...');
    const insertActivity = db.prepare(`
      INSERT INTO activities (
        activityName, description, type, maxCapacity, startDate, endDate, clubId, eventId
      ) VALUES (
        @activityName, @description, @type, @maxCapacity, @startDate, @endDate, @clubId, @eventId
      )
    `);

    // Activity A: Run by the CLUB (clubId set, eventId null)
    insertActivity.run({
      activityName: 'Intro to Python',
      description: 'Beginner workshop for AI members.',
      type: 'Atelier',
      maxCapacity: 30,
      startDate: '2024-01-10 10:00',
      endDate: '2024-01-10 12:00',
      clubId: clubId, 
      eventId: null
    });

    // Activity B: Part of an EVENT (eventId set, clubId null)
    insertActivity.run({
      activityName: 'Hackathon Keynote',
      description: 'Opening ceremony.',
      type: 'Conference',
      maxCapacity: 200,
      startDate: '2024-12-01 09:00',
      endDate: '2024-12-01 10:30',
      clubId: null,
      eventId: eventId
    });

    // 6. Resources
    console.log('🌱 Seeding Resources...');
    const insertResource = db.prepare('INSERT INTO resources (resourceName, type) VALUES (?, ?)');
    insertResource.run('Amphi A', 'Amphitheatre');
    insertResource.run('Salle 12', 'Salle');

    console.log('✅ Database seeded successfully!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
};

seed();