FROM debian:bookworm-slim AS kotlin-builder
RUN apt-get update && apt-get install -y --no-install-recommends wget unzip ca-certificates \
    && wget -q https://github.com/JetBrains/kotlin/releases/download/v1.9.23/kotlin-compiler-1.9.23.zip \
    && unzip -q kotlin-compiler-1.9.23.zip -d /opt \
    && rm kotlin-compiler-1.9.23.zip

FROM python:3.12-slim-bookworm AS python-builder

FROM node:22-bookworm-slim AS node-builder

FROM debian:bookworm-slim
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    time \
    rustc \
    cargo \
    ca-certificates \
    curl \
    gnupg \
    libssl3 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY --from=python-builder /usr/local/lib/python3.12 /usr/local/lib/python3.12
COPY --from=python-builder /usr/local/bin/python3.12 /usr/local/bin/python3.12
COPY --from=python-builder /usr/local/bin/python3 /usr/local/bin/python3
COPY --from=python-builder /usr/local/bin/pip3.12 /usr/local/bin/pip3.12
COPY --from=python-builder /usr/local/lib/libpython3.12* /usr/local/lib/
RUN ldconfig && ln -sf /usr/local/bin/python3.12 /usr/local/bin/python

COPY --from=node-builder /usr/local/bin/node /usr/local/bin/node
COPY --from=node-builder /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -sf /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
    && ln -sf /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx \
    && npm install -g --no-save typescript ts-node \
    && npm cache clean --force

RUN mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://packages.adoptium.net/artifactory/api/gpg/key/public -o /etc/apt/keyrings/adoptium.asc \
    && echo "deb [signed-by=/etc/apt/keyrings/adoptium.asc] https://packages.adoptium.net/artifactory/deb $(. /etc/os-release; echo $VERSION_CODENAME) main" \
    > /etc/apt/sources.list.d/adoptium.list \
    && apt-get update && apt-get install -y --no-install-recommends temurin-21-jdk \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY --from=kotlin-builder /opt/kotlinc /opt/kotlinc
RUN ln -s /opt/kotlinc/bin/kotlin /usr/local/bin/kotlin \
    && ln -s /opt/kotlinc/bin/kotlinc /usr/local/bin/kotlinc

WORKDIR /workspace