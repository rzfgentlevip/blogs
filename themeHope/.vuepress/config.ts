import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
// import { docsearchPlugin } from "@vuepress/plugin-docsearch";
// import { commentPlugin } from "vuepress-plugin-comment2";
// import { pwaPlugin } from "vuepress-plugin-pwa2";


export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "穿山甲技术",
  description: "bugcode 架构之路",
  dest: "./themeHope/.vuepress/dist",
  // @vuepress/plugin-pwa:  ⚠ The plugin will register service worker to handle assets, so we recommend you to set "shouldPrefetch: false" in VuePress config file. 报错
  shouldPrefetch: false,
  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,


  head: [

    // meta
    ["meta", { name: "robots", content: "all" }],
    ["meta", { name: "author", content: "bugcode" }],
    [
      "meta",
      {
        "http-equiv": "Cache-Control",
        content: "no-cache, no-store, must-revalidate",
      },
    ],
    ["meta", { "http-equiv": "Pragma", content: "no-cache" }],
    ["meta", { "http-equiv": "Expires", content: "0" }],
    [
      "meta",
      {
        name: "keywords",
        content:
            "Java, Java基础, 并发编程, JVM, 虚拟机, 数据库, MySQL, Spring, Redis, MyBatis, SpringBoot, IDEA, 求职面试, 面渣逆袭, 学习路线",
      },
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "script",{},
      `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?5230ac143650bf5eb3c14f3fb9b1d3ec";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/c/font_4570931_i3acfllzyt.css",
      },
    ],
  ],

  // plugins: [
  //   // Progressive Web app，即渐进式网络应用程序，
  //   // 允许网站通过支持该特性的浏览器将网站作为 App 安装在对应平台上。
  //   pwaPlugin({
  //     // favicon.ico一般用于作为缩略的网站标志,它显示位于浏览器的地址栏或者在标签上,用于显示网站的logo,
  //     favicon: "https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/favicon.ico",
  //     // 主题色
  //     themeColor: "#096dd9",
  //     apple: {
  //       icon: "/assets/icon/apple-icon-152.png",
  //       statusBarColor: "black",
  //     },
  //     msTile: {
  //       image: "/assets/icon/ms-icon-144.png",
  //       color: "#ffffff",
  //     },
  //     manifest: {
  //       icons: [
  //         {
  //           src: "/assets/icon/chrome-mask-512.png",
  //           sizes: "512x512",
  //           purpose: "maskable",
  //           type: "image/png",
  //         },
  //         {
  //           src: "/assets/icon/chrome-mask-192.png",
  //           sizes: "192x192",
  //           purpose: "maskable",
  //           type: "image/png",
  //         },
  //         {
  //           src: "/assets/icon/chrome-512.png",
  //           sizes: "512x512",
  //           type: "image/png",
  //         },
  //         {
  //           src: "/assets/icon/chrome-192.png",
  //           sizes: "192x192",
  //           type: "image/png",
  //         },
  //       ],
  //     },
  //   }),
  //   // 留言
  //   commentPlugin({
  //     comment: false,
  //     provider: "Giscus",
  //     repo :"itwanger/tobebetterjavaer-giscus",
  //     repoId:"R_kgDOHBJssg",
  //     category:"Announcements",
  //     categoryId:"DIC_kwDOHBJsss4COJOx",
  //   }),
  //   // 只能搜索
  //   docsearchPlugin({
  //     appId: "O566AMFNJH",
  //     apiKey: "d9aebea8bd1a4f1e01201464bbab255f",
  //     indexName: "tobebetterjavaer",
  //     locales: {
  //       "/": {
  //         placeholder: "搜索文档",
  //         translations: {
  //           button: {
  //             buttonText: "搜索文档",
  //             buttonAriaLabel: "搜索文档",
  //           },
  //           modal: {
  //             searchBox: {
  //               resetButtonTitle: "清除查询条件",
  //               resetButtonAriaLabel: "清除查询条件",
  //               cancelButtonText: "取消",
  //               cancelButtonAriaLabel: "取消",
  //             },
  //             startScreen: {
  //               recentSearchesTitle: "搜索历史",
  //               noRecentSearchesText: "没有搜索历史",
  //               saveRecentSearchButtonTitle: "保存至搜索历史",
  //               removeRecentSearchButtonTitle: "从搜索历史中移除",
  //               favoriteSearchesTitle: "收藏",
  //               removeFavoriteSearchButtonTitle: "从收藏中移除",
  //             },
  //             errorScreen: {
  //               titleText: "无法获取结果",
  //               helpText: "你可能需要检查你的网络连接",
  //             },
  //             footer: {
  //               selectText: "选择",
  //               navigateText: "切换",
  //               closeText: "关闭",
  //               searchByText: "搜索提供者",
  //             },
  //             noResultsScreen: {
  //               noResultsText: "无法找到相关结果",
  //               suggestedQueryText: "你可以尝试查询",
  //             },
  //           },
  //         },
  //       },
  //     },
  //   }),
  // ],

});
