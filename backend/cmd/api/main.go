package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/haiderali077/mutli-platform/internal/handlers"
)

func main() {
	r := chi.NewRouter()
	handlers.Handler(r)

	fmt.Println("Server starting on :8000")
	http.ListenAndServe("localhost:8000", r)
}
