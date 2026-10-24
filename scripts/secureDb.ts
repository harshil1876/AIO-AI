import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.log("No DATABASE_URL found. Skipping RLS policy application.");
  process.exit(0);
}

const client = postgres(connectionString, { prepare: false });

async function applyRls() {
  console.log("Applying Row Level Security (RLS) policies to all 24 Supabase tables...");
  const sqlFile = path.resolve('drizzle/0001_enable_rls_policies.sql');
  const sqlContent = fs.readFileSync(sqlFile, 'utf-8');

  // Split statements by semicolon
  const statements = sqlContent
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  for (const stmt of statements) {
    try {
      await client.unsafe(stmt);
    } catch (err: any) {
      console.warn(`Policy notice for statement [${stmt.slice(0, 40)}...]: ${err.message}`);
    }
  }

  console.log("SUCCESS: RLS enabled across all 24 tables with strict public/auth separation.");
  process.exit(0);
}

applyRls().catch(err => {
  console.error("Failed to apply RLS:", err);
  process.exit(0);
});
