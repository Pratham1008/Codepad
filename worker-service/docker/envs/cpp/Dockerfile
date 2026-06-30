FROM alpine:latest

RUN apk add --no-cache gcc g++ make coreutils time


RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser
