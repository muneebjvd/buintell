# Buintell Engineering Handbook

## 11_DATA_MODEL.md

**Version:** 1.0.0
**Status:** Active
**Owner:** Platform Architecture Team

---

# 1. Purpose

This document defines the canonical data model for the Buintell platform.

It establishes the core entities, relationships, ownership rules, and extensibility strategy that every Solution Package must follow.

The Core Platform is business-agnostic.

Solution Packages extend the platform through metadata and configuration rather than altering the core model whenever possible.

---

# 2. Core Philosophy

The platform understands generic business concepts.

It does **not** understand:

* Student
* Teacher
* Doctor
* Nurse
* Employee
* Patient

Instead, it understands:

* Organization
* Person
* Role
* Group
* Entity
* Workflow
* Task
* Document
* File
* Notification
* Audit Event

Business meaning is added through configuration.

---

# 3. Core Entity Relationship Diagram

```text
                           Organization
                                 │
     ┌───────────────────────────┼────────────────────────────┐
     │                           │                            │
     ▼                           ▼                            ▼
   Users                     Persons                      Settings
     │                           │
     ▼                           ▼
 Sessions                    Person Roles
                                 │
                                 ▼
                              Groups
                                 │
                                 ▼
                              Entities
                                 │
        ┌──────────────┬─────────┼───────────────┐
        ▼              ▼         ▼               ▼
     Tasks        Documents   Workflows       Files
        │              │         │               │
        └──────────────┼─────────┴───────────────┘
                       ▼
                  Audit Logs
```

Every Solution Package builds upon this model.

---

# 4. Organization

Represents a customer using Buintell.

Examples:

* School
* Hospital
* Company
* University
* NGO
* Government Department

Responsibilities:

* Owns all business data
* Owns users
* Owns permissions
* Owns settings
* Defines installed Solution Packages

Every record belongs to one organization unless explicitly global.

---

# 5. User

Represents an authenticated account.

A User logs into Buintell.

A User may be linked to one Person.

Responsibilities:

* Authentication
* Session management
* Security
* Preferences
* MFA (future)

---

# 6. Person

Represents a real human being.

Examples:

Ali Ahmad

Sara Khan

Muhammad Ali

A Person is not inherently a student, teacher, doctor, or employee.

Those are Roles.

Core Fields:

* Name
* Date of Birth
* Gender (configurable)
* Contact Information
* Address
* Metadata

---

# 7. Role

Defines what a Person does within an Organization.

Examples:

Student

Teacher

Doctor

Intern

Manager

Employee

Parent

Principal

Roles are configurable.

Organizations may create custom roles.

---

# 8. Group

Represents collections of People or Entities.

Examples:

Class

Department

Project Team

Ward

Branch

Committee

Batch

No new table is required for each concept.

Everything is a Group.

---

# 9. Entity

Represents configurable business objects.

Examples:

Vehicle

Course

Classroom

Inventory Item

Patient Record

Assignment

Invoice

Equipment

Fields are defined by metadata.

---

# 10. Workflow

Represents business processes.

Examples:

Admission

Hiring

Leave Request

Purchase Approval

Student Enrollment

Patient Discharge

A Workflow defines:

* States
* Transitions
* Rules
* Approvals
* Notifications

---

# 11. Task

Represents work assigned to users or groups.

Examples:

Complete Attendance

Approve Leave

Grade Assignment

Review Invoice

Tasks are generated manually or by workflows.

---

# 12. Document

Represents structured business documents.

Examples:

Certificate

Invoice

Medical Report

Assignment

Contract

Transcript

Documents may reference:

Persons

Groups

Entities

Tasks

Workflows

---

# 13. File

Represents uploaded binary assets.

Examples:

Images

PDFs

Videos

Certificates

Scanned Documents

Files belong to Documents or other entities.

The File Engine manages storage.

---

# 14. Notification

Represents platform communication.

Examples:

Reminder

Announcement

Approval Required

Assignment Due

Leave Approved

Notifications support multiple delivery channels.

---

# 15. Audit Log

Represents immutable history.

Every important platform action creates an audit record.

Examples:

Login

Create Entity

Delete File

Approve Workflow

Install Package

Audit Logs cannot be edited.

---

# 16. Metadata

Metadata extends the platform without changing the database schema.

Examples:

Student Roll Number

Employee Number

Blood Group

License Number

Guardian Name

Graduation Year

Organizations and Solution Packages define metadata.

---

# 17. Package Extension Model

Every Solution Package contributes:

* Entity definitions
* Metadata
* Workflows
* Roles
* Navigation
* Reports
* Permissions
* AI Vocabulary

Packages should not duplicate Core Platform entities.

---

# 18. Ownership Rules

Every business record includes:

* Organization ID
* Created By
* Created At
* Updated At
* Version (where applicable)

Ownership is explicit.

Hidden ownership is prohibited.

---

# 19. Data Lifecycle

Every record follows a predictable lifecycle:

Created

↓

Validated

↓

Active

↓

Archived

↓

Deleted (when necessary)

Historical records should remain recoverable according to organizational policies.

---

# 20. Extensibility Rules

Before introducing a new table, contributors must ask:

1. Can metadata solve this?
2. Can an existing entity represent it?
3. Can a new role solve it?
4. Can a workflow model it?
5. Can a package configure it?

Only if the answer is **No** should a new core table be introduced.

---

# 21. Future Evolution

The data model is designed to support:

* Marketplace packages
* AI memory
* Cross-package workflows
* Analytics
* Public APIs
* Mobile applications
* Desktop applications
* Enterprise deployments

Future growth should extend—not replace—the canonical model.

---

# 22. Definition of Success

The data model succeeds when:

* One platform supports many industries.
* Solution Packages reuse the same core entities.
* The database remains understandable as it grows.
* New industries require minimal schema changes.
* AI understands the data consistently.
* Organizations trust the integrity of their information.

The data model is the foundation of Buintell. Every future feature should strengthen this model rather than fragment it.
