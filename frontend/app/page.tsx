import Link from "next/link"

const features = [
  { title: "YouTube", desc: "Video uploads with full metadata support", color: "bg-red-500" },
  { title: "Instagram", desc: "Images and video posts with captions", color: "bg-pink-500" },
  { title: "Reddit", desc: "Text, link, and image post types", color: "bg-orange-500" },
  { title: "Pinterest", desc: "Image pins to boards", color: "bg-red-600" },
  { title: "LinkedIn", desc: "Professional posts with visibility controls", color: "bg-blue-600" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold">Multi-Platform</span>
          </div>
          <Link href="/compose" className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
            Get Started
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-bold mb-6">Publish Everywhere, All at Once</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your content once and distribute it across YouTube, Reddit, Instagram, Pinterest, and LinkedIn simultaneously.
          </p>
          <Link href="/compose" className="bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors inline-block">
            Start Creating Content
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-lg border p-6 text-center hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 ${f.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <span className="text-white font-bold text-xs">{f.title[0]}</span>
              </div>
              <h3 className="font-medium mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
