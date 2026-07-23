package instagram

import (
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"bytes"
)

func UploadInstagram(imageURL string, caption string, userTags string) {
	fmt.Printf("UploadInstagram: caption=%s userTags=%s\n", caption, userTags)
	
	file, err := os.Open(imageURL)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}
	defer file.Close()

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	part, _ := writer.CreateFormFile("video", imageURL)
	io.Copy(part, file)
	writer.WriteField("title", caption)
	writer.WriteField("platform[]", "instagram")
	writer.Close()

	fmt.Println("Instagram upload payload built")
}
