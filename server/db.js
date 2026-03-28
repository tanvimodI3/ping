require("dotenv").config();
const dns = require("dns");
const net = require("net");
const { URL } = require("url");
const { Pool } = require("pg");

// Render dynos often cannot reach IPv6 (ENETUNREACH). Prefer an explicit IPv4 lookup
// and connect to that address; ssl.rejectUnauthorized:false keeps TLS working with IP hosts.
dns.setDefaultResultOrder("ipv4first");

function connectionStringPreferIpv4(raw) {
  if (!raw || typeof raw !== "string") return raw;
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    return raw;
  }
  const host = parsed.hostname;
  if (net.isIP(host) === 4) return raw;

  try {
    const address = dns.lookupSync(host, { family: 4 });
    parsed.hostname = address;
    return parsed.href;
  } catch (err) {
    console.warn(
      "DB host has no IPv4 address (or lookup failed). Render cannot use IPv6 to many providers — use a pooler URL or Render internal Postgres URL.",
      err.message
    );
    return raw;
  }
}

const connectionString = connectionStringPreferIpv4(
  process.env.DATABASE_URL || process.env.db_url
);
if (!connectionString) {
  console.error("Missing DATABASE_URL or db_url — Postgres will not connect.");
}

const pool = new Pool({
  connectionString,
  ssl: connectionString
    ? { rejectUnauthorized: false }
    : undefined,
});

module.exports = pool;
