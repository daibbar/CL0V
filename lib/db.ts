import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cl0v.db');

// Prevent multiple instances of better-sqlite3 in development
const globalForDb = global as unknown as { db: Database.Database };

const db = globalForDb.db || new Database(dbPath, { verbose: console.log });

if (process.env.NODE_ENV !== 'production') globalForDb.db = db;

db.pragma('foreign_keys = ON');

export default db;