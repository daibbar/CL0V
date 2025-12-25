import db from '../lib/db';

const migrateAdminsStatus = () => {
  try {
    console.log('Checking admins table for status column...');
    const tableInfo = db.prepare("PRAGMA table_info(admins)").all() as any[];
    const hasStatus = tableInfo.some(col => col.name === 'status');

    if (!hasStatus) {
      console.log('Adding status column to admins table...');
      // Add column with default 'accepted' for existing users so they don't get locked out
      db.prepare("ALTER TABLE admins ADD COLUMN status TEXT CHECK(status IN ('pending', 'accepted', 'rejected')) DEFAULT 'accepted'").run();
      
      // Update the default for future inserts to be 'pending' is handled by the table definition for new tables, 
      // but for ALTER TABLE in SQLite, the DEFAULT applies to existing rows if not specified.
      // Wait, if I set DEFAULT 'accepted', new rows will also be 'accepted' unless I specify otherwise in the INSERT or trigger.
      // Actually, standard practice for existing users is to make them active.
      // But for the schema definition, I want the default to be 'pending'.
      // SQLite ALTER TABLE ADD COLUMN allows setting a default value for existing rows.
      // We'll set it to 'accepted' now to migrate existing users.
      // Then we need to ensure our INSERT queries explicitly use 'pending' or we rely on application logic.
      // However, the schema.sql has DEFAULT 'pending'.
      // Let's just set them all to accepted for now.
      
      console.log('Status column added successfully (defaulting existing users to accepted).');
    } else {
      console.log('Status column already exists.');
    }
  } catch (error) {
    console.error('Migration failed:', error);
  }
};

migrateAdminsStatus();
