FROM eclipse-temurin:21-jdk-alpine

RUN apk add --no-cache coreutils time

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser
