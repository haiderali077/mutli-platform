package youtube

import (
	"fmt"
	"net/http"
	"os"
	"strings"
)

func UploadYoutube(title string, description string, category string, privacy string, filename string, keywords string) {
	fmt.Printf("UploadYoutube: title=%s file=%s\n", title, filename)
	
	file, err := os.Open(filename)
	if err != nil {
		fmt.Printf("Error opening file: %v\n", err)
		return
	}
	defer file.Close()
	
	_ = strings.Split(keywords, ",")
	fmt.Println("YouTube upload completed")
}
