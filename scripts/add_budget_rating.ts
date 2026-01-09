
import db from '../lib/db';

try {
  console.log('🔄 Adding budget and rating columns to activities table...');

  // Check if columns exist (simple way: try to select them, or just try to add and catch error if duplicate)
  // But SQLite doesn't support IF NOT EXISTS for ADD COLUMN directly in standard SQL universally, but standard approach is just run it.
  // If it fails because column exists, we catch it.

  try {
    db.prepare('ALTER TABLE activities ADD COLUMN budget REAL DEFAULT 0').run();
    console.log('✅ Added budget column.');
  } catch (err: any) {
    if (err.message.includes('duplicate column name')) {
      console.log('ℹ️ budget column already exists.');
    } else {
      throw err;
    }
  }

  try {
    db.prepare('ALTER TABLE activities ADD COLUMN rating REAL CHECK(rating >= 0 AND rating <= 5) DEFAULT 0').run();
    console.log('✅ Added rating column.');
  } catch (err: any) {
    if (err.message.includes('duplicate column name')) {
      console.log('ℹ️ rating column already exists.');
    } else {
      throw err;
    }
  }

  console.log('✅ Migration completed successfully!');
} catch (error) {
  console.error('❌ Migration failed:', error);
}
