FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    time \
    rustc \
    cargo \
    ca-certificates \
    curl \
    wget \
    unzip \
    gnupg \
    python3 \
    openjdk-21-jdk \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install Node.js 24
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install global NPM packages including esbuild
RUN npm install -g --no-save typescript ts-node @types/node@20 esbuild \
    && npm cache clean --force

# Install Kotlin
RUN wget -q https://github.com/JetBrains/kotlin/releases/download/v1.9.23/kotlin-compiler-1.9.23.zip \
    && unzip -q kotlin-compiler-1.9.23.zip -d /opt \
    && rm kotlin-compiler-1.9.23.zip \
    && ln -s /opt/kotlinc/bin/kotlin /usr/local/bin/kotlin \
    && ln -s /opt/kotlinc/bin/kotlinc /usr/local/bin/kotlinc

WORKDIR /workspace