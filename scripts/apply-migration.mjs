import { readFileSync } from "node:fs";
import { Client } from "pg";

const url = process.env.POSTGRES_URL;
if (!url) {
  console.error("POSTGRES_URL env var is required");
  process.exit(1);
}

const migrationPath = process.argv[2];
if (!migrationPath) {
  console.error("Usage: node apply-migration.mjs <path-to-sql>");
  process.exit(1);
}

const sql = readFileSync(migrationPath, "utf8");
const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  console.log("connected");
  await client.query(sql);
  console.log("migration applied");
} catch (err) {
  console.error("FAILED:", err.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
