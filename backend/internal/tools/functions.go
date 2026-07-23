package tools

import (
	"fmt"
	"sync"

	instagram "github.com/haiderali077/mutli-platform/uploads/instagram"
	pinterest "github.com/haiderali077/mutli-platform/uploads/pintrest"
	youtube "github.com/haiderali077/mutli-platform/uploads/youtube"
	reddit "github.com/haiderali077/mutli-platform/uploads/reddit"
)

func (y YouTubeUploader) BuildAPI() map[string]interface{} {
	return map[string]interface{}{
		"access_token": y.AccessToken, "platform_name": y.PlatformName,
		"title": y.Title, "description": y.Description,
		"tags": y.Tags, "category_id": y.CategoryID,
		"privacy_status": y.PrivacyStatus, "media_file": y.MediaFile,
	}
}

func (i InstagramUploader) BuildAPI() map[string]interface{} {
	return map[string]interface{}{
		"access_token": i.AccessToken, "platform_name": i.PlatformName,
		"image_url": i.ImageURL, "caption": i.Caption, "user_tags": i.UserTags,
	}
}

func (p PinterestUploader) BuildAPI() map[string]interface{} {
	return map[string]interface{}{
		"access_token": p.AccessToken, "platform_name": p.PlatformName,
		"title": p.Title, "description": p.Description,
		"link": p.Link, "media_source": map[string]interface{}{
			"source_type": p.SourceType, "url": p.ImageURL,
		},
	}
}

func (r RedditUploader) BuildAPI() map[string]interface{} {
	body := map[string]interface{}{
		"access_token": r.AccessToken, "platform_name": r.PlatformName,
		"sr": r.Subreddit, "kind": r.PostType,
		"title": r.Title, "resubmit": r.Resubmit, "nsfw": r.NSFW,
	}
	if r.PostType == "self" { body["text"] = r.Text }
	if r.PostType == "link" || r.PostType == "image" { body["url"] = r.URL }
	return body
}

func SendAPI(u UploadContent, wg *sync.WaitGroup) {
	body := u.BuildAPI()
	platform := body["platform_name"]

	switch platform {
	case "youtube":
		title := getString(body, "title")
		description := getString(body, "description")
		category := getString(body, "category_id")
		privacy := getString(body, "privacy_status")
		filename := getString(body, "media_file")
		tags := getString(body, "tags")
		if filename != "" && filename != "blank" {
			youtube.UploadYoutube(title, description, category, privacy, filename, tags)
		}
	case "instagram":
		imageURL := getString(body, "image_url")
		caption := getString(body, "caption")
		userTags := getString(body, "user_tags")
		instagram.UploadInstagram(imageURL, caption, userTags)
	case "pinterest":
		title := body["title"].(string)
		description := body["description"].(string)
		sourceType := body["media_source"].(map[string]interface{})["source_type"].(string)
		imageURL := body["media_source"].(map[string]interface{})["url"].(string)
		pinterest.UploadPinterest(title, description, imageURL, sourceType, imageURL)
	case "reddit":
		subreddit := getString(body, "sr")
		postType := getString(body, "kind")
		title := getString(body, "title")
		resubmit := body["resubmit"].(bool)
		nsfw := body["nsfw"].(bool)
		var text, urlStr string
		if postType == "self" { text = getString(body, "text") }
		if postType == "link" || postType == "image" { urlStr = getString(body, "url") }
		reddit.UploadReddit(subreddit, postType, title, text, urlStr, resubmit, nsfw)
	}
	wg.Done()
}

func getString(body map[string]interface{}, key string) string {
	if val, ok := body[key]; ok && val != nil {
		if str, ok := val.(string); ok { return str }
	}
	return ""
}
