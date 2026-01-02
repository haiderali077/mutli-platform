"use client";

import { useState } from "react";

export default function ComposePage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const platforms = ["youtube", "instagram", "pinterest", "reddit", "linkedin"];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">Create Post</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-medium mb-4">Select Platforms</h2>
          <div className="grid grid-cols-3 gap-3">
            {platforms.map((p) => (
              <label key={p} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(p)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPlatforms([...selectedPlatforms, p]);
                    } else {
                      setSelectedPlatforms(selectedPlatforms.filter(x => x !== p));
                    }
                  }}
                />
                <span className="capitalize">{p}</span>
              </label>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
