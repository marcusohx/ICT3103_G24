pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building..'
      }
    }

    stage('Test') {
      parallel {
        stage('Test') {
          steps {
            echo 'Testing..'
          }
        }

        stage('OWASP Dependency-Check Vulnerabilities') {
          steps {
            echo 'yes'
          }
        }

      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploying.....'
      }
    }

  }
}