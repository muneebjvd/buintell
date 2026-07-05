# Buintell

Buintell is an Offline-First Enterprise Business Intelligence & Operations Platform.

## Architecture

This project is structured as a pnpm workspace monorepo.

### Folders

- `apps/` - Contains user-facing applications (Next.js web app, NestJS API).
- `packages/` - Contains reusable engines, tools, and shared configurations.
- `docs/` - Contains the Engineering Handbook and system documentation.
- `docker/` - Contains Docker configurations.
- `scripts/` - Contains workspace utility scripts.

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Setup environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Start services (Database, Redis, MinIO, Ollama):
   ```bash
   docker-compose up -d
   ```

4. Run the development server:
   ```bash
   pnpm run dev
   ```

## License

This project is private and proprietary.
