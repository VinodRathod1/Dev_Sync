---
# DevSync
A collaborative project management tool built for developer teams. DevSync lets you model your project as an interactive node graph — each node represents a feature or milestone, with tasks, team assignments, and progress tracking built right into the canvas.

![Tech Stack](https://img.shields.io/badge/React-18-blue?logo=react)
![Node](https://img.shields.io/badge/Node.js-20-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7-brightgreen?logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-ready-blue?logo=docker)

---

## Features
- **Visual Node Graph** — build your project structure as a flow diagram using React Flow; connect nodes to represent dependencies between features
- **Per-Node Task Management** — add, assign, and complete tasks directly on each node; circular progress indicator shows completion status at a glance
- **Node Customization** — edit node titles, descriptions, and colors inline on the canvas; changes are saved back to the database
- **Team Collaboration** — invite team members to your project by username; manage roles and permissions per project
- **JWT Authentication** — secure signup/login with JSON Web Tokens; all protected routes require a valid token
- **Task Assignment** — assign tasks to specific team members; track who owns what across the project
- **Docker Support** — full Docker + Compose setup so anyone can run the entire stack (frontend, backend, MongoDB) with a single command

---

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React 18, React Flow, Tailwind CSS, MUI |
| Backend | Node.js 20, Express.js (ES Modules) |
| Database | MongoDB 7 via Mongoose |
| Auth | JWT (jsonwebtoken + bcrypt) |
| DevOps | Docker, Docker Compose, nginx |

---

## Project Structure
```
Dev_Sync-main/
├── docker-compose.yml
├── DevSync-Backend-main/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   ├── server.js
│   ├── config/      # MongoDB connection
│   ├── controller/  # auth, project, task, invite
│   ├── middlewares/ # JWT verification
│   ├── models/      # Mongoose schemas
│   ├── routes/      # Express routers
│   └── utils/       # helper functions
└── DevSync-Frontend-main/
    ├── Dockerfile
    ├── nginx.conf
    └── src/
        ├── Node/        # canvas node with tasks, colors, editable fields
        ├── React Flow/  # graph canvas setup
        └── Sections/    # Home, Auth, Dock, Tasks, Team, Invite, Profile
```

---

## Getting Started

### Option 1 — Docker (recommended)
> Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/)

```bash
# 1. Clone the repo
git clone https://github.com/your-username/Dev_Sync.git
cd Dev_Sync-main

# 2. Set up environment variables
cp DevSync-Backend-main/.env.example DevSync-Backend-main/.env
# Open .env and set JWT_SECRET to any long random string

# 3. Start all services
docker-compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5001 |
| MongoDB | mongodb://localhost:27017 |

To stop:
`docker-compose down`
To stop and delete data:
`docker-compose down -v`

---

### Option 2 — Manual Setup
**Prerequisites:** Node.js 20+, MongoDB running locally

**Backend**
```bash
cd DevSync-Backend-main
cp .env.example .env
# fill in MONGO_DB_URL and JWT_SECRET
npm install
node server.js
# runs on port 5001
```

**Frontend**
```bash
cd DevSync-Frontend-main
# create a .env file with: 
# REACT_APP_BACKEND_URL=http://localhost:5001
npm install
npm start
# runs on port 3000
```

---

## Environment Variables

**Backend** (`DevSync-Backend-main/.env`)
| Variable | Description | Example |
|---|---|---|
| `MONGO_DB_URL` | MongoDB connection string | `mongodb://localhost:27017/devsync` |
| `JWT_SECRET` | Secret key for signing JWTs | `any_long_random_string` |

> When using Docker Compose, `MONGO_DB_URL` is automatically set — you only need to set `JWT_SECRET`.

**Frontend** (`.env` in frontend root)
| Variable | Description | Example |
|---|---|---|
| `REACT_APP_BACKEND_URL` | Base URL of the backend API | `http://localhost:5001` |

---

## API Reference
All routes except `/auth/*` require an `Authorization` header with a valid JWT token.

**Auth**
```
POST /auth/signup - register a new user
POST /auth/login - login and receive JWT
GET /fetchDetails - get logged-in user profile
```

**Projects**
```
GET /project/view - list all projects for current user
GET /project/open/:id - load a project with its node graph
GET /project/view/:id - get project details
POST /project/save - save node graph changes
POST /project/edit/:id - update a node's title, description, or color
```

**Tasks**
```
POST /task/create - create a task on a node
POST /task/update - mark a task complete/incomplete
POST /task/assign - assign a task to a team member
GET /task/fetchByUser - get all tasks assigned to current user
POST /task/fetchByID - get all tasks for a specific node
```

**Invites**
```
GET /invite/view - view pending invites
POST /invite/send/:id - send an invite to a user
POST /invite/accept/:id - accept a project invite
```

---

## Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## License
MIT
