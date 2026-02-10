🎭 Odyssey Theater Hub
A full-stack monorepo for real-time theater stage management and telemetry. This system uses a microservices architecture to decouple UI dashboarding from hardware-level stage control logic.

Tech Stack
Frontend: Next.js 16 (Turbopack), Tailwind CSS, Lucide Icons.
Gateway: NestJS API Gateway (REST).
Microservice: NestJS Stage-Controller (TCP Communication).
Language: TypeScript.

Architecture
The system is built on a Request-Response pattern over TCP:
Next.js Frontend (Port 3001) polls the Gateway every 2s for live telemetry.
Odyssey Gateway (Port 3000) orchestrates REST requests and forwards commands.
Stage-Controller Service manages the "Stage State" (Lighting, Curtains, Thermal Safety).

🛠️ Getting Started
Backend: cd odyssey-back && npm run start:dev
Frontend: cd odyseey-front && npm run dev

<img width="1896" height="949" alt="image" src="https://github.com/user-attachments/assets/0c3cf139-344d-4a2c-a1c0-90968b7d0701" />

