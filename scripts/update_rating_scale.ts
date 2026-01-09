
import db from '../lib/db';

try {
  console.log('🔄 Migrating activities rating scale from 0-5 to 0-20...');

  // 1. Rename existing table
  db.prepare('ALTER TABLE activities RENAME TO activities_old').run();

  // 2. Create new table with updated schema (0-20 constraint)
  // Note: Copied from schema.sql but with the updated constraint
  db.prepare(`
    CREATE TABLE activities (
      activityId INTEGER PRIMARY KEY AUTOINCREMENT,
      activityName TEXT NOT NULL,
      description TEXT,
      type TEXT CHECK(type IN ('Voyage', 'Atelier', 'Conference', 'Competition') NOT NULL),
      maxCapacity INTEGER CHECK(maxCapacity > 0),
      startDate TIMESTAMP NOT NULL,
      endDate TIMESTAMP NOT NULL,
      budget REAL DEFAULT 0,
      rating REAL CHECK(rating >= 0 AND rating <= 20) DEFAULT 0,
      clubId INTEGER,
      eventId INTEGER,

      FOREIGN KEY (clubId) REFERENCES clubs(clubId) ON DELETE CASCADE,
      FOREIGN KEY (eventId) REFERENCES events(eventId) ON DELETE CASCADE,
      
      CONSTRAINT checkOwner CHECK (
          (clubId IS NULL AND eventId IS NOT NULL) OR 
          (clubId IS NOT NULL AND eventId IS NULL)
      ),
      CHECK (endDate >= startDate)
    )
  `).run();

  // 3. Copy data and scale ratings (multiply by 4)
  db.prepare(`
    INSERT INTO activities (
      activityId, activityName, description, type, maxCapacity, startDate, endDate, budget, rating, clubId, eventId
    )
    SELECT 
      activityId, activityName, description, type, maxCapacity, startDate, endDate, budget, 
      (rating * 4), -- Scale existing 0-5 ratings to 0-20
      clubId, eventId
    FROM activities_old
  `).run();

  // 4. Drop old table
  db.prepare('DROP TABLE activities_old').run();

  console.log('✅ Migration completed successfully!');
} catch (error) {
  console.error('❌ Migration failed:', error);
  // Attempt to rollback (restore old table if new one exists and old one exists)
  try {
     const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='activities_old'").get();
     if (tables) {
         db.prepare('DROP TABLE IF EXISTS activities').run();
         db.prepare('ALTER TABLE activities_old RENAME TO activities').run();
         console.log('↩️ Rolled back changes.');
     }
  } catch (rollbackError) {
      console.error('💀 Rollback failed:', rollbackError);
  }
}
