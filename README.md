# Multi-Platform

A multi-platform content distribution system for publishing content across YouTube, Reddit, Instagram, Pinterest, and LinkedIn from one unified interface.

## Features

- **Unified Upload**: Upload media once, distribute everywhere
- **Multi-Platform**: YouTube, Reddit, Instagram, Pinterest, LinkedIn
- **Smart Validation**: Prevents incompatible platform combinations
- **Concurrent Processing**: Simultaneous uploads to all selected platforms
- **Dynamic Forms**: Platform-specific fields generated based on selections

## Tech Stack

**Frontend:** Next.js 14, TypeScript, React Hook Form, Zod, Tailwind CSS
**Backend:** Go, Chi router, concurrent goroutines

## Getting Started

### Prerequisites
- Node.js 18+
- Go 1.23+

### Setup

```bash
git clone https://github.com/haiderali077/mutli-platform.git
cd mutli-platform

# Backend
cd backend
go mod download
go run cmd/api/main.go  # starts on :8000

# Frontend (separate terminal)
cd frontend
npm install
npm run dev  # starts on :3000
```

Create `backend/config/.env`:
```env
UploadsAPI=your_api_key
```

## Project Structure

```
├── backend/
│   ├── cmd/api/         # Entry point
│   ├── internal/        # Handlers, tools
│   ├── uploads/         # Per-platform implementations
│   └── config/          # Environment config
├── frontend/
│   ├── app/             # Next.js pages
│   ├── components/      # React components
│   └── lib/             # Utilities, types
└── README.md
```

## License

MIT
