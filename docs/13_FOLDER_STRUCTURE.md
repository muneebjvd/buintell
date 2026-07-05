# Buintell Engineering Handbook

## 13_FOLDER_STRUCTURE.md

**Version:** 1.0.0
**Status:** Locked for Version 1.0
**Owner:** Architecture Team

---

# 1. Purpose

This document defines the official folder and project structure for Buintell.

Every developer and AI coding assistant must follow this structure exactly.

Consistency is more important than personal preference.

No new top-level folders may be introduced without architectural approval.

---

# 2. Repository Structure

```text
buintell/
│
├── apps/
├── packages/
├── docs/
├── scripts/
├── docker/
├── .github/
├── .vscode/
├── public/
├── .env.example
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
├── README.md
└── LICENSE
```

---

# 3. Apps

Applications users directly interact with.

```text
apps/
│
├── web/
├── api/
├── desktop/      (Future)
├── mobile/       (Future)
└── docs/         (Future)
```

---

# 4. Packages

Reusable code shared across the platform.

```text
packages/
│
├── ui/
├── design-system/
├── auth/
├── permissions/
├── database/
├── ai/
├── workflows/
├── entities/
├── notifications/
├── reports/
├── search/
├── files/
├── audit/
├── plugins/
├── utils/
├── config/
├── types/
└── sdk/
```

Every package must be independent and reusable.

Packages must never directly depend on application code.

---

# 5. Documentation

```text
docs/
│
├── handbook/
├── architecture/
├── api/
├── decisions/
├── diagrams/
├── prompts/
└── assets/
```

The Engineering Handbook lives inside:

```text
docs/handbook/
```

---

# 6. Web Application Structure

```text
apps/web/
│
├── app/
├── components/
├── features/
├── hooks/
├── lib/
├── providers/
├── services/
├── stores/
├── styles/
├── types/
├── utils/
└── middleware.ts
```

---

# 7. Components

```text
components/
│
├── layout/
├── navigation/
├── forms/
├── tables/
├── dialogs/
├── dashboard/
├── ai/
├── charts/
├── feedback/
└── common/
```

Components must remain presentation-focused.

Business logic belongs elsewhere.

---

# 8. Features

Every business capability lives inside a feature.

Example:

```text
features/
│
├── authentication/
├── organizations/
├── users/
├── persons/
├── roles/
├── workflows/
├── tasks/
├── files/
├── reports/
├── dashboards/
├── ai/
└── settings/
```

Each feature owns:

* Components
* Hooks
* Services
* Validation
* Types
* Tests

---

# 9. Backend Structure

```text
apps/api/
│
├── src/
│   ├── modules/
│   ├── common/
│   ├── config/
│   ├── middleware/
│   ├── guards/
│   ├── interceptors/
│   ├── filters/
│   ├── database/
│   ├── ai/
│   └── main.ts
```

---

# 10. Module Structure

Every backend module follows the same layout.

Example:

```text
users/
│
├── controller.ts
├── service.ts
├── repository.ts
├── dto/
├── validators/
├── entities/
├── routes/
├── tests/
└── index.ts
```

No module should expose internal implementation details.

---

# 11. Database Package

```text
packages/database/
│
├── schema/
├── migrations/
├── seeds/
├── factories/
├── queries/
├── utils/
└── index.ts
```

The database package is the only place that defines schema and migrations.

---

# 12. AI Package

```text
packages/ai/
│
├── providers/
├── prompts/
├── intents/
├── parser/
├── router/
├── embeddings/
├── memory/
├── tools/
├── services/
├── tests/
└── index.ts
```

All AI functionality belongs here.

Applications must consume the AI package instead of implementing AI logic directly.

---

# 13. Shared Utilities

```text
packages/utils/
│
├── dates/
├── strings/
├── numbers/
├── validation/
├── formatting/
├── security/
└── index.ts
```

Duplicate utilities are prohibited.

---

# 14. Assets

```text
public/
│
├── logos/
├── icons/
├── illustrations/
├── fonts/
└── images/
```

Business assets should not be mixed with source code.

---

# 15. Environment Files

```text
.env.example
.env.local
.env.development
.env.production
```

Secrets must never be committed to version control.

Only `.env.example` belongs in the repository.

---

# 16. Naming Conventions

Folders:

* lowercase
* kebab-case

Files:

* kebab-case

React Components:

* PascalCase

Functions:

* camelCase

Constants:

* UPPER_SNAKE_CASE

Interfaces:

* PascalCase

Enums:

* PascalCase

---

# 17. Import Rules

Preferred import order:

1. External libraries
2. Internal packages
3. Feature modules
4. Shared utilities
5. Local files

Relative imports should be minimized.

Use path aliases where appropriate.

---

# 18. Testing Structure

Tests live beside the code they verify.

Example:

```text
service.ts
service.test.ts

component.tsx
component.test.tsx
```

End-to-End tests live in dedicated test directories.

---

# 19. Forbidden Practices

Do NOT create folders such as:

```text
new/

new2/

helpers/

helpers2/

misc/

old/

temp/

backup/

final/

test2/

copy/
```

Do NOT duplicate components.

Do NOT create multiple implementations of the same feature.

Do NOT mix business logic with presentation code.

---

# 20. Future Expansion

Future applications should fit naturally into the existing structure.

Examples:

```text
apps/mobile/

apps/desktop/

apps/admin/

packages/analytics/

packages/payments/

packages/calendar/
```

The folder hierarchy should evolve without requiring major restructuring.

---

# 21. Definition of Success

The folder structure succeeds when:

* Every contributor knows where new code belongs.
* Reusable code remains centralized.
* Features are easy to locate.
* Packages remain modular.
* The repository scales without becoming disorganized.
* AI coding assistants consistently generate code in the correct locations.

A predictable project structure is essential for long-term maintainability and team productivity.
