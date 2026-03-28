require("dotenv").config();
const dns = require("dns");
// Render and some DB hosts resolve to IPv6 first; the dyno often cannot reach IPv6 (ENETUNREACH on :5432).
dns.setDefaultResultOrder("ipv4first");

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || process.env.db_url;
if (!connectionString) {
  console.error("Missing DATABASE_URL or db_url — Postgres will not connect.");
}

const pool = new Pool({
  connectionString,
  ssl: connectionString
    ? { rejectUnauthorized: false }
    : undefined
  // user: process.env.user,     
  // host: process.env.host,
  // database: process.env.database,    
  // password: process.env.password,
  // port: 5432,
});

module.exports = pool;
