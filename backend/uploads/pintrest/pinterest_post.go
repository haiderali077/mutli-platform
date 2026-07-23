package instagram

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
)

func UploadPinterest(title string, caption string, imagePath string, sourceType string, imageURL string) {
	fmt.Printf("UploadPinterest: title=%s sourceType=%s\n", title, sourceType)

	file, err := os.Open(imagePath)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}
	defer file.Close()

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	part, _ := writer.CreateFormFile("photos[]", imagePath)
	io.Copy(part, file)
	writer.WriteField("title", caption)
	writer.WriteField("platform[]", "pinterest")
	writer.WriteField("pinterest_title", title)
	writer.Close()

	fmt.Println("Pinterest upload payload built")
}
