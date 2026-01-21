"use client";

import { useState } from "react";

type Platform = "youtube" | "instagram" | "pinterest" | "reddit" | "linkedin";

export default function ComposePage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);

  const platforms: { id: Platform; label: string; color: string }[] = [
    { id: "youtube", label: "YouTube", color: "bg-red-500" },
    { id: "instagram", label: "Instagram", color: "bg-pink-500" },
    { id: "pinterest", label: "Pinterest", color: "bg-red-600" },
    { id: "reddit", label: "Reddit", color: "bg-orange-500" },
    { id: "linkedin", label: "LinkedIn", color: "bg-blue-600" },
  ];

  const handleToggle = (platform: Platform, checked: boolean) => {
    if (checked) {
      let next = [...selectedPlatforms, platform];
      if (platform === "pinterest") {
        next = next.filter(p => p !== "youtube");
      }
      setSelectedPlatforms(next);
    } else {
      setSelectedPlatforms(prev => prev.filter(p => p !== platform));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">Create Post</h1>
          <p className="text-sm text-gray-500">Select platforms to distribute your content</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-medium mb-4">Choose Platforms</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {platforms.map(({ id, label, color }) => {
              const isChecked = selectedPlatforms.includes(id);
              const isDisabled = id === "youtube" && selectedPlatforms.includes("pinterest");
              return (
                <label
                  key={id}
                  className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    isChecked ? "border-black bg-gray-50" : "hover:bg-gray-50"
                  } ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={(e) => handleToggle(id, e.target.checked)}
                  />
                  <div className={`w-3 h-3 ${color} rounded-full`} />
                  <span className="font-medium">{label}</span>
                </label>
              );
            })}
          </div>
          {selectedPlatforms.includes("pinterest") && (
            <p className="mt-3 text-sm text-amber-600">Pinterest is image-only. YouTube has been deselected.</p>
          )}
        </div>
      </main>
    </div>
  )
}
