# 概述

::: tip 简介

使用编写好的.prettierrc.js文件，作为基础规范

配合VS Code插件[prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)使用
:::

```js
module.exports = {
  printWidth: 120, //单行长度
  tabWidth: 2, //缩进长度
  useTabs: false, //使用空格代替tab缩进
  semi: false, //句末使用分号
  singleQuote: true, //使用单引号
  quoteProps: 'as-needed', //仅在必需时为对象的key添加引号
  jsxSingleQuote: true, // jsx中使用单引号
  trailingComma: 'all', //多行时尽可能打印尾随逗号
  bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
  jsxBracketSameLine: true, //多属性html标签的‘>’折行放置
  arrowParens: 'always', //单参数箭头函数参数周围使用圆括号-eg: (x) => x
  requirePragma: false, //无需顶部注释即可格式化
  insertPragma: false, //在已被preitter格式化的文件顶部加上标注
  proseWrap: 'preserve', //按照文件原样折行
  htmlWhitespaceSensitivity: 'ignore', //对HTML全局空白不敏感
  vueIndentScriptAndStyle: false, //不对vue中的script及style标签缩进
  endOfLine: 'lf', //结束行形式 仅换行（\ n），在Linux和macOS以及git repos内部通用
  embeddedLanguageFormatting: 'auto', //对引用代码进行格式化
}
```

## 工程规范

  包括环境切换，项目目录，打包，部署，git提交

### 环境

  分dev，test，prod三个环境

  ```json
  "dev": "cross-env NODE_ENV=development dotenv -e .env.dev vue-cli-service serve",
  "build:dev": "cross-env NODE_ENV=production dotenv -e .env.dev vue-cli-service build",
  "build:test": "cross-env NODE_ENV=production dotenv -e .env.test vue-cli-service build",
  "build:prod": "cross-env NODE_ENV=production dotenv -e .env.prod vue-cli-service build",
  ```

### 文件命名

  *命名尽量简短，但要保证语义化*

  1.文件夹命名使用小驼峰规则，如：holidayLeave

  2.VUE文件命名使用大驼峰规则，如：HolidayLeave.vue

  3.业务模块的文件名不使用Index.vue, 根据vue3.2 setup语法糖，组件名会从文件名读取

### git提交

  git提交建议使用风格化图标[gitmoji](https://gitmoji.dev/)
  用法：
  ```bash
  git commit -m ":art: 提交描述信息"
  ```
### 部署

#### 主应用

  将子应用注册到主应用
  ```ts
  // VUE_APP_SUB_PATH = '//172.168.10.219/subapp/'
  const microApps = [
    {
      name: 'config', // 系统配置
      entry: env === 'development' ? '//localhost:8002' : process.env.VUE_APP_SUB_PATH + 'config/',
      activeRule: '/config'
    },
    ...
  ]
  ```
#### 子应用

  1.更改package.json文件中的name为当前子应用的项目名

  2.更改public/index.html中div的id为当前子应用的项目名

  3.更改入口文件main.ts中的“subapp”为当前子应用的项目名

  4.更改src/config/default/vue.custom.config.js中outputDir为当前子应用的项目名，以及title
  ```ts
  instance?.mount(container ? container.querySelector('#subapp') : '#subapp')
  ```
  5.更改src/constant/key.ts文件中的appKey为当前应用的项目名
  ```ts
  static appKey = 'appname-main-app-key' // 应用标识
  ```

#### 部署结构

```
- /main
    /static
    index.html

  - /subapp
    - /subapp1
    - /subapp2
    - /subapp3
    - /subapp4
    - ...
```


## 代码规范

  包括项目中的vue, ts, css等规范

### vue规范

::: tip 建议

参考[vue风格指南](https://v3.cn.vuejs.org/style-guide/)
:::

1. **页面元素顺序**: 当创建一个页面时，保证一致的顺序

    - `<template></template>`
    - `<script></script>`
    - `<style></style>`
   
2. **为 v-for 设置 key**: 在组件上必须用 key 搭配 v-for，以便维护内部组件及其子树的状态。
  ```vue
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
  ```
3. **v-if 和 v-for 互斥**: 永远不要把 v-if 和 v-for 同时用在同一个元素上。
   
  ```vue
  <!-- bad -->
  <ul>
    <li v-for="user in users" v-if="shouldShowUsers" :key="user.id">
      {{ user.name }}
    </li>
  </ul>

  <!-- good -->
  <ul>
    <li v-if="shouldShowUsers">
      <div v-for="user in users" :key="user.id">
        {{ user.name }}
      </div>
    </li>
  </ul>
  ```
4. **模板中的表达式**: 组件模板只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。
   
  ```js
  // bad
  <span>
    {{
      fullName.split(' ').map((word) => {
        return word[0].toUpperCase() + word.slice(1)
      }).join(' ')
    }}
  </span>

  // good
  <span>{{ formatType }}</span>

  const formatType = computed(() => {
    return state.type.filter((item) => item.show)
  })
  ```
5. **指令缩写**
   
     - `用 : 表示 v-bind:`
     - `用 @ 表示 v-on:`
     - `用 # 表示 v-slot:`
  
### css规范
