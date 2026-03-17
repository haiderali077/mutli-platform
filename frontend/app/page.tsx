import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Upload, Share2, BarChart3, Users, Zap } from "lucide-react";

export default function Home() {
  const features = [
    { icon: Upload, title: "Multi-Platform Upload", description: "Upload once, distribute everywhere across YouTube, Reddit, Instagram, Pinterest, and LinkedIn." },
    { icon: Share2, title: "Smart Distribution", description: "Automatically adapts content format and requirements for each platform." },
    { icon: BarChart3, title: "Analytics Ready", description: "Track performance across all platforms with unified reporting." },
    { icon: Users, title: "Team Collaboration", description: "Work with your team to manage content distribution campaigns." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center"><Zap className="w-5 h-5 text-white" /></div>
            <span className="text-xl font-bold">Multi-Platform</span>
          </div>
          <Link href="/compose"><Button>Get Started</Button></Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">Now with Video Upload Support</Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Distribute Content Across<br /><span className="text-primary">All Major Platforms</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload once, distribute everywhere. Intelligent platform adaptation for each social media site.
          </p>
          <Link href="/compose"><Button size="lg" className="text-lg px-8 py-6">Start Creating Content<ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, i) => (
            <Card key={i} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-black/5 rounded-lg flex items-center justify-center mx-auto mb-4"><feature.icon className="w-6 h-6 text-black" /></div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent><CardDescription className="text-sm">{feature.description}</CardDescription></CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Supported Platforms</h2>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            <div className="flex items-center gap-2"><div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center"><span className="text-white font-bold text-sm">YT</span></div><span className="font-medium">YouTube</span></div>
            <div className="flex items-center gap-2"><div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center"><span className="text-white font-bold text-sm">R</span></div><span className="font-medium">Reddit</span></div>
            <div className="flex items-center gap-2"><div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center"><span className="text-white font-bold text-sm">IG</span></div><span className="font-medium">Instagram</span></div>
            <div className="flex items-center gap-2"><div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center"><span className="text-white font-bold text-sm">P</span></div><span className="font-medium">Pinterest</span></div>
            <div className="flex items-center gap-2"><div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"><span className="text-white font-bold text-sm">LI</span></div><span className="font-medium">LinkedIn</span></div>
          </div>
        </div>
      </main>
    </div>
  )
}
