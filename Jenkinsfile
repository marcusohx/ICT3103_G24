pipeline {
  agent any
  parameters {
      booleanParam(name: 'Refresh',
                  defaultValue: false,
                  description: 'Read Jenkinsfile and exit.')
  }

  // Jenkins Stages
  stages {
    // Checks Jenkinsfile for update, refresh if there is
    stage('Read Jenkinsfile') {
            when {
                expression { return parameters.Refresh == true }
            }
            steps {
                echo("Ended pipeline early.")        
            }
        }

    // Run Jenkinsfile
    stage('Run Jenkinsfile') {
      when {
        expression { return parameters.Refresh == false }
      }
      steps {
        echo 'Running Jenkinsfile... Building...'
      }
    }

    // Check for vulnerabilities in git repo against OWASP
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

    // Deployment placeholder
    stage('Deploy') {
      steps {
        echo 'Deploying.....'
      }
    }

      
  }
}
