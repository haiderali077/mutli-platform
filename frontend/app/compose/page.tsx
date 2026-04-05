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
import { FieldReferenceTable } from "@/components/FieldReferenceTable";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, Save } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ComposePage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState<"platforms" | "content" | "review">("platforms");
  const { toast } = useToast();

  const requiredFields = getRequiredFields(selectedPlatforms);
  const schema = buildZodSchema(requiredFields, selectedPlatforms);

  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema), mode: "onChange"
  });

  const formData = watch();

  const handlePlatformToggle = (platform: Platform, checked: boolean) => {
    if (checked) {
      let newPlatforms = [...selectedPlatforms, platform];
      if (platform === "pinterest") newPlatforms = newPlatforms.filter(p => p !== "youtube");
      setSelectedPlatforms(newPlatforms);
    } else {
      setSelectedPlatforms(prev => prev.filter(p => p !== platform));
      reset();
    }
  };

  const handleVideoSelect = async (file: File | null) => {
    setSelectedVideo(file);
    if (file) {
      try {
        const fd = new FormData();
        fd.append('file', file);
        const response = await fetch('http://localhost:8000/upload/file', { method: 'POST', body: fd });
        if (response.ok) {
          const result = await response.json();
          setValue('image_url', result.file_path);
          const fileWithMeta = Object.assign(file, { path: result.file_path, savedName: result.filename });
          setSelectedVideo(fileWithMeta);
          toast({ title: "Uploaded!", description: `"${file.name}" is ready.` });
        } else {
          toast({ title: "Upload Failed", description: "Could not upload file.", variant: "destructive" });
        }
      } catch {
        toast({ title: "Error", description: "Upload error occurred.", variant: "destructive" });
      }
    }
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const payload = {
        platforms: selectedPlatforms,
        ...data,
        user_tags: data.user_tags || '',
        media_file: selectedVideo && (selectedVideo as any).savedName ? (selectedVideo as any).savedName : '',
        source_type: selectedPlatforms.includes('pinterest') ? 'image_url' : (data.source_type || '')
      };
      const response = await fetch('http://localhost:8000/post/content', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      if (response.ok) {
        const result = await response.json();
        toast({ title: "Published!", description: `Sent to ${result.platforms?.join(', ') || 'selected platforms'}.` });
      } else {
        const errText = await response.text();
        toast({ title: "Error", description: `Backend: ${errText}`, variant: "destructive" });
      }
    } catch {
      toast({ title: "Submission Failed", description: "Unexpected error.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: "platforms", label: "Platforms", description: "Select channels" },
    { id: "content", label: "Content", description: "Upload and configure" },
    { id: "review", label: "Review", description: "Review and publish" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button></Link>
            <div><h1 className="text-xl font-semibold">Content Composer</h1><p className="text-sm text-muted-foreground">Create and distribute content across platforms</p></div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Save className="w-4 h-4 mr-2" />Save Draft</Button>
            <Button variant="outline" size="sm"><Settings className="w-4 h-4" /></Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    currentStep === step.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                    {index + 1}
                  </div>
                  <div className="mt-2 text-center"><p className="text-sm font-medium">{step.label}</p><p className="text-xs text-muted-foreground">{step.description}</p></div>
                </div>
                {index < steps.length - 1 && <div className="w-16 h-px bg-muted mx-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 space-y-6">
            {currentStep === "platforms" && <PlatformToggles selectedPlatforms={selectedPlatforms} onPlatformToggle={handlePlatformToggle} />}
            {currentStep === "content" && (
              <div className="space-y-6">
                <VideoUpload onVideoSelect={handleVideoSelect} selectedVideo={selectedVideo} selectedPlatforms={selectedPlatforms} />
                {selectedPlatforms.length > 0 && <DynamicFields selectedPlatforms={selectedPlatforms} requiredFields={requiredFields} register={register} errors={errors} watch={watch} />}
              </div>
            )}
            {currentStep === "review" && <FieldReferenceTable />}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => {
                if (currentStep === "content") setCurrentStep("platforms");
                if (currentStep === "review") setCurrentStep("content");
              }} disabled={currentStep === "platforms"}>Previous</Button>
              <Button onClick={() => {
                if (currentStep === "platforms") setCurrentStep("content");
                else if (currentStep === "content") setCurrentStep("review");
                else handleSubmit(onSubmit)();
              }} disabled={currentStep === "review" || selectedPlatforms.length === 0}>
                {currentStep === "review" ? "Publish" : "Next"}
              </Button>
            </div>
          </div>
          <div className="xl:col-span-1">
            <SummaryPanel selectedPlatforms={selectedPlatforms} formData={formData} errors={errors} onSubmit={handleSubmit(onSubmit)} isSubmitting={isSubmitting} />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
