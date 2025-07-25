pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_CRED_ID = 'docker-ci-fullstack'
        ZSCALER_CERT_ID = 'zscaler_root.crt'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/nullneo/docker-ci-fullstack.git', branch: 'master'
            }
        }

        stage('Backend: Install & Test') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm test || true'
                }
            }
        }

        stage('Frontend: Install & Test') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm test || true'
                }
            }
        }

        stage('Docker Build') {
            steps {
                withCredentials([file(credentialsId: env.ZSCALER_CERT_ID, variable: 'ZSCALER_CERT_PATH')]) {
                    // Копируем сертификат во временную папку билд-контекста
                    sh '''
                        cp $ZSCALER_CERT_PATH ./jenkins/zscaler_root.crt
                        docker build -t my-backend ./backend
                        docker build -t my-frontend ./frontend
                        # Сертификат больше не нужен - удаляем для чистоты
                        rm -f ./jenkins/zscaler_root.crt
                    '''
                }
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: env.DOCKER_CRED_ID, usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                        echo $PASS | docker login -u $USER --password-stdin
                        docker tag my-backend $USER/my-backend:latest
                        docker tag my-frontend $USER/my-frontend:latest
                        docker push $USER/my-backend:latest
                        docker push $USER/my-frontend:latest
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker compose pull
                    docker compose up -d
                '''
            }
        }
    }

    post {
        always {
            // Чистим сертификат на случай, если упало между этапами
            sh 'rm -f ./jenkins/zscaler_root.crt || true'
        }
    }
}