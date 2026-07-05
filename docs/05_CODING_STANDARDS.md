# Buintell Engineering Handbook

## 05_CODING_STANDARDS.md

**Version:** 1.0.0
**Status:** Active
**Owner:** Engineering Team

---

# 1. Purpose

This document defines the coding standards for the Buintell platform.

The purpose is to ensure that every line of code is readable, maintainable, testable, reusable, and consistent.

These standards apply equally to:

* Human developers
* AI coding assistants
* External contributors

Consistency is more valuable than personal preference.

---

# 2. Engineering Philosophy

Code is written once but read thousands of times.

Always optimize for readability.

The next developer should understand the code without asking the original author.

Good code explains itself.

Great code also explains *why* it exists.

---

# 3. General Principles

Every implementation should be:

Simple.

Predictable.

Modular.

Reusable.

Documented.

Testable.

Secure.

Maintainable.

Avoid clever solutions.

Prefer boring, proven engineering.

---

# 4. Naming Conventions

Names should describe intent.

Avoid abbreviations unless universally understood.

Good Examples:

```text
createPerson()
calculateAverageScore()
WorkflowEngine
PermissionService
ReportGenerator
```

Bad Examples:

```text
doStuff()
temp()
abc()
data2()
myFunction()
```

Variables, functions, classes, files, and folders should all follow a consistent naming convention.

---

# 5. File Size

Large files become difficult to maintain.

Recommended limits:

Component: ≤ 300 lines

Service: ≤ 400 lines

Utility: ≤ 200 lines

Configuration: No strict limit

If a file grows significantly beyond these limits, consider splitting responsibilities.

---

# 6. Function Design

Functions should perform one responsibility.

Prefer small functions with descriptive names.

Avoid functions that perform unrelated tasks.

Bad:

Validate → Save → Notify → Generate Report → Send Email

Good:

validate()

save()

notify()

generateReport()

Each function should be independently testable.

---

# 7. Class Design

Classes should follow the Single Responsibility Principle.

One class.

One responsibility.

Avoid "God Classes" that manage unrelated concerns.

---

# 8. Reusability

Before writing new code, ask:

Does this already exist?

Can an existing engine solve this?

Can this become configuration?

Can another Solution Package reuse it?

Duplicate implementations are prohibited unless explicitly justified.

---

# 9. Comments

Comments should explain **why**, not **what**.

Bad:

```text
// Increment i
i++;
```

Good:

```text
// Skip archived records to avoid duplicate processing
```

If code requires excessive comments to explain its behavior, consider simplifying the implementation.

---

# 10. Error Handling

Errors should be expected—not ignored.

Every error should:

Be logged.

Be understandable.

Be recoverable where possible.

Avoid generic messages such as:

"Something went wrong."

Prefer messages that guide the user or developer toward resolution.

---

# 11. Logging

Logs exist for diagnosis, not decoration.

Every log should answer:

Who?

What?

When?

Where?

Why?

Sensitive information must never be written to logs.

---

# 12. Configuration

Magic numbers and hardcoded values are prohibited.

Configuration belongs in:

Environment variables.

Configuration files.

Metadata.

Database settings.

The codebase should remain environment-independent.

---

# 13. Dependencies

Every dependency introduces long-term maintenance.

Before adding a library, evaluate:

* Is it actively maintained?
* Does it solve a real problem?
* Can we implement this ourselves reasonably?
* Will multiple modules benefit?
* Does it increase bundle size unnecessarily?

Prefer fewer, high-quality dependencies.

---

# 14. Performance

Write efficient code by default.

Avoid premature optimization.

Measure before optimizing.

Optimize the bottleneck—not the entire application.

---

# 15. Security

Security requirements apply to every implementation.

Always:

Validate input.

Escape output where necessary.

Check permissions.

Protect sensitive information.

Sanitize uploaded files.

Never trust client input.

---

# 16. Documentation

Every major module should include:

Purpose.

Responsibilities.

Dependencies.

Usage.

Examples.

Limitations.

Future considerations.

Documentation should evolve with the code.

---

# 17. Git Standards

Commits should be:

Small.

Focused.

Descriptive.

Good examples:

```
feat(auth): add multi-factor authentication support

fix(workflow): resolve approval state transition bug

refactor(entity): simplify metadata parser
```

Avoid vague commit messages such as:

```
update

changes

fixed stuff
```

---

# 18. Pull Request Checklist

Before merging:

* Code builds successfully.
* Tests pass.
* Documentation updated.
* No duplicated logic.
* Naming reviewed.
* Permissions verified.
* Accessibility considered.
* Performance reviewed.
* Security reviewed.
* Code reviewed by another contributor or AI checklist.

---

# 19. AI Coding Standards

AI-generated code is treated exactly like human-written code.

Every AI contribution must be:

Reviewed.

Tested.

Refactored if necessary.

Documented.

AI should never introduce architecture that conflicts with the Engineering Handbook.

Convenience must never override engineering quality.

---

# 20. Refactoring

Refactoring is encouraged.

However:

Behavior must remain unchanged.

Tests must continue passing.

Documentation must remain accurate.

Large refactors should be incremental.

---

# 21. Code Review Principles

Review the code—not the developer.

Focus on:

Correctness.

Readability.

Maintainability.

Security.

Performance.

Architecture.

Every review should improve the platform.

---

# 22. Definition of Good Code

Good code is:

Easy to read.

Easy to modify.

Easy to test.

Easy to debug.

Easy to reuse.

Easy to document.

If code becomes difficult to explain, it should probably be redesigned.

---

# 23. Engineering Motto

Every contributor should leave the codebase in a better state than they found it.

Small improvements made consistently create exceptional software over time.

This principle applies to every commit, every review, and every release.

---

# 24. Final Standard

The goal of Buintell is not simply to produce working software.

The goal is to produce software that organizations can trust for years.

Engineering quality is a product feature.

Every line of code contributes to that trust.
