FROM jenkins/jenkins:lts
USER root

# Install lsb-release first
RUN apt-get update && \
    apt-get install -y --no-install-recommends lsb-release

# 1. Репозиторий + установка CLI
RUN echo "deb [arch=$(dpkg --print-architecture) \
           signed-by=/etc/apt/keyrings/docker.asc] \
           https://download.docker.com/linux/debian \
           $(lsb_release -cs) stable" \
    > /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends docker-ce-cli && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 2. Установим curl и nodejs LTS + npm
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl ca-certificates && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get update && \
    apt-get install -y --no-install-recommends nodejs && \
    rm -rf /var/lib/apt/lists/*

# 3. Установка Docker CLI и docker compose
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        lsb-release \
        gnupg2 \
        docker-compose-plugin

USER jenkins
