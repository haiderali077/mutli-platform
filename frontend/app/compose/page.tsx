"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Platform, FormData } from "@/lib/types";
import { getRequiredFields, buildZodSchema } from "@/lib/helpers";
import { PlatformToggles } from "@/components/PlatformToggles";
import { DynamicFields } from "@/components/DynamicFields";
import { SummaryPanel } from "@/components/SummaryPanel";
import { VideoUpload } from "@/components/VideoUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ComposePage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const requiredFields = getRequiredFields(selectedPlatforms);
  const schema = buildZodSchema(requiredFields, selectedPlatforms);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

  const formData = watch();

  const handlePlatformToggle = (platform: Platform, checked: boolean) => {
    if (checked) {
      let newPlatforms = [...selectedPlatforms, platform];
      if (platform === "pinterest") newPlatforms = newPlatforms.filter(p => p !== "youtube");
      setSelectedPlatforms(newPlatforms);
    } else {
      setSelectedPlatforms(prev => prev.filter(p => p !== platform));
    }
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    const payload = { platforms: selectedPlatforms, ...data };
    await fetch('http://localhost:8000/post/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Content Composer</h1>
            <p className="text-sm text-gray-500">Create and distribute content across platforms</p>
          </div>
          <Link href="/" className="text-sm text-gray-600 hover:text-black">Back to Home</Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 space-y-6">
            <PlatformToggles selectedPlatforms={selectedPlatforms} onPlatformToggle={handlePlatformToggle} />
            {selectedPlatforms.length > 0 && (
              <>
                <VideoUpload onVideoSelect={setSelectedVideo} selectedVideo={selectedVideo} selectedPlatforms={selectedPlatforms} />
                <DynamicFields selectedPlatforms={selectedPlatforms} requiredFields={requiredFields} />
              </>
            )}
          </div>
          <div className="xl:col-span-1">
            <SummaryPanel selectedPlatforms={selectedPlatforms} formData={formData} errors={errors} onSubmit={handleSubmit(onSubmit)} isSubmitting={isSubmitting} />
          </div>
        </div>
      </main>
    </div>
  );
}
