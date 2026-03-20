package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"

	"github.com/haiderali077/mutli-platform/api"
	"github.com/haiderali077/mutli-platform/internal/tools"
)

var wg = sync.WaitGroup{}

func PostContent(w http.ResponseWriter, r *http.Request) {
	var params = api.TotalFields{}
	if err := json.NewDecoder(r.Body).Decode(&params); err != nil {
		api.HandleRequestError(w, err)
		return
	}
	uploads, err := BuildUploadStructs(params)
	if err != nil {
		api.HandleInternalError(w)
		return
	}
	for _, upload := range uploads {
		wg.Add(1)
		go tools.SendAPI(upload, &wg)
	}
	wg.Wait()
	fmt.Println("All uploads completed")

	response := map[string]interface{}{
		"success": true, "message": "Content uploaded successfully",
		"platforms": params.Platforms,
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func BuildUploadStructs(params api.TotalFields) ([]tools.UploadContent, error) {
	var uploads []tools.UploadContent
	for _, p := range params.Platforms {
		switch p {
		case "youtube":
			uploads = append(uploads, tools.YouTubeUploader{
				AccessToken: "123", PlatformName: "youtube", Title: params.Title,
				Description: params.Description, Tags: params.Tags, CategoryID: params.CategoryID,
				PrivacyStatus: params.PrivacyStatus, MediaFile: params.MediaFile,
			})
		case "instagram":
			uploads = append(uploads, tools.InstagramUploader{
				AccessToken: "123", PlatformName: "instagram", ImageURL: params.ImageURL,
				Caption: params.Caption, LocationID: params.LocationID, UserTags: params.UserTags,
			})
		case "pinterest":
			uploads = append(uploads, tools.PinterestUploader{
				AccessToken: "123", PlatformName: "pinterest", BoardID: params.BoardID,
				Title: params.Title, Description: params.Description, Link: params.Link,
				SourceType: params.SourceType, ImageURL: params.ImageURL,
			})
		case "reddit":
			uploads = append(uploads, tools.RedditUploader{
				AccessToken: "123", PlatformName: "reddit", Subreddit: params.Subreddit,
				PostType: params.PostType, Title: params.Title, Text: params.Text,
				URL: params.URL, Resubmit: params.Resubmit, NSFW: params.NSFW,
			})
		case "linkedin":
			uploads = append(uploads, tools.LinkedInUploader{
				AccessToken: "123", PlatformName: "linkedin", Author: params.Author,
				LifecycleState: params.LifecycleState, Text: params.TextLinkedIn,
				MediaType: params.MediaType, MediaStatus: params.MediaStatus,
				MediaPath: params.MediaPath, Visibility: params.Visibility,
			})
		}
	}
	return uploads, nil
}
// Hotfix: ensure media_file is correctly passed through
