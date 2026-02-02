"use client";

import { Platform } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  selectedPlatforms: Platform[];
  requiredFields: string[];
}

export function DynamicFields({ selectedPlatforms, requiredFields }: Props) {
  const hasPlatform = (p: Platform) => selectedPlatforms.includes(p);
  return (
    <Card>
      <CardHeader><CardTitle>Platform Details</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        {hasPlatform("youtube") && (
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">YouTube</h3>
            <div className="space-y-3">
              <div><label className="text-sm font-medium">Title</label><input className="w-full border rounded px-3 py-2 mt-1" placeholder="Video title" /></div>
              <div><label className="text-sm font-medium">Description</label><textarea className="w-full border rounded px-3 py-2 mt-1" rows={3} placeholder="Video description" /></div>
              <div><label className="text-sm font-medium">Tags</label><input className="w-full border rounded px-3 py-2 mt-1" placeholder="tag1, tag2, tag3" /></div>
            </div>
          </div>
        )}
        {hasPlatform("instagram") && (
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Instagram</h3>
            <div className="space-y-3">
              <div><label className="text-sm font-medium">Caption</label><textarea className="w-full border rounded px-3 py-2 mt-1" rows={2} placeholder="Post caption" /></div>
            </div>
          </div>
        )}
        {hasPlatform("reddit") && (
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Reddit</h3>
            <div className="space-y-3">
              <div><label className="text-sm font-medium">Subreddit</label><input className="w-full border rounded px-3 py-2 mt-1" placeholder="e.g. webdev" /></div>
              <div><label className="text-sm font-medium">Title</label><input className="w-full border rounded px-3 py-2 mt-1" placeholder="Post title" /></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
