#!/usr/bin/env bash
# Refuses `prisma db push --accept-data-loss` unless the environment clearly targets
# a disposable / CI database (avoids wiping production or shared Supabase by mistake).
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# Match Prisma: load `.env` so DATABASE_URL_TEST / DATABASE_URL are available unexported from file.
if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

push_db() {
  prisma db push --accept-data-loss
}

is_loopback_or_ci_pg_url() {
  [[ "${DATABASE_URL:-}" =~ @(localhost|127\.0\.0\.1|postgres): ]]
}

# GitHub Actions: workflow should set DATABASE_URL (e.g. Postgres service). Do not set GITHUB_ACTIONS locally.
if [[ "${GITHUB_ACTIONS:-}" == "true" ]]; then
  push_db
# Generic CI with a typical disposable Postgres URL
elif [[ "${CI:-}" == "true" ]] && is_loopback_or_ci_pg_url; then
  push_db
elif [[ -n "${DATABASE_URL_TEST:-}" ]]; then
  export DATABASE_URL="${DATABASE_URL_TEST}"
  export DIRECT_URL="${DIRECT_URL_TEST:-${DATABASE_URL_TEST}}"
  push_db
elif [[ "${NODE_ENV:-}" == "test" ]] && is_loopback_or_ci_pg_url; then
  push_db
elif is_loopback_or_ci_pg_url; then
  push_db
else
  echo "error: prisma db push --accept-data-loss refused (unsafe DATABASE_URL)." >&2
  echo "Use GitHub Actions, CI=true with a localhost/postgres DATABASE_URL, DATABASE_URL_TEST, or NODE_ENV=test with a localhost DATABASE_URL." >&2
  exit 1
fi
