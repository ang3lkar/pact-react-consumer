pipeline {
  tools {
       nodejs "10.15.0"
   }
  agent { label 'core-builder' }
  options {
    buildDiscarder(logRotator(numToKeepStr: '10', daysToKeepStr: '10'))
    disableConcurrentBuilds()
  }

  parameters {
    string(name: 'BRANCH_NAME', defaultValue: 'master', description: 'branch')
  }

  stages {
    stage('Environment') {
      steps {
        script {
          sh 'printenv'
        }
      }
    }
    stage('Checkout') {
      steps {
        ansiColor(colorMapName: 'xterm') {
          checkout scm
        }
      }
    }
    stage('Npm Install') {
      steps {
        script {
          sh 'npm install'
        }
      }
    }
    stage('Contract Tests') {
      steps {
        script {
          echo "Running contract tests"
          sh "npm run test:pact"
        }
      }
    }
    stage('Publish') {
      steps {
        script {
          echo "Publishing results to Pact Broker"
          sh "npm run publish:pact"
        }
      }
    }
  }
}
