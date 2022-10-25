# 工具

## 脚手架

::: tip 简介

在实际项目中，主要是子应用的开发。

- 设想一下我们之前的做法：
- 1.从一个类似的子应用中拷贝代码到新项目中；
- 2.手动删除无用的代码；
- 3.更换新的子应用内部的一些配置
- 4.安装依赖，启动项目，然后报错...
- 5.又去检查项目

现在，我们有了脚手架工具
:::

*只需几步，便可构建一个崭新的子应用*

#### 安装

```bash
# 全局安装脚手架
$ npm install -g zove

# 控制台能打印出版本号就说明安装成功了
$ zove --version
```

#### 使用

```bash
# 构建项目 (例：学工-教职工)
$ zove create xg-staff

# 进入项目目录
$ cd xg-staff

# 安装依赖
$ yarn

# 启动项目

$ npm run dev
```

*OK，就是这么简单！*
