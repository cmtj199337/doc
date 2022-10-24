# 概述

::: tip 简介

在维护多个子应用的时候，你会发现这些子应用的依赖 95%以上是重合的，但是我们每次都需要 install。除了占据较大的硬盘空间之外呢，还加重了心理负担
:::

## 解决方案

### yarn workspaces

_👉 参考 [Workspaces](https://classic.yarnpkg.com/en/docs/workspaces)_

#### 用法

```json
{
  "private": true, // 必需，添加此安全措施确保不会意外暴露工作区
  "workspaces": ["subapps/*"] // 支持全局匹配。
}
or
{
  "private": true,
  "workspaces": [
    "subapp-a", // subapp-a子应用内package.json的name也为‘subapp-a’
    "subapp-b"
  ] // workspaces属性的值为一个字符串数组，每一项指代一个workspace路径。
}

// 推荐使用全局匹配的方式
```

#### 结构
```
- /xg
    /node_modules
    package.json
    yarn.lock
    /main
  - /subapps
    - /subapp1
      - package.json
    - /subapp2
      - package.json
    - ...

    不管在子应用里面yarn install 还是在外面install,依赖都会统一安装到/xg目录下，并且只会生成一个yarn.lock
```
#### 查看项目中的workspace依赖树

```bash
$ yarn workspaces info --json
```

```json
{
  "subapp1": {
    "location": "subapps/subapp1",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  },
  "subapp2": {
    "location": "subapps/subapp2",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  },
}
```

