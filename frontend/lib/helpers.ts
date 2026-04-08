import { z } from "zod";
import { Platform } from "./types";

const PLATFORM_FIELDS: Record<Platform, string[]> = {
  youtube: ["title", "description", "tags", "privacy_status", "category_id"],
  instagram: ["caption", "image_url", "user_tags"],
  pinterest: ["title", "description", "board_id", "source_type", "image_url"],
  reddit: ["subreddit", "post_type", "title"],
  linkedin: ["author", "text_linkedin", "visibility"],
};

export function getRequiredFields(platforms: Platform[]): string[] {
  const fields = platforms.flatMap(p => PLATFORM_FIELDS[p] || []);
  return [...new Set(fields)];
}

const baseSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  caption: z.string().optional(),
  tags: z.array(z.string()).optional(),
  privacy_status: z.string().optional(),
  category_id: z.string().optional(),
  image_url: z.string().optional(),
  location_id: z.string().optional(),
  user_tags: z.string().optional(),
  board_id: z.string().optional(),
  link: z.string().optional(),
  source_type: z.string().optional(),
  subreddit: z.string().optional(),
  post_type: z.string().optional(),
  text: z.string().optional(),
  url: z.string().optional(),
  resubmit: z.boolean().optional(),
  nsfw: z.boolean().optional(),
  author: z.string().optional(),
  lifecycle_state: z.string().optional(),
  text_linkedin: z.string().optional(),
  media_type: z.string().optional(),
  media_status: z.string().optional(),
  media_path: z.string().optional(),
  visibility: z.string().optional(),
});

export function buildZodSchema(requiredFields: string[], selectedPlatforms: Platform[]) {
  let schema = baseSchema;

  if (selectedPlatforms.includes("youtube")) {
    schema = schema.extend({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
    });
  }
  if (selectedPlatforms.includes("instagram")) {
    schema = schema.extend({
      caption: z.string().min(1, "Caption is required"),
    });
  }
  if (selectedPlatforms.includes("pinterest")) {
    schema = schema.extend({
      title: z.string().min(1, "Title is required"),
      board_id: z.string().min(1, "Board ID is required"),
    });
  }
  if (selectedPlatforms.includes("reddit")) {
    schema = schema.extend({
      subreddit: z.string().min(1, "Subreddit is required"),
      title: z.string().min(1, "Title is required"),
    });
  }
  if (selectedPlatforms.includes("linkedin")) {
    schema = schema.extend({
      author: z.string().min(1, "Author is required"),
      visibility: z.string().min(1, "Visibility is required"),
    });
  }

  return schema;
}
