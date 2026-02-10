# 🎭 Odyssey Theater Hub

A full-stack monorepo for **real-time theater stage management and telemetry**. This system uses a **microservices architecture** to decouple UI dashboarding from hardware-level stage control logic.

---

## Tech Stack

* **Frontend:** Next.js 15 (Turbopack), Tailwind CSS, Lucide Icons.
* **Gateway:** NestJS API Gateway (**REST**).
* **Microservice:** NestJS Stage-Controller (**TCP Communication**).

---

## Architecture

The system is built on a **Request-Response pattern** over TCP to ensure low-latency communication between services:

1.  **Next.js Frontend:** Polls the Gateway every **2s** for live telemetry updates.
2.  **Odyssey Gateway:** Orchestrates REST requests and forwards commands to the backend services.
3.  **Stage-Controller Service:** Manages the **"Stage State"**, including:
    * **Lighting** control.
    * **Curtain** automation.
    * **Thermal Safety** monitoring.

---

## Getting Started

Follow these steps to get your development environment running:

### 1. Backend Setup
```bash
cd odyssey-back
npm install
npm run start:dev
```
### 2. Backend Setup
```bash
cd odyseey-front
npm install
npm run dev
```

<img width="1896" height="949" alt="image" src="https://github.com/user-attachments/assets/0c3cf139-344d-4a2c-a1c0-90968b7d0701" />

