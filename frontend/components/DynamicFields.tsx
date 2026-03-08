"use client";

import { Platform } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

interface Props {
  selectedPlatforms: Platform[];
  requiredFields: string[];
  register: any;
  errors: any;
  watch: any;
}

const privacyOptions = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
  { value: "unlisted", label: "Unlisted" },
];

export function DynamicFields({ selectedPlatforms, requiredFields, register, errors, watch }: Props) {
  const hasPlatform = (p: Platform) => selectedPlatforms.includes(p);
  const postType = watch("post_type");

  return (
    <Card>
      <CardHeader><CardTitle>Platform Details</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        {hasPlatform("youtube") && (
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-red-600">YouTube</h3>
            <Input placeholder="Video title" {...register("title")} />
            <Textarea placeholder="Video description" rows={3} {...register("description")} />
            <Input placeholder="Tags (comma separated)" {...register("tags")} />
            <Select options={privacyOptions} {...register("privacy_status")} />
            <Input placeholder="Category ID" {...register("category_id")} />
          </div>
        )}
        {hasPlatform("instagram") && (
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-pink-600">Instagram</h3>
            <Textarea placeholder="Caption" rows={2} {...register("caption")} />
            <Input placeholder="Location ID (optional)" {...register("location_id")} />
            <Input placeholder="User tags (optional)" {...register("user_tags")} />
          </div>
        )}
        {hasPlatform("pinterest") && (
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-red-600">Pinterest</h3>
            <Input placeholder="Pin title" {...register("title")} />
            <Textarea placeholder="Pin description" rows={2} {...register("description")} />
            <Input placeholder="Board ID" {...register("board_id")} />
            <Select options={[{ value: "image_url", label: "Image URL" }, { value: "image_base64", label: "Base64" }]} {...register("source_type")} />
          </div>
        )}
        {hasPlatform("reddit") && (
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-orange-600">Reddit</h3>
            <Input placeholder="Subreddit" {...register("subreddit")} />
            <Select options={[{ value: "self", label: "Text Post" }, { value: "link", label: "Link Post" }, { value: "image", label: "Image Post" }]} {...register("post_type")} />
            <Input placeholder="Post title" {...register("title")} />
            {postType === "self" && <Textarea placeholder="Post text" rows={4} {...register("text")} />}
            {(postType === "link" || postType === "image") && <Input placeholder="URL" {...register("url")} />}
          </div>
        )}
        {hasPlatform("linkedin") && (
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-blue-600">LinkedIn</h3>
            <Input placeholder="Author URN" {...register("author")} />
            <Textarea placeholder="Post text" rows={3} {...register("text_linkedin")} />
            <Select options={[{ value: "PUBLIC", label: "Public" }, { value: "CONNECTIONS", label: "Connections Only" }]} {...register("visibility")} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
