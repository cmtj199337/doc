module.exports = {
  title: '前端知识库', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: '开发文档', // meta 中的描述文字，用于SEO
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/logo.jpg' }], //浏览器的标签栏的网页图标
  ],
  base: '/',
  markdown: {
    lineNumbers: false,
    toc: { includeLevel: [2, 3, 4] },
    extractHeaders: ['h2', 'h3', 'h4'],
  },
  serviceWorker: true,
  themeConfig: {
    sidebar: 'auto',
    sidebarDepth: 2,
    logo: '/avatar.jpg',
    lastUpdated: 'last Update', // string | boolean
    nav: [
      { text: '首页', link: '/' },
      {
        text: '开发规范',
        ariaLabel: '开发规范',
        items: [
          { text: '概述', link: '/views/standard/overview.md' },
          { text: 'javascript', link: '/views/standard/javascript.md' },
        ],
      },
      {
        text: '组件',
        ariaLabel: '组件',
        items: [
          { text: '基础', link: '/views/components/base.md' },
          { text: '业务', link: '/views/components/business.md' },
        ],
      },
      {
        text: '项目文档',
        ariaLabel: '项目文档',
        items: [
          { text: '项目介绍', link: '/views/guide/introduce.md' },
          { text: '微前端', link: '/views/guide/micro.md' },
          { text: '子应用文档', link: '/views/guide/subapp.md' },
          { text: '踩坑记录', link: '/views/guide/record.md' },
          { text: '工具', link: '/views/guide/tools.md' },
        ],
      },
      {
        text: '笑忘书',
        ariaLabel: '笑忘书',
        items: [
          { text: '从脚手架开始', link: '/views/articles/generator.md' },
          { text: 'jenkins工作流', link: '/views/articles/workflow.md' },
          { text: '项目之间共享依赖', link: '/views/articles/dependencies.md' },
        ],
      },
    ],
  },
}
