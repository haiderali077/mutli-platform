package api

import (
	"encoding/json"
	"net/http"
)

type Error struct {
	Code    int
	Message string
}

type TotalFields struct {
	Platforms     []string `json:"platforms"`
	Title         string   `json:"title"`
	Description   string   `json:"description"`
	Caption       string   `json:"caption"`
	MediaFile     string   `json:"media_file"`
	PrivacyStatus string   `json:"privacy_status"`
	CategoryID    string   `json:"category_id"`
	Tags          []string `json:"tags"`
	ImageURL      string   `json:"image_url"`
	LocationID    string   `json:"location_id"`
	UserTags      string   `json:"user_tags"`
	BoardID       string   `json:"board_id"`
	Link          string   `json:"link"`
	SourceType    string   `json:"source_type"`
	Subreddit     string   `json:"subreddit"`
	PostType      string   `json:"post_type"`
	Text          string   `json:"text"`
	URL           string   `json:"url"`
	Resubmit      bool     `json:"resubmit"`
	NSFW          bool     `json:"nsfw"`
	Author        string   `json:"author"`
	LifecycleState string  `json:"lifecycle_state"`
	TextLinkedIn  string   `json:"text_linkedin"`
	MediaType     string   `json:"media_type"`
	MediaStatus   string   `json:"media_status"`
	MediaPath     string   `json:"media_path"`
	Visibility    string   `json:"visibility"`
}

func writeError(w http.ResponseWriter, message string, code int) {
	resp := Error{Code: code, Message: message}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(resp)
}

var (
	HandleRequestError = func(w http.ResponseWriter, err error) {
		writeError(w, err.Error(), http.StatusBadRequest)
	}
	HandleInternalError = func(w http.ResponseWriter) {
		writeError(w, "An Unexpected Error Occurred", http.StatusInternalServerError)
	}
)
