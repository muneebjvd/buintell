# Buintell Engineering Handbook

## 18_AI_ENGINE.md

**Version:** 1.0.0
**Status:** Active
**Owner:** AI Platform Team

---

# 1. Purpose

The AI Engine is the intelligent orchestration layer of Buintell.

Its purpose is not to replace the platform.

Its purpose is to allow users to interact with the platform using natural language while respecting business rules, permissions, workflows, and security.

The AI Engine is an assistant—not an administrator.

---

# 2. Vision

Every organization should be able to operate Buintell by talking naturally.

Examples:

> "Create an intern teacher named Ali Ahmad."

> "Show me today's attendance."

> "Generate this month's payroll."

> "How many students scored above 90%?"

The AI should understand the request, map it to platform actions, ask for missing information when needed, and execute only if the user has permission.

---

# 3. Core Principles

The AI Engine must be:

* Secure
* Permission-aware
* Explainable
* Predictable
* Extensible
* Offline-first
* Fast
* Modular

AI must never bypass platform rules.

---

# 4. Hybrid AI Architecture

```text id="9mtv83"
                  User
                    │
                    ▼
            AI Command Interface
                    │
                    ▼
             AI Router Engine
          ┌─────────┴─────────┐
          ▼                   ▼
   Local AI Engine      Cloud AI (Optional)
          │                   │
          └─────────┬─────────┘
                    ▼
            Intent & Entity Parser
                    ▼
            Permission Validation
                    ▼
              Core Platform Engines
                    ▼
                Response Builder
                    ▼
                  User
```

The router determines whether a request can be handled locally or requires a cloud model.

---

# 5. Offline-First Philosophy

Buintell is designed to work without an internet connection.

The Local AI should handle:

* CRUD operations
* Standard workflows
* Search
* Reports
* Navigation
* Commands
* Organization-specific terminology

Cloud AI is optional and used only when explicitly enabled.

---

# 6. Local AI

Default runtime:

* Ollama

Supported models:

* Llama
* Qwen
* Gemma
* Mistral

Local models should execute entirely on the organization's infrastructure.

No business data leaves the organization unless explicitly configured.

---

# 7. Cloud AI

Supported providers (optional):

* OpenAI
* Google Gemini
* Anthropic Claude

Cloud AI may assist with:

* Complex reasoning
* Long-form summarization
* Knowledge extraction
* Document analysis

The organization controls whether cloud providers are enabled.

---

# 8. AI Router

The AI Router is responsible for:

* Selecting the appropriate AI provider.
* Determining if cloud access is allowed.
* Falling back to local processing when possible.
* Managing retries.
* Logging decisions.

The router is the only component allowed to communicate with external AI providers.

---

# 9. Intent Detection

Every request should first be classified.

Example intents:

* Create
* Update
* Delete
* Search
* Report
* Analyze
* Explain
* Summarize
* Navigate
* Help

Intent detection must be deterministic where possible.

---

# 10. Entity Extraction

The AI should identify structured information.

Example:

> "Add intern teacher Ali Ahmad to Class 5."

Extracted entities:

* Action: Create
* Role: Intern Teacher
* Name: Ali Ahmad
* Group: Class 5

Extracted data is validated before execution.

---

# 11. Context Awareness

The AI should understand:

* Current organization
* Current user
* Installed Solution Packages
* User permissions
* Current page
* Previous conversation (within limits)

The AI should avoid repeatedly asking for information already available.

---

# 12. Permission Awareness

Before executing any action, the AI must verify:

* User authentication
* Organization context
* Required permissions
* Workflow restrictions

If authorization fails, execution stops.

The AI must explain why the action cannot be completed.

---

# 13. AI Memory

Memory exists at three levels:

### Session Memory

Temporary conversation context.

### Organization Memory

Business vocabulary.

Custom entity names.

Preferred terminology.

Workflow aliases.

### Global Memory

Platform knowledge.

Documentation.

Core concepts.

Sensitive user data must never become part of global memory.

---

# 14. AI Tools

The AI never performs work directly.

Instead, it invokes approved tools such as:

* Create Record
* Update Record
* Search Records
* Generate Report
* Upload File
* Send Notification
* Start Workflow
* Calculate Statistics

Every tool is permission-protected.

---

# 15. AI Responses

Responses should be:

* Clear
* Concise
* Professional
* Actionable

When additional information is required, the AI should ask structured follow-up questions instead of making assumptions.

---

# 16. Learning

The AI may learn:

* Organization terminology
* Custom field names
* Workflow aliases
* Frequently used commands

Learning should remain organization-specific unless explicitly shared.

---

# 17. Logging

Every AI interaction should record:

* Timestamp
* User
* Intent
* Selected provider
* Executed tools
* Outcome

Prompt contents should be logged only according to organizational privacy settings.

---

# 18. Safety

The AI must never:

* Bypass permissions.
* Invent records.
* Modify data without authorization.
* Reveal hidden information.
* Ignore validation rules.
* Execute unsafe commands.

Safety overrides convenience.

---

# 19. Performance Targets

Target response times:

* Local AI commands: under 3 seconds.
* CRUD operations: under 2 seconds.
* Reports: under 5 seconds.
* Cloud AI: dependent on provider latency.

The interface should always provide feedback while processing.

---

# 20. Future Vision

Future capabilities may include:

* Voice interaction.
* Multilingual conversations.
* AI workflow suggestions.
* AI-generated dashboards.
* Predictive analytics.
* Autonomous task scheduling (with approval).
* Knowledge retrieval from uploaded documents.

All future capabilities must continue to respect platform permissions and governance.

---

# 21. Definition of Success

The AI Engine succeeds when:

* Users can operate Buintell naturally through conversation.
* Routine business tasks become faster.
* Organizations retain full control over their data.
* Local AI handles the majority of requests.
* Cloud AI remains optional.
* Every AI action is secure, auditable, and explainable.

The AI Engine enhances human productivity while preserving trust, privacy, and the integrity of the Buintell platform.
