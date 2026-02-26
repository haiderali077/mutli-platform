package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/haiderali077/mutli-platform/internal/handlers"
	log "github.com/sirupsen/logrus"
)

func main() {
	log.SetReportCaller(true)

	r := chi.NewRouter()
	handlers.Handler(r)

	fmt.Println("Starting API service on :8000")
	if err := http.ListenAndServe("localhost:8000", r); err != nil {
		log.Error(err)
	}
}
