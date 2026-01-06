package tools

type YouTubeUploader struct {
	AccessToken   string
	PlatformName  string
	Title         string
	Description   string
	Tags          []string
	CategoryID    string
	PrivacyStatus string
	MediaFile     string
}

type InstagramUploader struct {
	AccessToken  string
	PlatformName string
	ImageURL     string
	Caption      string
	LocationID   string
	UserTags     string
}

type PinterestUploader struct {
	AccessToken  string
	PlatformName string
	BoardID      string
	Title        string
	Description  string
	Link         string
	SourceType   string
	ImageURL     string
}

type RedditUploader struct {
	AccessToken  string
	PlatformName string
	Subreddit    string
	PostType     string
	Title        string
	Text         string
	URL          string
	Resubmit     bool
	NSFW         bool
}

type LinkedInUploader struct {
	AccessToken    string
	PlatformName   string
	Author         string
	LifecycleState string
	Text           string
	MediaType      string
	MediaStatus    string
	MediaPath      string
	Visibility     string
}

type UploadContent interface {
	BuildAPI() map[string]interface{}
}
