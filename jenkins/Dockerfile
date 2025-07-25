FROM jenkins/jenkins:lts
USER root

# 1. Копируем корпоративный сертификат (ФАЙЛ ДОЛЖЕН БЫТЬ В КОНТЕКСТЕ!)
COPY zscaler_root.crt /usr/local/share/ca-certificates/

# 2. Делаем сертификат доверенным для ОС
RUN chmod 644 /usr/local/share/ca-certificates/zscaler_root.crt && \
    update-ca-certificates

# 3. Установка нужных пакетов
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        lsb-release \
        gnupg \
        apt-transport-https

# 4. Каталог keyrings и скачивание Docker GPG key (УЖЕ РАБОТАЕТ ЧЕРЕЗ ПРОКСИ!)
RUN install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg \
         -o /etc/apt/keyrings/docker.asc && \
    chmod a+r /etc/apt/keyrings/docker.asc

# 5. Добавляем репозиторий Docker CE CLI и устанавливаем его
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends docker-ce-cli docker-compose-plugin && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 6. Установка nodejs LTS и npm
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get update && \
    apt-get install -y --no-install-recommends nodejs && \
    rm -rf /var/lib/apt/lists/*

USER jenkins