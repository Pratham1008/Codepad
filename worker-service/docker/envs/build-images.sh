#!/bin/bash
echo "Building Judge Environment Images..."

echo "Building C++ Environment (judge-cpp:latest)..."
docker build -t judge-cpp:latest cpp/

echo "Building Java Environment (judge-java:latest)..."
docker build -t judge-java:latest java/

echo "Building JavaScript Environment (judge-javascript:latest)..."
docker build -t judge-javascript:latest javascript/

echo "Building Python Environment (judge-python:latest)..."
docker build -t judge-python:latest python/

echo "All images built successfully!"
