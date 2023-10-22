pipeline {
  agent any
  parameters {
      booleanParam(name: 'Refresh',
                  defaultValue: false,
                  description: 'Read Jenkinsfile and exit.')
  }
  stages {
    stage('Read Jenkinsfile') {
            when {
                expression { return parameters.Refresh == true }
            }
            steps {
                echo("Ended pipeline early.")        
            }
        }
    stage('Run Jenkinsfile') {
      when {
        expression { return parameters.Refresh == false }
      }
      steps {
        echo 'Building..'
      }
      stage('OWASP Dependency-Check Vulnerabilities') {
        steps {
          dependencyCheck additionalArguments: ''' 
                      -o './'
                      -s './'
                      -f 'ALL' 
                      --prettyPrint''', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'
          
          dependencyCheckPublisher pattern: 'dependency-check-report.xml'
        }
      }
      stage('Deploy') {
        steps {
          echo 'Deploying.....'
        }
      }

      
    }
  }
}
