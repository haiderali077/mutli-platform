package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Starting server on port 8000...")
	http.ListenAndServe("localhost:8000", nil)
}
