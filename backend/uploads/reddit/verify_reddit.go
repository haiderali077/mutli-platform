package reddit

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"
)

func UploadReddit(subreddit, postType, title, text, link string, resubmit, nsfw bool) {
	fmt.Printf("UploadReddit: r/%s kind=%s title=%s\n", subreddit, postType, title)
	
	data := url.Values{}
	data.Set("sr", subreddit)
	data.Set("kind", postType)
	data.Set("title", title)
	data.Set("resubmit", fmt.Sprintf("%v", resubmit))
	data.Set("nsfw", fmt.Sprintf("%v", nsfw))
	
	if postType == "self" {
		data.Set("text", text)
	} else if postType == "link" || postType == "image" {
		data.Set("url", link)
	}

	fmt.Printf("Reddit post payload: %+v\n", data)
}
