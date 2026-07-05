# Buintell Engineering Handbook

## 07_DATABASE_GUIDELINES.md

**Version:** 1.0.0
**Status:** Active
**Owner:** Backend & Infrastructure Team

---

# 1. Purpose

This document defines the database architecture, standards, naming conventions, relationships, migration strategy, and data governance for the Buintell platform.

The database is the single source of truth for every organization using Buintell.

All contributors must follow these guidelines to maintain consistency, scalability, and data integrity.

---

# 2. Database Philosophy

The database must be:

Reliable.

Consistent.

Normalized where appropriate.

Scalable.

Auditable.

Secure.

Business-agnostic.

The Core Platform stores generic concepts.

Industry-specific behavior belongs in Solution Packages and metadata—not in the core schema whenever possible.

---

# 3. Core Design Principles

The schema should favor:

* Reusable structures
* Strong relationships
* Minimal duplication
* Clear naming
* Predictable conventions
* Long-term maintainability

Every new table must have a clear purpose.

---

# 4. Multi-Organization Architecture

Buintell is a multi-organization platform.

Every business record belongs to exactly one organization unless explicitly defined as global.

Example:

```text id="c0nq4h"
Organization
      │
      ├── Users
      ├── Persons
      ├── Roles
      ├── Groups
      ├── Documents
      ├── Workflows
      ├── Reports
      └── Settings
```

Organization isolation is mandatory.

Cross-organization data access is prohibited.

---

# 5. Core Tables

The platform should maintain a stable set of core tables.

Examples:

```text id="0bb2zk"
organizations
users
persons
roles
permissions
groups
entity_types
entities
workflows
workflow_instances
tasks
documents
files
notifications
audit_logs
packages
settings
events
sessions
api_keys
```

Solution Packages may introduce additional tables only when metadata is insufficient.

---

# 6. Primary Keys

Every table should use a globally unique identifier.

Recommended format:

UUID v7 (preferred)

or

ULID

Avoid auto-increment IDs for externally exposed resources.

Public APIs should never depend on sequential identifiers.

---

# 7. Foreign Keys

Relationships must use explicit foreign keys.

Every relationship should enforce referential integrity.

Avoid orphaned records.

Cascade behavior must be intentional and documented.

---

# 8. Naming Conventions

Tables:

Plural.

Lowercase.

Snake_case.

Examples:

```text id="u9w8qx"
workflow_instances
audit_logs
notification_templates
```

Columns:

Lowercase.

Snake_case.

Boolean columns should begin with:

```text id="k7gtpi"
is_

has_

can_
```

Examples:

```text id="5xv4zq"
is_active
has_avatar
can_edit
```

---

# 9. Timestamps

Every business table should include:

```text id="gjmkrg"
created_at
updated_at
```

Soft-deletable tables should also include:

```text id="j4l2mq"
deleted_at
```

Never permanently delete business records unless required by policy or law.

---

# 10. Soft Deletes

Records should generally be archived rather than removed.

Benefits:

Auditability.

Recovery.

Historical reporting.

Safer operations.

Deletion should be an intentional administrative action.

---

# 11. Metadata Strategy

The platform should prefer extensibility through metadata.

Instead of adding dozens of nullable columns, store configurable attributes in metadata structures when appropriate.

Example:

```text id="gxrtdf"
Person

↓

Metadata

Blood Group

Graduation Year

License Number

Employee Code

Guardian Name
```

This allows different Solution Packages to extend entities without altering the core schema.

---

# 12. Relationships

Supported relationship types:

One-to-One

One-to-Many

Many-to-Many

Self-Referencing

Polymorphic (only when justified)

Relationships should be documented in the architecture.

---

# 13. Indexing

Indexes should be created for:

Primary keys.

Foreign keys.

Frequently searched fields.

Organization ID.

Workflow status.

Created date.

Search fields.

Avoid unnecessary indexes that slow writes.

Measure before adding.

---

# 14. Transactions

Operations affecting multiple records should use database transactions.

Examples:

Hiring an employee.

Admitting a patient.

Enrolling a student.

Installing a Solution Package.

Transactions ensure data consistency during failures.

---

# 15. Audit Logging

Every important mutation must be recorded.

Audit logs should include:

Timestamp.

User.

Organization.

Entity.

Previous value.

New value.

Action.

IP address (where available).

Audit logs are immutable.

---

# 16. File References

Files should never be stored directly in database rows.

The database stores:

File metadata.

Storage location.

Permissions.

Checksum.

Version.

The File Engine manages physical storage.

---

# 17. Search Strategy

Search indexes should remain separate from transactional data where appropriate.

Future search engines may include:

PostgreSQL Full-Text Search.

OpenSearch.

Elasticsearch.

The application should abstract the search provider.

---

# 18. Backup Strategy

Every deployment must support:

Automated backups.

Point-in-time recovery (where supported).

Backup verification.

Encrypted storage.

Recovery testing.

Backups are valuable only if restoration has been tested.

---

# 19. Migration Strategy

Every schema change must use version-controlled migrations.

Rules:

Never edit old migrations.

Create incremental migrations.

Review before deployment.

Test rollback procedures.

Document breaking changes.

---

# 20. Data Validation

Validation occurs at multiple layers:

Frontend.

API.

Business Logic.

Database Constraints.

Database constraints are the final safeguard and should never be relied upon as the first line of validation.

---

# 21. Performance Guidelines

Database queries should:

Select only required columns.

Avoid unnecessary joins.

Use indexes effectively.

Prevent N+1 query patterns.

Support pagination.

Cache expensive reads where appropriate.

Performance should be monitored continuously.

---

# 22. Security

Sensitive data should be encrypted where appropriate.

Passwords must never be stored in plain text.

Secrets must never be stored in business tables.

Access to database administration should follow the principle of least privilege.

---

# 23. Data Lifecycle

Every record progresses through a lifecycle:

Created.

Validated.

Updated.

Archived.

Deleted (when necessary).

Historical records should remain accessible according to organizational policy.

---

# 24. Future Database Evolution

The database should evolve without breaking existing organizations.

Future enhancements may include:

Read replicas.

Partitioning.

Sharding.

Data warehouse integration.

Analytics databases.

Time-series storage.

Event sourcing for selected workflows.

The architecture should allow these capabilities without redesigning the core schema.

---

# 25. Definition of Database Success

The database architecture succeeds when:

* Data remains consistent and trustworthy.
* Organizations are completely isolated.
* New Solution Packages require minimal schema changes.
* Queries remain performant as data grows.
* Auditing and recovery are reliable.
* Developers can understand and extend the schema confidently.

The database is a long-term asset. Every schema decision should prioritize stability, clarity, and future scalability over short-term convenience.
