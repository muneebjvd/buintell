# Buintell Engineering Handbook

## 03_DESIGN_SYSTEM.md

**Version:** 1.0.0
**Status:** Active
**Owner:** Design & Frontend Team

---

# 1. Purpose

The Buintell Design System establishes a unified visual and interaction language for the platform.

Its purpose is to ensure that every screen, component, and workflow feels consistent, predictable, and professional regardless of which Solution Package is installed.

The Design System is not a collection of UI components.

It is the foundation of the user experience.

Every designer, developer, and AI coding assistant must follow this document when creating interfaces.

---

# 2. Design Philosophy

Buintell is enterprise software.

Enterprise users spend hours inside the application every day.

The interface should reduce mental effort rather than attract attention.

Users should notice their work—not the design.

Good design disappears.

Bad design demands attention.

---

## Our Design Principles

### Clarity

Users should immediately understand:

* Where they are.
* What they can do.
* What happens next.

---

### Consistency

Buttons behave the same everywhere.

Forms behave the same everywhere.

Tables behave the same everywhere.

Navigation behaves the same everywhere.

Users should never relearn the interface.

---

### Simplicity

Every screen should remove unnecessary elements.

Decorative elements should never compete with important information.

---

### Efficiency

Enterprise users perform repetitive tasks.

The interface should minimize:

* Mouse movement.
* Clicks.
* Page changes.
* Cognitive load.

---

### Accessibility

The platform should remain usable by everyone.

Accessibility is a design requirement, not an enhancement.

---

# 3. Design Personality

Buintell should communicate:

Professionalism.

Trust.

Reliability.

Calmness.

Precision.

Confidence.

The interface should never appear playful, experimental, or futuristic.

---

# 4. Visual Direction

Inspired by:

* Linear
* GitHub
* Notion
* Atlassian
* Stripe Dashboard
* Vercel Dashboard
* Microsoft 365 Admin Center

The interface should feel timeless rather than trendy.

---

# 5. What We Avoid

The following design patterns are prohibited unless a future design review explicitly approves them.

❌ Large gradients

❌ Neon colors

❌ Glassmorphism

❌ Cyberpunk aesthetics

❌ Animated backgrounds

❌ Oversized shadows

❌ Excessive border radius

❌ Decorative illustrations on business pages

❌ Flashy loading animations

❌ Inconsistent icon styles

❌ Multiple accent colors

❌ Card overload

❌ Floating UI elements without purpose

Enterprise software earns trust through clarity—not visual effects.

---

# 6. Color Philosophy

Color communicates meaning.

Color should never be used purely for decoration.

The interface should primarily rely on neutral tones.

Accent colors should highlight interaction and system status.

Examples:

Primary

Information

Success

Warning

Danger

Muted

Background

Border

Surface

Color tokens should be defined centrally.

Hardcoded color values are prohibited.

---

# 7. Typography

Typography should maximize readability.

Recommended font stack:

Primary:

Inter

Fallback:

System UI fonts

Typography hierarchy:

Display

Heading 1

Heading 2

Heading 3

Heading 4

Body

Small

Caption

Code

Every page should follow the same hierarchy.

---

# 8. Spacing System

Spacing should follow a consistent scale.

Recommended spacing units:

4

8

12

16

24

32

48

64

Developers should never invent arbitrary spacing values.

Spacing tokens should be reused throughout the application.

---

# 9. Layout Principles

Every page follows the same structure.

```text
┌───────────────────────────────┐
│ Header                        │
├───────────────────────────────┤
│ Toolbar                       │
├───────────────────────────────┤
│ Filters (optional)            │
├───────────────────────────────┤
│ Main Content                  │
├───────────────────────────────┤
│ Pagination / Footer           │
└───────────────────────────────┘
```

Users should immediately recognize page structure regardless of the installed Solution Package.

---

# 10. Responsive Design

The platform must support:

Desktop (Primary)

Laptop

Tablet

Mobile (Essential functions)

Administrative workflows are optimized for desktop.

Mobile focuses on essential daily operations.

No functionality should become inaccessible because of screen size.

---

# 11. Component Philosophy

Components should be:

Reusable.

Accessible.

Composable.

Documented.

Independent.

Every component should have one clear responsibility.

Examples:

Button

Input

Modal

Drawer

Card

Table

Badge

Avatar

Tabs

Breadcrumb

Toast

Tooltip

Dropdown

Calendar

File Upload

These components belong to the Core UI package and are reused everywhere.

---

# 12. Forms

Forms are the most frequently used part of the application.

Every form should provide:

Clear labels.

Helpful placeholders.

Validation messages.

Keyboard navigation.

Auto-focus where appropriate.

Logical grouping.

Progress indicators for long forms.

Autosave support where applicable.

Forms should prioritize data quality over speed.

---

# 13. Tables

Tables should support:

Sorting.

Filtering.

Searching.

Column visibility.

Sticky headers.

Pagination.

Bulk selection.

Export.

Responsive layouts.

Keyboard navigation.

Tables should remain readable even with thousands of records.

---

# 14. Empty States

Every empty state should answer:

Why is this empty?

What should I do next?

Provide:

Helpful message.

Primary action.

Optional documentation link.

Empty states should encourage action rather than confuse users.

---

# 15. Loading States

Every asynchronous action should provide feedback.

Use:

Skeletons.

Progress indicators.

Inline loading.

Optimistic updates where appropriate.

Never leave users wondering whether the application is working.

---

# 16. Error States

Errors should explain:

What happened.

Why it happened.

How to recover.

Avoid technical jargon whenever possible.

Never expose internal implementation details to end users.

---

# 17. Success Feedback

Successful actions should be acknowledged clearly but unobtrusively.

Examples:

Record created.

Changes saved.

Workflow completed.

Notification sent.

Confirmation should build user confidence without interrupting workflow.

---

# 18. Accessibility Standards

Every screen should support:

Keyboard navigation.

Screen readers.

High contrast.

Visible focus indicators.

Descriptive labels.

Semantic HTML.

Accessible color contrast.

Accessibility testing should be part of the development process.

---

# 19. Iconography

Use one consistent icon library throughout the platform.

Icons should clarify actions—not decorate the interface.

Every icon should have a clear meaning and remain visually consistent across Solution Packages.

---

# 20. Design Success Criteria

The Design System succeeds when:

* Every page feels like part of the same product.
* Users require minimal training.
* Interfaces remain consistent across industries.
* Components are reused instead of recreated.
* Accessibility is built into every interaction.
* Visual design supports productivity rather than distracting from it.

A user should be able to move from an Education Solution to a Healthcare Solution and immediately feel familiar with the interface because the design language remains consistent.
