export type Platform = "youtube" | "instagram" | "pinterest" | "reddit" | "linkedin";

export interface FormData {
  title?: string;
  description?: string;
  caption?: string;
  tags?: string[];
  privacy_status?: string;
  category_id?: string;
  image_url?: string;
  location_id?: string;
  user_tags?: string;
  board_id?: string;
  link?: string;
  source_type?: string;
  subreddit?: string;
  post_type?: string;
  text?: string;
  url?: string;
  resubmit?: boolean;
  nsfw?: boolean;
  author?: string;
  lifecycle_state?: string;
  text_linkedin?: string;
  media_type?: string;
  media_status?: string;
  media_path?: string;
  visibility?: string;
}
