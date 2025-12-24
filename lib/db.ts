import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cl0v.db');

const db = new Database(dbPath, { verbose: console.log});

db.pragma('foreign_keys = ON');

export default db;