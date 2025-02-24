import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import {sidebarConfig} from "./sidebar";

export default hopeTheme({
  hostname: "https://www.codinglab.online",

  // 全局默认作者
  author: {
    name: "Mr.bugcode",
    url: "home.md",
  },


  // 网站图标 是网站左上角的那个小图标
  logo: "https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/log.jpg",
  roundAvatar: true,
  repo: "https://github.com/justdoitMr/",
  docsDir: "themeHope",

  // 以前的默认仓库分支名，方便提交 pr 和 issue
  docsBranch: "master",
  breadcrumb: false,

  // 全屏按钮
  fullscreen: true,
  // 在深色模式，浅色模式和自动之间切换 (默认)
  darkmode: "switch",
  // 纯净模式，会禁用一些花哨的动画以及一些色彩
  // pure: true,

  // 阿里妈妈图标的前缀
  iconPrefix: "iconfont icon-",
  // Iconfont 精选图标 和 阿里妈妈的互斥
  iconAssets: "https://at.alicdn.com/t/c/font_4570931_i3acfllzyt.css",


  // 导航栏
  navbar: navbar,
  // 侧边栏
  sidebar: sidebarConfig,

  // 页脚
  // 页脚支持http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41030502000411
  footer: '<a href="https://beian.miit.gov.cn/" target="_blank">沪ICP备20230606088</a>'
      +'<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406112054052.png" height="15px" width="15px" />'
      +'<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41030502000411">'
      +'<span>沪公网安备 41080552980273号</span>'
      +'</a>',
  displayFooter: true,

  // 博客相关
  blog: {
    description: "大家好，我是bugcode,金融开发领域从业者，目前从事新一代交易系统开发工作，熟悉java后端，大数据，docker,k8s等技术栈。",
    // 个人介绍地址
    intro: "/intro.html",
    sidebarDisplay: "mobile",
    // 博主头像
    avatar: "https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/log.jpg",
    // 圆角
    // roundAvatar: true,
    // 座右铭
    medias: {
      github: "https://github.com/justdoitMr",
      Zhihu: "https://example.com",
      VuePressThemeHope: {
        // 自定义图标
        icon: "https://theme-hope-assets.vuejs.press/logo.svg",
        // 自定义图标的链接
        link: "https://theme-hope.vuejs.press",
      },
    },
  },

  // 加密配置
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 在这里配置主题提供的插件
  plugins: {
    // 该插件会监听页面滚动事件。
    // 当页面滚动至某个 标题锚点 后，如果存在对应的 标题链接 ，那么该插件会将路由 Hash 更改为该 标题锚点 。
    activeHeaderLinks: true,
    // 启用博客
    blog: true,
    // pwa
    pwa: true,
    mdEnhance: {
      // 添加选项卡支持
      tabs: true,
      // 流程图
      // mermaid: true,
      // 支持任务列表
      tasklist: true,
      // 启用图片懒加载
      imgLazyload: true,
      // 启用图片标记
      imgMark: true,
      // 启用图片大小
      imgSize: true,
      // 启用图片标题
      figure: true,
      // 自定义对齐
      align: true,
      // 支持幻灯片
      revealJs: true,
      // 你的 Markdown 行为与 GitHub 保持一致
      gfm: true,
      codetabs: true,
      component: true,
      demo: true,
      include: true,
      mark: true,
      plantuml: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
    },
    // sub: true,
    // sup: true,
    // tabs: true,
    // tasklist: true,
    // vPre: true,

    // 在启用之前安装 chart.js
    // chart: true,

    // insert component easily

    // 在启用之前安装 echarts
    // echarts: true,

    // 在启用之前安装 flowchart.ts
    // flowchart: true,

    // gfm requires mathjax-full to provide tex support
    // gfm: true,

    // 在启用之前安装 katex
    // katex: true,

    // 在启用之前安装 mathjax-full
    // mathjax: true,

    // 在启用之前安装 mermaid
    // mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // 在启用之前安装 reveal.js
    // revealJs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },

    // 在启用之前安装 @vue/repl
    // vuePlayground: true,

    // install sandpack-vue3 before enabling it
    // sandpack: true,
  },



  components: {
      components: ["Badge", "VPCard"],
    },


    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   javaBasic: {
    //     icon: "/assets/icon/javaBasic-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/articles/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
});
