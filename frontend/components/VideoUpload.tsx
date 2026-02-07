"use client";

import { useState, useRef } from "react";
import { Platform } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  onVideoSelect: (file: File | null) => void;
  selectedVideo: File | null;
  selectedPlatforms: Platform[];
}

export function VideoUpload({ onVideoSelect, selectedVideo, selectedPlatforms }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onVideoSelect(file);
  };

  return (
    <Card>
      <CardHeader><CardTitle>Upload Media</CardTitle></CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${
            isDragging ? "border-black bg-gray-50" : "border-gray-300"
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input ref={inputRef} type="file" className="hidden" accept="image/*,video/*"
            onChange={(e) => { const file = e.target.files?.[0]; if (file) onVideoSelect(file); }} />
          {selectedVideo ? (
            <div>
              <p className="font-medium">{selectedVideo.name}</p>
              <p className="text-sm text-gray-500 mt-1">{(selectedVideo.size / (1024 * 1024)).toFixed(1)} MB</p>
            </div>
          ) : (
            <div>
              <p className="text-gray-600">Drag and drop an image or video here</p>
              <p className="text-sm text-gray-400 mt-1">or click to browse</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
