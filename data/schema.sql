PRAGMA foreign_keys = ON;

-- 1. Admins (formerly 'responsable')
CREATE TABLE IF NOT EXISTS admins (
    adminId INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    status TEXT CHECK(status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending' NOT NULL
);

-- 2. Majors (formerly 'fillieres')
CREATE TABLE IF NOT EXISTS majors (
    majorId INTEGER PRIMARY KEY AUTOINCREMENT,
    majorName TEXT CHECK (majorName IN ('IID', 'GI', 'IRIC', 'GE', 'GPEE', 'MGSI')) NOT NULL
);

-- 3. Clubs
CREATE TABLE IF NOT EXISTS clubs (
    clubId INTEGER PRIMARY KEY AUTOINCREMENT,
    clubName TEXT NOT NULL UNIQUE,
    category TEXT CHECK(category IN ('art et culture', 'sport', 'technologie', 'entrepreneuriat social')) NOT NULL,
    description TEXT,
    createdAt DATETIME NOT NULL
);

-- 4. Events
CREATE TABLE IF NOT EXISTS events (
    eventId INTEGER PRIMARY KEY AUTOINCREMENT,
    eventName TEXT NOT NULL,
    startDate DATETIME NOT NULL,
    endDate DATETIME NOT NULL,
    CHECK (endDate >= startDate)
);

CREATE TABLE IF NOT EXISTS resources (
    resourceId INTEGER PRIMARY KEY AUTOINCREMENT,
    resourceName TEXT NOT NULL,
    type TEXT CHECK (type IN ('Salle', 'Amphitheatre', 'Buvette', 'Bibliotheque', 'Terrain', 'Labo')) NOT NULL
);

CREATE TABLE IF NOT EXISTS students (
    studentId INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    cne TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    majorId INTEGER,
    FOREIGN KEY (majorId) REFERENCES majors(majorId)
);

CREATE TABLE IF NOT EXISTS activities (
    activityId INTEGER PRIMARY KEY AUTOINCREMENT,
    activityName TEXT NOT NULL,
    description TEXT,
    type TEXT CHECK(type IN ('Voyage', 'Atelier', 'Conference', 'Competition') NOT NULL),
    maxCapacity INTEGER CHECK(maxCapacity > 0),
    startDate TIMESTAMP NOT NULL,
    endDate TIMESTAMP NOT NULL,
    clubId INTEGER,
    eventId INTEGER,

    FOREIGN KEY (clubId) REFERENCES clubs(clubId) ON DELETE CASCADE,
    FOREIGN KEY (eventId) REFERENCES events(eventId) ON DELETE CASCADE,
    
    -- Logic: It belongs to a Club OR an Event, never both
    CONSTRAINT checkOwner CHECK (
        (clubId IS NULL AND eventId IS NOT NULL) OR 
        (clubId IS NOT NULL AND eventId IS NULL)
    ),
    CHECK (endDate >= startDate)
);

CREATE TABLE IF NOT EXISTS clubMemberships (
    membershipId INTEGER PRIMARY KEY AUTOINCREMENT,
    joinedAt DATE DEFAULT CURRENT_DATE,
    clubId INTEGER NOT NULL,
    studentId INTEGER NOT NULL,
    status TEXT CHECK(status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending' NOT NULL,
    FOREIGN KEY (clubId) REFERENCES clubs(clubId) ON DELETE CASCADE,
    FOREIGN KEY (studentId) REFERENCES students(studentId) ON DELETE CASCADE,
    UNIQUE(clubId, studentId)    
);

CREATE TABLE IF NOT EXISTS reservations (
    reservationId INTEGER PRIMARY KEY AUTOINCREMENT,
    reservationName TEXT NOT NULL,
    startDate DATETIME NOT NULL,
    endDate DATETIME NOT NULL,
    resourceId INTEGER NOT NULL,
    activityId INTEGER NOT NULL,
    FOREIGN KEY (resourceId) REFERENCES resources(resourceId) ON DELETE CASCADE,
    FOREIGN KEY (activityId) REFERENCES activities(activityId) ON DELETE CASCADE,
    CHECK (endDate >= startDate),
    CHECK (startDate >= CURRENT_DATE)
);

CREATE TABLE IF NOT EXISTS eventOrganizers (
    eventId INTEGER NOT NULL,
    clubId INTEGER NOT NULL,
    FOREIGN KEY (eventId) REFERENCES events(eventId) ON DELETE CASCADE,
    FOREIGN KEY (clubId) REFERENCES clubs(clubId) ON DELETE CASCADE,
    UNIQUE(eventId, clubId)
);

CREATE TABLE IF NOT EXISTS eventParticipants (
    eventId INTEGER NOT NULL,
    studentId INTEGER NOT NULL, 
    FOREIGN KEY (studentId) REFERENCES students(studentId) ON DELETE CASCADE,
    FOREIGN KEY (eventId) REFERENCES events(eventId) ON DELETE CASCADE,
    UNIQUE(studentId, eventId)
);

CREATE TABLE IF NOT EXISTS registrations (
    registrationId INTEGER PRIMARY KEY AUTOINCREMENT,
    registeredAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    studentId INTEGER NOT NULL,
    activityId INTEGER NOT NULL,
    FOREIGN KEY (studentId) REFERENCES students(studentId) ON DELETE CASCADE,
    FOREIGN KEY (activityId) REFERENCES activities(activityId) ON DELETE CASCADE,
    UNIQUE(studentId, activityId)
);

CREATE TABLE IF NOT EXISTS guests (
    guestId INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS guestRoles (
    guestRoleId INTEGER PRIMARY KEY AUTOINCREMENT,
    guestId INTEGER NOT NULL,
    activityId INTEGER NOT NULL,
    roleDescription TEXT NOT NULL,
    startDate TIMESTAMP NOT NULL,
    endDate TIMESTAMP NOT NULL,
    FOREIGN KEY (guestId) REFERENCES guests(guestId) ON DELETE CASCADE,
    FOREIGN KEY (activityId) REFERENCES activities(activityId) ON DELETE CASCADE,
    CHECK (endDate >= startDate)
);

INSERT INTO majors (majorName) VALUES ('IID');
INSERT INTO majors (majorName) VALUES ('GI');
INSERT INTO majors (majorName) VALUES ('MGSI');
INSERT INTO majors (majorName) VALUES ('IRIC');
INSERT INTO majors (majorName) VALUES ('GE');
INSERT INTO majors (majorName) VALUES ('GPEE');