pipeline {
    agent any

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
                sh 'docker build -t my-backend ./backend'
                sh 'docker build -t my-frontend ./frontend'
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-ci-fullstack', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                    sh 'docker tag my-backend $USER/my-backend:latest'
                    sh 'docker tag my-frontend $USER/my-frontend:latest'
                    sh 'docker push $USER/my-backend:latest'
                    sh 'docker push $USER/my-frontend:latest'
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