# Parcial

## Proyecto Juan Sao Ville

### Alejandro Castro Bueno

Introducción

Este proyecto forma parte de la materia Ingeniería Web y tiene como objetivo aplicar los conceptos vistos en clase desarrollando un sistema fullstack compuesto por:
	•	Backend (API REST): expone servicios para autenticación, gestión de usuarios y administración de víctimas.
	•	Frontend (Next.js + React + Tailwind): provee una interfaz gráfica moderna, responsiva y amigable.

El propósito del API y su frontend es gestionar diferentes roles de usuario (Admin, Slave, Público), mostrando distintos accesos y funcionalidades según permisos.


Tecnologías Utilizadas
	•	Backend:
	•	Node.js + Express
	•	Prisma ORM
	•	SQLite / PostgreSQL
	•	JWT + cookies httpOnly para autenticación segura
	•	Frontend:
	•	Next.js 15 (App Router)
	•	React 19 (Hooks, Context API)
	•	TailwindCSS 4 (estilos modernos minimalistas)
	•	Framer Motion (animaciones)


Estructura del Proyecto

juan-sao-ville/
├── backend/        # API REST (Primer entregable)
├── frontend/       # Interfaz gráfica (Segundo entregable)
└── README.md       # Documentación principal

Funcionalidades Principales

Backend (API)
	•	Autenticación de usuarios
	•	/auth/login
	•	/auth/me
	•	Gestión de usuarios (ADMIN)
	•	/users
	•	Gestión de víctimas (SLAVE/ADMIN)
	•	/victims
	•	/victims/:id
	•	Leaderboard
	•	/stats/leaderboard
	•	Tips públicos de resistencia
	•	/public/tips
	•	/public/feedback

Frontend
	•	Página de Login → acceso según rol.
	•	Dashboard Admin → gestión de usuarios y leaderboard.
	•	Dashboard Slave → formulario para capturar víctimas + tabla de seguimiento.
	•	Página de Resistencia → tips y feedback público.
	•	Detalle de Víctimas → ver y actualizar estado de transformación.

⸻

Instrucciones de Instalación
1. Clonar el repositorio
git clone https://github.com/Castross764/Parcial.git
cd juan-sao-ville

2. Configurar el Backend
cd backend
npm install
npm run dev

El backend corre en:
👉 http://localhost:3000/api

3. Configurar el Frontend
cd frontend
npm install
npm run dev

Uso del API – Ejemplos
Login
Request
POST /auth/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "123456"
}

Response
{
  "id": 1,
  "email": "admin@test.com",
  "role": "ADMIN"
}

Crear Víctima

Request

POST /victims
Content-Type: application/json

{
  "name": "Víctima 1",
  "skills": "Programación",
  "lastSeen": "2025-09-01",
  "transformationStatus": "CAPTURED"
}

Response
{
  "id": 1,
  "name": "Víctima 1",
  "skills": "Programación",
  "lastSeen": "2025-09-01",
  "transformationStatus": "CAPTURED"
}

Troubleshooting
	•	Error de conexión frontend-backend
        Verificar que el baseURL en frontend/lib/api.ts apunte correctamente al backend.
	•	Problemas con Tailwind
        Asegurarse de tener @import "tailwindcss"; en globals.css y no duplicar configuraciones en postcss.config.js.
	•	Base de datos no responde
        Revisar migraciones de Prisma (npx prisma migrate dev).


