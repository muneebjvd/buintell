# Buintell Engineering Handbook

## 12_TECH_STACK.md

**Version:** 1.0.0
**Status:** Locked for Version 1.0
**Owner:** Architecture Team

---

# 1. Purpose

This document defines the official technology stack for Buintell Version 1.0.

The purpose is to ensure every contributor, AI coding assistant, and developer uses the same technologies throughout the project.

Technology changes require architectural approval.

---

# 2. Engineering Principles

The stack must be:

* Free and Open Source
* Production Ready
* Well Documented
* Actively Maintained
* Large Community Support
* Enterprise Grade
* AI Friendly
* Long-Term Stable

Paid services must never be required to run Buintell.

Organizations may optionally deploy using paid infrastructure, but the software itself must remain fully functional using free technologies.

---

# 3. Architecture

Style:

Monorepo

Pattern:

Modular Monolith

Evolution Path:

Modular Monolith → Microservices (Future)

Communication:

REST API

Future:

GraphQL Gateway

---

# 4. Frontend

Framework

Next.js (App Router)

Language

TypeScript

UI Library

React

Styling

Tailwind CSS

Component Utilities

shadcn/ui

Icons

Lucide Icons

Fonts

Inter

State Management

Zustand

Server State

TanStack Query

Forms

React Hook Form

Validation

Zod

Tables

TanStack Table

Charts

Recharts

Notifications

Sonner

Command Palette

cmdk

---

# 5. Backend

Runtime

Node.js LTS

Framework

NestJS

Language

TypeScript

API

REST

Validation

Zod

Authentication

Better Auth

Authorization

Custom Permission Engine

File Upload

Multer

Documentation

OpenAPI / Swagger

Scheduling

node-cron

Background Jobs

BullMQ + Redis

---

# 6. Database

Primary Database

PostgreSQL

ORM

Drizzle ORM

Migrations

Drizzle Kit

Database Admin

pgAdmin

Search

PostgreSQL Full Text Search

Future

OpenSearch

---

# 7. AI Stack

Local AI

Ollama

Supported Models

Llama

Mistral

Qwen

Gemma

Cloud AI

OpenAI (Optional)

Google Gemini (Optional)

Anthropic Claude (Optional)

Embeddings

Nomic Embed

Sentence Transformers (Future)

Vector Database

PostgreSQL + pgvector

Prompt Templates

Markdown

AI Routing

Custom AI Router

---

# 8. Authentication

Better Auth

JWT

Refresh Tokens

Role Based Access

Permission Engine

Session Management

Future

MFA

OAuth

SSO

---

# 9. Storage

Development

Local Storage

Production

MinIO

Alternative

AWS S3 Compatible Storage

---

# 10. Caching

Redis

Used For

Sessions

Queues

Rate Limiting

Caching

Notifications

---

# 11. Testing

Unit

Vitest

Component

Testing Library

API

Supertest

End-to-End

Playwright

Linting

ESLint

Formatting

Prettier

Git Hooks

Husky

---

# 12. DevOps

Containerization

Docker

Container Orchestration

Docker Compose

Reverse Proxy

Nginx

CI/CD

GitHub Actions

Version Control

Git

Package Manager

pnpm

---

# 13. Documentation

Markdown

Mermaid Diagrams

Swagger

README Standards

Architecture Decision Records (Future)

---

# 14. Security

HTTPS

Helmet

CORS

Rate Limiting

Input Validation

Environment Variables

bcrypt/argon2 (according to Better Auth recommendations)

---

# 15. Logging

Pino

Request Logging

Audit Logs

Structured JSON Logs

---

# 16. Monitoring (Future)

Prometheus

Grafana

Health Checks

Error Tracking

OpenTelemetry

---

# 17. UI Standards

Professional Enterprise Interface

No:

* Neon Colors
* Heavy Gradients
* Glassmorphism
* Excessive Animations
* Gaming Style UI

Preferred

Simple

Clean

Fast

Business Focused

Accessible

Desktop First

---

# 18. Browser Support

Chrome

Edge

Firefox

Safari

Latest Stable Versions

---

# 19. Operating Systems

Development

Windows

Linux

macOS

Deployment

Linux

---

# 20. Future Technology Policy

Before introducing any new technology, contributors must answer:

* Does the current stack already solve this?
* Is it production-ready?
* Is it open source?
* Is it actively maintained?
* Does it reduce complexity?
* Does it align with Buintell architecture?

Technology should be added only when it provides clear long-term value.

---

# 21. Definition of Success

The technology stack succeeds when:

* Every component works together consistently.
* Organizations can self-host Buintell without mandatory licensing costs.
* Developers have a predictable development experience.
* The platform remains maintainable for many years.
* Future features can be added without replacing core technologies.

This document serves as the authoritative reference for all technology decisions in Buintell Version 1.0.
