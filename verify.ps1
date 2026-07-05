$ErrorActionPreference = "Stop"

Write-Host "Running pnpm install..."
pnpm install

Write-Host "Running typecheck..."
pnpm typecheck

Write-Host "Running lint..."
pnpm lint

Write-Host "Running build..."
pnpm build

Write-Host "Running test..."
pnpm test

Write-Host "Running migrations..."
cd packages/database
npx drizzle-kit push

Write-Host "Running seeds..."
npx tsx src/seeds/run-seeds.ts

Write-Host "Verification complete."
