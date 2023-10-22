pipeline {
  agent any
  stages {
    stage('checkout scm') {
      steps {
        echo 'Building..'
      }
    }

    // Check for vulnerabilities in git repo against OWASP
    stage('OWASP Dependency-Check Vulnerabilities') {
      steps {
        // dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'
        // dependencyCheck additionalArguments: ''' 
        //             -o './'
        //             -s './'
        //             -f 'ALL' 
        //             --prettyPrint''', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'
        
        // dependencyCheckPublisher pattern: 'dependency-check-report.xml'
        dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'owasp'
        // dependencyCheck additionalArguments: '--scan target/', odcInstallation: 'owasp'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploying.....'
      }
    }

  }
}
