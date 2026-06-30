FROM python:3.14-alpine

RUN apk add --no-cache coreutils time

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser
