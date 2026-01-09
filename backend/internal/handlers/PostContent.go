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

	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		api.HandleRequestError(w, err)
		return
	}

	uploads, err := BuildUploadStructs(params)
	if err != nil {
		api.HandleInternalError(w)
		return
	}

	for _, v := range uploads {
		wg.Add(1)
		go tools.SendAPI(v, &wg)
	}
	wg.Wait()

	response := map[string]interface{}{
		"success":   true,
		"message":   "Content uploaded successfully",
		"platforms": params.Platforms,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
