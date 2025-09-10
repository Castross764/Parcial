# Parcial

## Proyecto Juan Sao Ville

### Introducción

Este proyecto corresponde al primer entregable del semestre, cuyo objetivo es construir un API REST funcional que permitan manejar usuarios, autenticación, víctimas, estadísticas y páginas públicas.

La API está construida con NestJS + Prisma + PostgreSQL, siguiendo principios de seguridad y buenas prácticas (JWT, bcrypt, Guards por roles, validación de DTOs, etc.).

#### Propósito principal:

	•	Administrar usuarios (roles: ADMIN, SLAVE, DEV).

	•	Registrar víctimas asociadas a los esclavos.

	•	Mostrar estadísticas y leaderboard.

	•	Proveer tips y recibir feedback público.

### Stack Tecnológico

	•	Lenguaje: TypeScript

	•	Framework Backend: NestJS

	•	ORM: Prisma

	•	Base de datos: PostgreSQL

	•	Autenticación: JWT (cookies httpOnly)

	•	Validación: class-validator + DTOs

	•	Hash de contraseñas: bcrypt

### Setup e Instalación

1. Clonar el repositorio

git clone <repo-url>
cd backend

2. Instalar dependencias

pnpm install

3. Variables de entorno

Crear archivo .env en la carpeta backend con:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/juan-saoville"
JWT_SECRET="supersecretkey"
NODE_ENV=development

4. Migrar base de datos

npx prisma migrate dev --name init

5. Ejecutar en modo desarrollo

pnpm start:dev

### Estructura de carpetas

backend/
│── src/
│   ├── auth/        # Registro, login, JWT
│   ├── users/       # CRUD de usuarios
│   ├── victims/     # CRUD de víctimas
│   ├── stats/       # Leaderboard y estadísticas
│   ├── public/      # Tips y feedback
│   ├── prisma/      # Configuración de Prisma
│   └── main.ts      # Configuración principal

### Endpoints Principales

#### Auth

**Método**       |           **Endpoint**          |           **Descripción**
POST         |      /api/auth/register     |           Registrar un nuevo usuario
POST         |       /api/auth/login       |           Login, devuelve cookie con JWT
GET          |         /api/auth/me        |           Info del usuario autenticado

#### Ejemplo:

curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"123456","role":"SLAVE"}'


### Users

**Método**       |           **Endpoint**             |           **Descripción**
GET          |           /api/users           |           Listar usuarios (solo ADMIN)
GET          |           /api/users/:id       |           Ver un usuario
PUT          |           /api/users/:id       |           Editar perfil (propio o ADMIN)
DELETE       |           /api/users/:id       |           Eliminar usuario (solo ADMIN)

### Victims

**Método**      |           **Endpoint**               |           **Descripción**
POST         |           /api/victims           |           Crear víctima (SLAVE)
GET          |           /api/victims           |           Listar víctimas (depende del rol)
GET          |           /api/victims/:id       |           Ver víctima
PUT          |           /api/victims/:id       |           Actualizar estado
DELETE       |           /api/victims/:id       |           Eliminar (solo ADMIN)

#### Roles:
	- SLAVE → solo sus víctimas

	- ADMIN → todas

	- DEV → solo públicas

### Stats

**Método**       |           **Endpoint**                     |           **Descripción**
GET          |           /api/stats/leaderboard       |           Ranking de esclavos por número de víctimas
GET          |           /api/stats/slaves/:id        |           Estadísticas individuales de un esclavo


### Public

**Método**       |           **Endpoint**                   |           **Descripción**
GET          |           /api/public/tips           |           Listado de tips
POST         |           /api/public/feedback       |           Enviar feedback público

### Seguridad

	•	JWT con cookies httpOnly → evita XSS.

	•	bcrypt con salt rounds = 12 → protege contraseñas.

	•	RoleGuard → protege rutas según rol.

	•	Rate limiting (@nestjs/throttler) → limita spam.

	•	CORS configurado → solo acepta frontend permitido.

### Ejemplo de flujo

	1.	Registrar usuario: POST /api/auth/register

	2.	Iniciar sesión: POST /api/auth/login (guarda cookie access_token)

	3.	Consultar info: GET /api/auth/me

	4.	Crear víctima: POST /api/victims
	
	5.	Ver leaderboard: GET /api/stats/leaderboard