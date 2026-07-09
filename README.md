# SignalPost

LinkedIn content generator — split into a **Next.js frontend** and an **Express backend**.

## Structure

```
signalpost/
├── frontend/     # Next.js 15 UI (landing + studio)
├── backend/      # Express API (generate, news)
└── package.json  # Root scripts to run both
```

## Quick Start

```bash
# Install all dependencies
npm run install:all

# Configure env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Run both servers
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:4000](http://localhost:4000)

## Environment

**Backend** (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | API port (default 4000) |
| `FRONTEND_URL` | CORS origin (default http://localhost:3000) |
| `OPENAI_API_KEY` | Enables live LLM generation |
| `OPENAI_MODEL` | Default: `gpt-4o-mini` |
| `ENABLE_IMAGE_GENERATION` | Set `true` for DALL-E |
| `NEWS_API_KEY` | Live news fetch |
| `GENERATION_MODE` | Set `mock` to force demo mode |

**Frontend** (`frontend/.env.local`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend URL (default http://localhost:4000) |

Works end-to-end without API keys via mock generation.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend + frontend |
| `npm run dev:frontend` | Frontend only |
| `npm run dev:backend` | Backend only |
| `npm run build` | Build both |

## License

MIT
