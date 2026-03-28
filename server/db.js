require("dotenv").config();
// `node:` prefix avoids ever resolving a user package named "dns"; `lookupSync` can be missing on odd runtimes.
const dns = require("node:dns");
const net = require("node:net");
const { URL } = require("node:url");
const { Pool } = require("pg");

// Render dynos often cannot reach IPv6 (ENETUNREACH). Use A-record lookup (IPv4 only), not getaddrinfo order.
if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

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
    const v4 = dns.resolve4Sync(host);
    if (!v4 || !v4.length) throw new Error("no A records for host");
    parsed.hostname = v4[0];
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
