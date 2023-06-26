pipeline {
  agent any

  environment {
        GIT_NAME = "countup"
        NAMESPACE = "@eeacms"
        DEPENDENCIES = ""
       
    }

  stages {

    stage('Release') {
      when {
        allOf {
          environment name: 'CHANGE_ID', value: ''
          branch 'master'
        }
      }
      steps {
        node(label: 'docker') {
          withCredentials([string(credentialsId: 'eea-jenkins-token', variable: 'GITHUB_TOKEN'),string(credentialsId: 'eea-jenkins-npm-token', variable: 'NPM_TOKEN')]) {
            sh '''docker pull eeacms/gitflow'''
            sh '''docker run -i --rm --name="$BUILD_TAG-gitflow-master" -e GIT_BRANCH="$BRANCH_NAME" -e GIT_NAME="$GIT_NAME" -e GIT_TOKEN="$GITHUB_TOKEN" -e NPM_TOKEN="$NPM_TOKEN" -e LANGUAGE=javascript eeacms/gitflow'''
          }
        }
      }
    }

    stage('Code') {
      when {
        allOf {
          environment name: 'CHANGE_ID', value: ''
          not { changelog '.*^Automated release [0-9\\.]+$' }
          not { branch 'master' }
        }
      }
      steps {
        parallel(

          "ES lint": {
            node(label: 'docker') {
              sh '''docker run -i --rm --name="$BUILD_TAG-eslint" -e NAMESPACE="$NAMESPACE" -e GIT_NAME=$GIT_NAME -e GIT_BRANCH="$BRANCH_NAME" -e GIT_CHANGE_ID="$CHANGE_ID"  eslint'''
            }
          },

          "Style lint": {
            node(label: 'docker') {
              sh '''docker run -i --rm --name="$BUILD_TAG-stylelint" -e NAMESPACE="$NAMESPACE" -e GIT_NAME=$GIT_NAME -e GIT_BRANCH="$BRANCH_NAME" -e GIT_CHANGE_ID="$CHANGE_ID"   stylelint'''
            }
          },

          "Prettier": {
            node(label: 'docker') {
              sh '''docker run -i --rm --name="$BUILD_TAG-prettier" -e NAMESPACE="$NAMESPACE" -e GIT_NAME=$GIT_NAME -e GIT_BRANCH="$BRANCH_NAME" -e GIT_CHANGE_ID="$CHANGE_ID prettier'''
            }
          }
        )
      }
    }

  
 
 
    stage('Pull Request') {
      when {
        not {
          environment name: 'CHANGE_ID', value: ''
        }
        environment name: 'CHANGE_TARGET', value: 'master'
      }
      steps {
        node(label: 'docker') {
          script {
            if ( env.CHANGE_BRANCH != "develop" ) {
                error "Pipeline aborted due to PR not made from develop branch"
            }
           withCredentials([string(credentialsId: 'eea-jenkins-token', variable: 'GITHUB_TOKEN')]) {
            sh '''docker pull eeacms/gitflow'''
            sh '''docker run -i --rm --name="$BUILD_TAG-gitflow-pr" -e GIT_CHANGE_TARGET="$CHANGE_TARGET" -e GIT_CHANGE_BRANCH="$CHANGE_BRANCH" -e GIT_CHANGE_AUTHOR="$CHANGE_AUTHOR" -e GIT_CHANGE_TITLE="$CHANGE_TITLE" -e GIT_TOKEN="$GITHUB_TOKEN" -e GIT_BRANCH="$BRANCH_NAME" -e GIT_CHANGE_ID="$CHANGE_ID" -e GIT_ORG="$GIT_ORG" -e GIT_NAME="$GIT_NAME" -e LANGUAGE=javascript eeacms/gitflow'''
           }
          }
        }
      }
    }

  }

  post {
    always {
      cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, deleteDirs: true)
    }
    changed {
      script {
        def details = """<h1>${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - ${currentBuild.currentResult}</h1>
                         <p>Check console output at <a href="${env.BUILD_URL}/display/redirect">${env.JOB_BASE_NAME} - #${env.BUILD_NUMBER}</a></p>
                      """
        emailext(
        subject: '$DEFAULT_SUBJECT',
        body: details,
        attachLog: true,
        compressLog: true,
        recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'CulpritsRecipientProvider']]
        )
      }
    }
  }
}