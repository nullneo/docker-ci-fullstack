pipeline {
    agent any

    environment {
        DOCKERHUB_USER = credentials('docker-ci-fullstack-user')
        DOCKERHUB_PASS = credentials('docker-ci-fullstack-pass')
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
                sh 'docker build -t aleksche/my-backend:latest ./backend'
                sh 'docker build -t aleksche/my-frontend:latest ./frontend'
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-ci-fullstack', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh "echo \$PASS | docker login -u \$USER --password-stdin"
                    sh 'docker push aleksche/my-backend:latest'
                    sh 'docker push aleksche/my-frontend:latest'
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
}