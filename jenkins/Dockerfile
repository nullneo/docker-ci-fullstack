FROM jenkins/jenkins:lts
USER root

# 1. Установим необходимые утилиты и lsb-release, ca-certificates, curl, gnupg2
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      lsb-release \
      ca-certificates \
      curl \
      gnupg2

# 2. Добавим GPG-ключ Docker и настроим репозиторий
RUN install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | \
    gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    chmod a+r /etc/apt/keyrings/docker.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" \
    > /etc/apt/sources.list.d/docker.list

# 3. Установим docker-ce-cli и compose-plugin
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      docker-ce-cli \
      docker-compose-plugin

# 4. Установим Node.js 22.x LTS + npm
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get update && \
    apt-get install -y --no-install-recommends nodejs

# 5. (Опционально) Удалим ненужное кэширование apt
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

USER jenkins