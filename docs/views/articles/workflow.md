# 介绍

::: tip 

项目太多了，每次部署的时候都要配置Jenkins命令，而且还分为多个环境。

环境项目切来切去，常在河边走，哪有不湿鞋，心智负担太大了

有没有好的办法呢？

:::

之前做过的npm私有仓库给了我灵感

### 从npm私有仓库开始

每次安装依赖都从公网下载，速度太慢了，所以搭建了私有仓库

首次下载依赖的时候从公网下到私有仓库，再次下载的时候优先走私有仓库

这时候就需要设置仓库源

但是呢，想到每个人都要在自己电脑上配置环境变量，太麻烦了

于是呢，在一次午睡中，我想到了方案

在项目中用.npmrc文件约定这个项目走哪个仓库，这样的话电脑上不需要任何配置，项目可以很灵活的切换仓库

jenkinsfile就这样派上用场了

### jenkinsfile

在jenkin流水线配置仓库和分支

拉取代码后从代码中读取jenkinsfile

将部署流程写到jenkinsfile内部

#### 环境变量

```Groovy
    // 环境变量
    environment {
        NAME = 'main'
        DESC = '重大学工-统一门户'
        REPO = 'http://project.gitlab.work.java/zpgs/cqu/frontend/xg/main.git'
        CREDENTIALS = '15a91c1c-c390-40e8-a47e-9ee84c164ad4'
    }

```
#### 第一步 初始化
```Groovy
  stage('Init') {
    steps {
      script{
          // 获取当前分支 remotes/origin/dev
          FULL_PATH_BRANCH = "${sh(script:'git symbolic-ref -q --short HEAD || git name-rev --name-only HEAD', returnStdout: true)}"
          // 获取分支 dev
          GIT_BRANCH = FULL_PATH_BRANCH.substring(FULL_PATH_BRANCH.lastIndexOf('/') + 1, FULL_PATH_BRANCH.length())
          // 【开发环境】变量 
          if ( "${GIT_BRANCH}" =~ "dev.*" ) {
            echo '===================✅ dev环境 ✅==================='
            ENVIRONMENT_DESC = 'dev-45'
            NPM_COMMAND = 'npm run build:dev'
          }
      }
    }
  }

```

#### 第二步 npm打包

```Groovy
  stage('npm打包') {
    steps {
      nodejs('nodeJs14') {
        script{
          sh 'yarn'
          sh NPM_COMMAND // 使用变量的打包命令，根据环境切换
        }
      }
    }             
  }
```
#### 第三步 部署

```Groovy
  stage('Deploy') {
    steps {
      sshPublisher(
        publishers: [
          sshPublisherDesc(
            configName: "${ENVIRONMENT_DESC}",
            transfers: [
              sshTransfer(
                cleanRemote: false, 
                excludes: '', 
                execCommand: '''#!/bin/sh
                            cp -rf temp/web/portal/**  /usr/local/nginx/html/portal''', // 将远程目录移动到当前部署目录
                execTimeout: 120000, 
                flatten: false, 
                makeEmptyDirs: false, 
                noDefaultExcludes: false, 
                patternSeparator: '[, ]+', 
                remoteDirectory: 'temp/web/portal', // 远程目录
                remoteDirectorySDF: false, 
                removePrefix: 'dist/', 
                sourceFiles: 'dist/**'
              )
            ], 
            usePromotionTimestamp: false, 
            useWorkspaceInPromotion: false, 
            verbose: false
          )
        ]
      )
    }
  }
```

这篇写的差强人意，看代码吧