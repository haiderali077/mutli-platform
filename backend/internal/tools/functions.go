package tools

import (
	"fmt"
	"sync"

	youtube "github.com/haiderali077/mutli-platform/uploads/youtube"
	reddit "github.com/haiderali077/mutli-platform/uploads/reddit"
)

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
	case "reddit":
		subreddit := getString(body, "sr")
		postType := getString(body, "kind")
		title := getString(body, "title")
		resubmit := body["resubmit"].(bool)
		nsfw := body["nsfw"].(bool)
		var text, urlStr string
		if postType == "self" {
			text = getString(body, "text")
		}
		if postType == "link" || postType == "image" {
			urlStr = getString(body, "url")
		}
		reddit.UploadReddit(subreddit, postType, title, text, urlStr, resubmit, nsfw)
	}
	wg.Done()
}

func getString(body map[string]interface{}, key string) string {
	if val, ok := body[key]; ok && val != nil {
		if str, ok := val.(string); ok {
			return str
		}
	}
	return ""
}
