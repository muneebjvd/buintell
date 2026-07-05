# Buintell Engineering Handbook

## 15_IMPLEMENTATION_PLAYBOOK.md

**Version:** 1.0.0
**Status:** Mandatory
**Owner:** Engineering Team

---

# 1. Purpose

This document defines the mandatory implementation workflow for every feature developed in Buintell.

It applies equally to:

* Human developers
* AI coding assistants
* External contributors

Every implementation must follow this playbook.

Skipping steps is not permitted.

---

# 2. Core Principle

Think.

Design.

Build.

Test.

Review.

Improve.

Never jump directly into coding.

---

# 3. Before Writing Code

Every implementation begins by understanding the task.

The developer or AI must:

* Read the task carefully.
* Read all relevant handbook documents.
* Understand the business objective.
* Identify affected engines.
* Identify affected packages.
* Identify affected APIs.
* Identify affected database tables.
* Identify affected UI components.

No code should be written until the implementation plan is complete.

---

# 4. Reuse Before Create

Before creating anything new, always check:

* Existing Components
* Existing Packages
* Existing Services
* Existing Hooks
* Existing Utilities
* Existing Engines
* Existing Database Models

Never duplicate functionality.

If something reusable exists, extend it instead.

---

# 5. Planning Phase

Before implementation, produce a brief plan including:

* Objective
* Files to create
* Files to modify
* Database impact
* API impact
* UI impact
* Security impact
* Testing strategy
* Risks

Implementation starts only after the plan is complete.

---

# 6. Implementation Rules

Code must:

* Follow the Coding Standards.
* Follow the Design System.
* Follow the Folder Structure.
* Respect the Data Model.
* Respect the API Guidelines.
* Respect the Security Guidelines.

Architecture takes priority over convenience.

---

# 7. UI Rules

Every screen must:

* Use existing components.
* Be fully responsive.
* Follow spacing rules.
* Use consistent typography.
* Support keyboard navigation.
* Support accessibility.
* Avoid unnecessary animations.
* Maintain a professional enterprise appearance.

No experimental UI styles.

---

# 8. Backend Rules

Business logic belongs in services.

Controllers should remain thin.

Database access should be encapsulated.

Validation occurs before business logic.

Permissions are checked before execution.

Every mutation generates an audit event.

---

# 9. AI Rules

The AI must never:

* Access the database directly.
* Ignore permissions.
* Skip workflows.
* Modify business rules.
* Create hidden functionality.

The AI interacts only through approved platform engines.

---

# 10. Testing Requirements

Every feature requires:

* Unit Tests
* Integration Tests (where applicable)
* End-to-End Tests (for user workflows)
* Manual verification of critical paths

No feature is complete without testing.

---

# 11. Self-Review Checklist

Before considering a task complete, verify:

* Coding Standards followed.
* No duplicated logic.
* No unused code.
* No console logs.
* No TODO comments.
* Proper error handling.
* Proper validation.
* Security reviewed.
* Accessibility reviewed.
* Performance acceptable.
* Documentation updated.

---

# 12. Refactoring

After implementation:

Review the code.

Simplify where possible.

Remove duplication.

Improve naming.

Reduce complexity.

Refactoring is expected, not optional.

---

# 13. Documentation

Every completed feature must update documentation when necessary.

Possible updates include:

* API documentation
* Architecture diagrams
* Database documentation
* Component documentation
* Handbook references

Documentation and implementation should remain synchronized.

---

# 14. Git Workflow

Every task should follow:

1. Create branch
2. Implement feature
3. Run tests
4. Self-review
5. Update documentation
6. Commit with descriptive message
7. Open Pull Request
8. Address review feedback
9. Merge

Commits should remain small and focused.

---

# 15. Definition of Done

A task is complete only when:

* Requirements implemented.
* Code reviewed.
* Tests passing.
* Documentation updated.
* No critical bugs.
* Security verified.
* Accessibility verified.
* CI pipeline passing.

Anything less is considered work in progress.

---

# 16. AI Development Workflow

When an AI coding assistant is assigned a task, it must execute the following sequence:

1. Read all relevant handbook documents.
2. Explain the implementation plan.
3. Identify reusable components and engines.
4. Implement incrementally.
5. Run automated tests.
6. Perform a self-review.
7. Refactor if necessary.
8. Verify compliance with the handbook.
9. Repeat until all acceptance criteria are satisfied.

The AI must not declare completion while known issues remain.

---

# 17. Error Recovery

If implementation fails:

* Diagnose the root cause.
* Explain the failure.
* Propose solutions.
* Apply the safest solution.
* Re-test.
* Continue until stable.

Repeated trial-and-error without analysis is prohibited.

---

# 18. Performance Expectations

Every implementation should consider:

* Rendering performance
* Database efficiency
* API response time
* Bundle size
* Memory usage
* Scalability

Optimize only after measuring.

---

# 19. Engineering Principles

Every contribution should leave the project in a better state.

When touching existing code:

* Improve naming where appropriate.
* Remove dead code.
* Increase clarity.
* Preserve architecture.
* Avoid introducing technical debt.

---

# 20. Final Rule

Quality is more important than speed.

The objective of Buintell is not to generate large amounts of code.

The objective is to build a platform that organizations can confidently rely on for years.

Every implementation should reflect that standard.
