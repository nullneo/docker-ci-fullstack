FROM jenkins/jenkins:lts
USER root

# 1. Корневой сертификат прокси (остается без изменений)
COPY zscaler_root.crt /usr/local/share/ca-certificates/
RUN chmod 644 /usr/local/share/ca-certificates/zscaler_root.crt \
    && update-ca-certificates

# 2. Пакеты, каталог keyrings и ASCII-ключ Docker
RUN set -e; \
    apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates curl lsb-release && \
    install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg \
         -o /etc/apt/keyrings/docker.asc && \
    chmod a+r /etc/apt/keyrings/docker.asc

# 3. Репозиторий + установка CLI
RUN echo "deb [arch=$(dpkg --print-architecture) \
           signed-by=/etc/apt/keyrings/docker.asc] \
           https://download.docker.com/linux/debian \
           $(lsb_release -cs) stable" \
    > /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends docker-ce-cli && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 4. Добавляем CA в Java truststore
RUN keytool -importcert -trustcacerts -alias zscaler \
    -file /usr/local/share/ca-certificates/zscaler_root.crt \
    -keystore /opt/java/openjdk/lib/security/cacerts \
    -storepass changeit \
    -noprompt

# 5. Установим curl и nodejs LTS + npm
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl ca-certificates && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get update && \
    apt-get install -y --no-install-recommends nodejs && \
    rm -rf /var/lib/apt/lists/*

# 6. Установка Docker CLI и docker compose (современный способ!)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        lsb-release \
        gnupg2 \
        # compose-plugin
        docker-compose-plugin \
        # зависимости для Node.js
        build-essential \
        # для python-скриптов, если понадобится
        python3 python3-pip \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends docker-ce-cli \
    && rm -rf /var/lib/apt/lists/*

USER jenkins
