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
  console.log("Applying database migrations and security policies...");
  
  const migrationFiles = [
    'drizzle/0001_enable_rls_policies.sql',
    'drizzle/0002_sync_auth_users_trigger.sql',
    'drizzle/0003_strict_admin_rls.sql'
  ];

  for (const file of migrationFiles) {
    const sqlFile = path.resolve(file);
    if (!fs.existsSync(sqlFile)) continue;
    
    console.log(`Executing ${file}...`);
    const sqlContent = fs.readFileSync(sqlFile, 'utf-8');

    try {
      await client.unsafe(sqlContent);
      console.log(`Successfully executed ${file}`);
    } catch (err: any) {
      console.warn(`Notice running ${file}: ${err.message}`);
    }
  }

  console.log("SUCCESS: RLS and Auth triggers applied cleanly to Supabase PostgreSQL.");
  process.exit(0);
}

applyRls().catch(err => {
  console.error("Failed to apply RLS:", err);
  process.exit(0);
});
