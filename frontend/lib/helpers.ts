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
