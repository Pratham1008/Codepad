FROM eclipse-temurin:25-jdk-alpine

RUN apk add --no-cache coreutils time


RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser
