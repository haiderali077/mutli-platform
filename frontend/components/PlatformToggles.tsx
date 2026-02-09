"use client";

import { Platform } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  selectedPlatforms: Platform[];
  onPlatformToggle: (platform: Platform, checked: boolean) => void;
}

const platforms: { id: Platform; label: string; color: string }[] = [
  { id: "youtube", label: "YouTube", color: "bg-red-500" },
  { id: "instagram", label: "Instagram", color: "bg-pink-500" },
  { id: "pinterest", label: "Pinterest", color: "bg-red-600" },
  { id: "reddit", label: "Reddit", color: "bg-orange-500" },
  { id: "linkedin", label: "LinkedIn", color: "bg-blue-600" },
];

export function PlatformToggles({ selectedPlatforms, onPlatformToggle }: Props) {
  return (
    <Card>
      <CardHeader><CardTitle>Select Platforms</CardTitle></CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {platforms.map(({ id, label, color }) => {
            const isChecked = selectedPlatforms.includes(id);
            const isDisabled = id === "youtube" && selectedPlatforms.includes("pinterest");
            return (
              <label key={id} className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${isChecked ? "border-black bg-gray-50" : "hover:bg-gray-50"} ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}`}>
                <input type="checkbox" className="w-4 h-4" checked={isChecked} disabled={isDisabled} onChange={(e) => onPlatformToggle(id, e.target.checked)} />
                <div className={`w-3 h-3 ${color} rounded-full`} />
                <span className="font-medium">{label}</span>
              </label>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
