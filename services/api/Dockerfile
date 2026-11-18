FROM golang:1.26-alpine3.23 AS build
WORKDIR /src
COPY go.mod ./
COPY cmd/ ./cmd/
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /out/dashboard-api ./cmd/api

FROM scratch
COPY --from=build /out/dashboard-api /dashboard-api
EXPOSE 8080
USER 65532:65532
ENTRYPOINT ["/dashboard-api"]
