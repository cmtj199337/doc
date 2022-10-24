# 概述

::: tip 简介

*“设计系统的架构受制于产生这些设计的组织的沟通结构。”  — M.Conway*
:::

## 工程架构

### 什么是微前端？

  康威定律几乎就是微前端（准确来说是微服务架构）的理论基础了。它指出了组织架构越庞大，其系统间沟通成本越高的问题。而解决这一问题的有效手段就是，将大的系统拆分成一个个微小的，可以独立自治的子系统。一旦系统的依赖限制在了内部，功能上更加内聚，对外部的依赖变少，那么就能显著的减少跨系统之间的沟通成本了。

### 为什么要用微前端？
  微前端的假设是：所有大型系统都逃不过熵增定律

  如果不是，那一定是因为这个系统使用的技术栈更新的不够快，参与系统开发的工程师不够多，产品迭代的时间不够长。

  微前端倡导的是：我们可以通过分而治之的手段，让「上帝的归上帝，凯撒的归凯撒」。

### 微前端的使用

####  改造步骤
  1. 安装qiankun
  ```bash
  $ yarn add qiankun
  ```
2. core/app.ts
  ```typescript
  import { registerMicroApps, setDefaultMountApp } from 'qiankun'

  <!-- 注册子应用 -->
  registerMicroApps(
      [{
        name: 'system',
        entry: '//localhost:9000',
        container: '#subapp-viewport',
        activeRule: '/system'
      }],
      {
        beforeLoad: [
            app => {
              console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)
              return Promise.resolve()
            }
        ],
        beforeMount: [
            app => {
              console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
              return Promise.resolve()
            }
        ],
        afterUnmount: [
            app => {
              console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
              return Promise.resolve()
            }
        ]
      }
  )

  <!-- 设置默认子应用 -->
  setDefaultMountApp('/system')

  最后导入到main.ts
  import '@/core/app'
  ```
3. DOM渲染后启动qiankun
  ```ts
  <script lang="ts">
    import { defineComponent, onMounted } from 'vue'
    import { start } from 'qiankun'
    export default defineComponent({

      setup() {
        onMounted(() => {
            if (!window.qiankunStarted) {
              window.qiankunStarted = true
            start()
            }
        })
      }
    })
  </script>
  ```

4. 设置子应用容器 src/Layout/index
  ```HTML
    <div id="subapp-viewport" />
  ```

