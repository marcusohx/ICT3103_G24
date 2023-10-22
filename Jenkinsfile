pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main', changelog: false, poll: false, url: 'https://github.com/marcusohx/ICT3103_G24.git'
            }
        }
        
        // Check for vulnerabilities in git repo against OWASP
        stage('OWASP Dependency-Check') {
            steps {
                dependencyCheck additionalArguments: '--format HTML', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'
            }
        }
    }
}
