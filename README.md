# Addis Software MERN Stack Test — Songs Library

A full-stack music library application built with the **MERN stack** (MongoDB, Express, React, Node.js) featuring Redux Toolkit, Redux-Saga, Emotion, Styled System, and Recharts.

---

## Live Demo

> _(Add your deployed URLs here after deployment)_
> - **Frontend**: `https://your-app.vercel.app`
> - **Backend API**: `https://your-app.onrender.com/api/songs`

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Redux Toolkit, Redux-Saga, Emotion, Styled System, Recharts |
| **Backend** | Node.js 20, Express 4, Mongoose 8, dotenv, cors |
| **Database** | MongoDB (Docker locally / MongoDB Atlas in production) |
| **Deployment** | Vercel (frontend) + Render (backend) + MongoDB Atlas (database) |

---

## Features

- 🎵 **Full Songs CRUD** — Create, read, update, and delete songs with live Redux state updates, no page reloads
- 🔍 **Filtering & Search** — Real-time debounced search + genre filter with active filter chips
- 📊 **Statistics Dashboard** — Recharts-powered donut and horizontal bar charts for genres, artists, and albums
- 📈 **Scalable Charts** — Top-10 cap with +X more indicator; "Other" bucket grouping for genre overflow
- 🎨 **Emotion + Styled System** — Responsive theming with mobile, tablet, and desktop breakpoints
- ✨ **Animations** — Staggered list entries, modal transitions, hover micro-interactions, count-up stats
- 🔔 **Toast Feedback** — Animated success/error notifications on every CRUD action
- 💀 **Skeleton Loaders** — Shimmer placeholder loading states for songs and statistics
- 🏷️ **Genre Dropdown** — Fixed genre select prevents case-duplicate entries; legacy values handled gracefully

---

## Project Structure

```
intern 1/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── server.js
│   ├── .env.example
│   └── Dockerfile
│
└── frontend/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   ├── constants/
    │   ├── features/
    │   ├── pages/
    │   ├── styles/
    │   └── types/
    ├── vercel.json
    └── public/_redirects
```

---

## Local Development

### Prerequisites

- Node.js 18+ and npm 9+
- Docker Desktop (for local MongoDB)

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd "intern 1"
```

### 2. Start MongoDB via Docker

```bash
docker run -d --name songs_mongo -p 27017:27017 -e MONGO_INITDB_DATABASE=songs_db mongo:7
```

### 3. Backend setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
# API running at: http://localhost:5000
```

### 4. Frontend setup

```bash
cd frontend
npm install
npm run dev
# App running at: http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/songs` | List all songs (supports `?search=&genre=`) |
| `POST` | `/api/songs` | Create a new song |
| `GET` | `/api/songs/:id` | Get a single song |
| `PUT` | `/api/songs/:id` | Update a song |
| `DELETE` | `/api/songs/:id` | Delete a song |
| `GET` | `/api/statistics` | Aggregate statistics (totals + breakdowns) |

### Song Schema

```json
{
  "title":  "string (required)",
  "artist": "string (required)",
  "album":  "string (required)",
  "genre":  "string (required)"
}
```

---

## Production Deployment

### Step 1 — Database: MongoDB Atlas

1. Create a free M0 cluster at https://www.mongodb.com/cloud/atlas
2. Create a database user and allow all IPs (0.0.0.0/0) in Network Access
3. Copy the connection string:
   `mongodb+srv://<user>:<password>@cluster.mongodb.net/songs_db?retryWrites=true&w=majority`

### Step 2 — Backend: Render

1. Create a Web Service at https://render.com pointing to the `backend/` directory
2. Build Command: `npm install --omit=dev`
3. Start Command: `npm start`
4. Environment Variables:

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `MONGODB_URI` | your Atlas connection string |

### Step 3 — Frontend: Vercel

1. Create a new project at https://vercel.com, set Root Directory to `frontend/`
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Environment Variables:

| Key | Value |
|---|---|
| `VITE_API_BASE_URL` | `https://<your-render-app>.onrender.com/api` |

The included `frontend/vercel.json` handles SPA client-side routing rewrites automatically.

---

## Environment Variables Reference

### Backend (`backend/.env`)

```env
MONGODB_URI=mongodb://localhost:27017/songs_db
PORT=5000
NODE_ENV=development
```

### Frontend (`frontend/.env.local`)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```