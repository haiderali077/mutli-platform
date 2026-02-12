"use client";

import { Platform } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  selectedPlatforms: Platform[];
  formData: any;
  errors: any;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export function SummaryPanel({ selectedPlatforms, formData, errors, onSubmit, isSubmitting }: Props) {
  const errorCount = Object.keys(errors).length;

  return (
    <Card>
      <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Platforms Selected</p>
          <p className="text-2xl font-bold">{selectedPlatforms.length}</p>
        </div>
        <div className="space-y-1">
          {selectedPlatforms.map(p => (
            <div key={p} className="text-sm capitalize px-2 py-1 bg-gray-100 rounded inline-block mr-1 mb-1">{p}</div>
          ))}
        </div>
        {errorCount > 0 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errorCount} validation {errorCount === 1 ? 'error' : 'errors'}</p>
          </div>
        )}
        <Button className="w-full" disabled={selectedPlatforms.length === 0 || isSubmitting} onClick={onSubmit}>
          {isSubmitting ? "Publishing..." : "Publish to All Platforms"}
        </Button>
      </CardContent>
    </Card>
  );
}
