import db from '../lib/db';

const migrateAdmins = () => {
  try {
    console.log('Checking admins table for password column...');
    const tableInfo = db.prepare("PRAGMA table_info(admins)").all() as any[];
    const hasPassword = tableInfo.some(col => col.name === 'password');

    if (!hasPassword) {
      console.log('Adding password column to admins table...');
      // Default password to empty string or a temporary placeholder if there are existing rows
      // ideally we shouldn't have existing admins without passwords, but for migration safety:
      db.prepare("ALTER TABLE admins ADD COLUMN password TEXT DEFAULT ''").run();
      console.log('Password column added successfully.');
    } else {
      console.log('Password column already exists.');
    }
  } catch (error) {
    console.error('Migration failed:', error);
  }
};

migrateAdmins();
