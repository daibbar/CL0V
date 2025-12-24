import db from '../lib/db';
import fs from 'fs';
import path from 'path';

const schemaPath = path.join(process.cwd(), 'data', 'schema.sql');

try {
  console.log('📖 Reading schema...');
  const schema = fs.readFileSync(schemaPath, 'utf-8');

  console.log('⚙️ Applying schema to database...');
  db.exec(schema);

  console.log('✅ Database initialized successfully!');
}
catch (error) {
  console.error('❌ Failed to initialize database:', error);
}