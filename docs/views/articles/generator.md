# 介绍
<p align="left">
  <a href="https://github.com/tj/commander.js">
    <img src="https://img.shields.io/badge/commander-8.3.0-brightgreen" alt="commander">
  </a>
  <a href="https://github.com/SBoudrias/Inquirer.js">
    <img src="https://img.shields.io/badge/Inquirer-8.2.0-orange" alt="Inquirer">
  </a>
  <a href="https://github.com/metalsmith/metalsmith" rel="nofollow">
    <img src="https://img.shields.io/badge/metalsmith-2.5.0-blue" alt="metalsmith">
  </a>
  <a href="https://github.com/kevva/download" rel="nofollow">
    <img src="https://img.shields.io/badge/download-7.1.0-critical" alt="download">
  </a>
  <a href="https://github.com/tj/consolidate.js">
    <img src="https://img.shields.io/badge/consolidate-0.16.0-ff69b4" alt="consolidate">
  </a>
</p>

::: tip 

你一定在开发中遇到过这样的场景
- 1. 开发子应用的时候，每次要更换内部关于本应用的配置，但经常会漏掉一些
- 2. 子应用中公共的部分要改的时候，要同步到所有子应用
- 3. 创建新的子应用时，从另一个子应用复制过来，增删一些代码，相当繁琐

:::

## 功能
脚手架主要解决两个方面的痛点：
  1. 维护一套子应用模板，使得子应用迭代可控
  2. 生成项目的时候，根据用户输入，替换好所有变量

## 开发

脚手架的思路是：

  1.从仓库拉取模板代码

  2.遍历文件进行变量替换

基础的功能参考 👉 [从 0 构建自己的脚手架/CLI知识体系（万字） 🛠](https://juejin.cn/post/6966119324478079007#heading-1)

在此基础上，我们还需扩展一点功能，以支撑我们自己的业务

```
- 支持gitlab自建仓库
- 替换模板中的变量
```

### 支持gitlab自建仓库
这里我们需要用到 gitlab restful api，

-  👉 [获取gitlab某个组下的所有仓库列表](https://docs.gitlab.com/ee/api/groups.html#list-a-groups-projects)
-  👉 [获取gitlab某个项目的所有分支](https://docs.gitlab.com/ee/api/branches.html#list-repository-branches)

为请求到这两个接口，我们还需几步
```
生成token：

- 点击右上角个人信息，选择Preference，左边菜单就可以看到Access Token

- 选择所需的能力，生成token

配置：

- 将token配置到 zove/lib/utils/store

- 配置GitlabBaseUrl 和 GitlabGroupId，分别是gitlab的 【域名】 和 【分组id】

```
### 替换模板中的变量

这里主要用到[metalsmith](https://github.com/metalsmith/metalsmith)和[consolidate](https://github.com/tj/consolidate.js)这两个工具

递归地遍历下载好的模板，替换模板中匹配到的变量（ejs的语法，如：<%= var %>）

这样，我们在模板中想要更换的变量只用写到配置文件中，创建项目时根据询问填写即可


（*也有一种做法是从项目中读取配置文件，这就需要我们将配置文件写到项目中*）

## 使用到的插件

|  插件   | 描述  |
|  ----  | ----  |
| commander  | 命令行自定义指令 |
| inquirer  | 命令行询问用户问题，记录回答结果 |
| chalk  | 控制台输出内容样式美化 |
| ora  | 控制台 loading 样式 |
| figlet  | 控制台打印 logo |
| boxen  | 控制台打印特殊样式 |
| download  | 下载远程模板 |
| fs-extra  | 操作文件，支持promise |
| minimist  | 命令行参数解析 |
| leven  | 测量两字符串之间的差异 |
| metalsmith  | 静态网站生成器 |
| consolidate  | consolidate是一个模板引擎的结合体。包括了常用的jade和ejs |

传送门[脚手架](http://gitlab.work.java/frontend/template/zove)

## License

[MIT]()

Copyright (c) 2022-present Kane Xu