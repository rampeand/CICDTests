pipeline {
    environment {
        registry = "rampeand/docker-test"
        registryCredential = 'dockerhub'
    }

    agent none
    
    stages {
        stage('Stop containers') {
            agent {
                 label 'master'
            }
            steps {
                sh 'docker stop cicdtest'
                sh 'docker rm cicdtest'
                sh 'docker rmi cicd_image'
            }
        }

        stage('Run tests') {
            agent {
                docker {
                    image 'node:10-alpine'
                    args '-p 3000:3000'
                }
            }   
            steps {
                checkout scm
                sh 'npm install mocha'
                sh 'npm test'
            }
        }
        stage('Build & run container') {
             agent {
                 label 'master'
             }
             steps {   
                checkout scm
                sh 'docker build -t cicd_image .'
                sh 'docker run --name cicdtest -d -p 3000:3000 cicd_image'
            }
        }
        stage('Building image for registry') {
            steps{
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }
        stage('Deploying image to registry') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }
        stage('Remove unused docker image') {
            agent {
                 label 'master'
             }
            steps{
                sh "docker rmi $registry:$BUILD_NUMBER"
            }
        }
    }
}