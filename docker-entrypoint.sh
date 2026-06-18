#!/bin/sh
set -e

echo "Waiting for the database to be ready..."

# Push the Prisma schema (creates tables) and seed initial content.
npx prisma db push --skip-generate
npx tsx prisma/seed.ts || echo "Seed step skipped or already applied."

echo "Starting VSL 360..."
exec "$@"
