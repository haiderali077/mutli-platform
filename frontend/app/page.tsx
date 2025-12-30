import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-xl font-bold">Multi-Platform</span>
          <Link href="/compose" className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
            Get Started
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            Distribute Content Across All Major Platforms
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload once, publish everywhere. Support for YouTube, Reddit, Instagram, Pinterest, and LinkedIn.
          </p>
          <Link href="/compose" className="bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors inline-block">
            Start Creating
          </Link>
        </div>
      </main>
    </div>
  )
}
