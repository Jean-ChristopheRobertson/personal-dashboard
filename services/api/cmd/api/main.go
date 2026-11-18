package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync/atomic"
	"time"
)

var startedAt = time.Now()
var requests atomic.Uint64

type summary struct {
	Status  string `json:"status"`
	Service string `json:"service"`
	Message string `json:"message"`
}

func main() {
	addr := ":" + envOr("PORT", "8080")
	server := &http.Server{
		Addr:              addr,
		Handler:           newHandler(),
		ReadHeaderTimeout: 5 * time.Second,
	}
	log.Printf("API listening on %s", addr)
	log.Fatal(server.ListenAndServe())
}

func newHandler() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok\n"))
	})
	mux.HandleFunc("GET /api/v1/summary", func(w http.ResponseWriter, _ *http.Request) {
		writeJSON(w, http.StatusOK, summary{
			Status:  "ok",
			Service: "personal-dashboard-api",
			Message: "API scaffold is running; dashboard data endpoints are coming next.",
		})
	})
	mux.HandleFunc("GET /metrics", func(w http.ResponseWriter, _ *http.Request) {
		w.Header().Set("Content-Type", "text/plain; version=0.0.4; charset=utf-8")
		_, _ = fmt.Fprintf(w, "# HELP dashboard_api_requests_total Total HTTP requests handled.\n# TYPE dashboard_api_requests_total counter\ndashboard_api_requests_total %d\n# HELP dashboard_api_uptime_seconds API process uptime in seconds.\n# TYPE dashboard_api_uptime_seconds gauge\ndashboard_api_uptime_seconds %d\n", requests.Load(), int64(time.Since(startedAt).Seconds()))
	})

	return countRequests(mux)
}

func countRequests(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requests.Add(1)
		next.ServeHTTP(w, r)
	})
}

func writeJSON(w http.ResponseWriter, status int, value any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(value); err != nil {
		log.Printf("encode response: %v", err)
	}
}

func envOr(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
