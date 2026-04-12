# Multi-Platform Publisher

A multi-platform content distribution tool that lets you publish across YouTube, Reddit, Instagram, Pinterest, and LinkedIn from a single interface.

## What It Does

Upload media once, fill in platform-specific details, and publish everywhere at once. The app handles format adaptation per platform, blocks incompatible combinations, and processes all uploads concurrently.

## Built With

**Frontend:** Next.js 14, TypeScript, React Hook Form, Zod, Tailwind CSS
**Backend:** Go, Chi router, goroutine-based concurrent processing

## Getting Started

### Prerequisites
- Node.js 18 or above
- Go 1.23 or above
- Git

### Setup

```bash
git clone https://github.com/haiderali077/mutli-platform.git
cd mutli-platform

# Backend
cd backend
go mod download
go run cmd/api/main.go  # starts on port 8000

# Frontend (in another terminal)
cd frontend
npm install
npm run dev  # starts on port 3000
```

Create `backend/config/.env`:
```env
UploadsAPI=your_api_key
```

## How It Works

1. **Select platforms** — pick from YouTube, Instagram, Pinterest, Reddit, and LinkedIn
2. **Upload media** — drag and drop an image or video
3. **Fill in details** — each platform surfaces its required fields
4. **Publish** — content is sent concurrently to all selected platforms

## Platforms

- **YouTube** — video upload with title, description, tags, category, privacy
- **Instagram** — images and videos with captions and user tagging
- **Pinterest** — image pins to boards
- **Reddit** — text, link, and image posts
- **LinkedIn** — professional posts with visibility controls

## Project Structure

```
├── backend/
│   ├── cmd/api/         # Application entry point
│   ├── internal/        # Handlers, tools, shared logic
│   ├── uploads/         # Per-platform upload implementations
│   └── config/          # Environment configuration
├── frontend/
│   ├── app/             # Next.js app router pages
│   ├── components/      # React components
│   └── lib/             # Types, helpers, validation
└── README.md
```

## License

MIT
