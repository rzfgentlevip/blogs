import { navbar } from "vuepress-theme-hope";

export default navbar([
  //   首页导航
  "/",
  {
    text: "项目开发",
    // collapsible: true,
    icon: "pen-to-square",
    children: [
      {
        text: "项目开发",
        link: "/Project/",
        icon: "pen-to-square",
      },
      {
        text: "组件开发",
        link: "/Widget/",
        icon: "pen-to-square",
      },
    ],
  },
  //   算法专题导航
  {
    text: "算法与数据结构",
    // collapsible: true,
    icon: "pen-to-square",
    children: [
      {
        text: "算法专题",
        link: "/algorithm/",
        icon: "pen-to-square",
      },
      {
        text: "数据结构专题",
        icon: "pen-to-square",
        link: "/dataStructure/",
      },
    ],
  },
  //   设计模式导航
  {
    text: "设计模式",
    // collapsible: true,
    icon: "pen-to-square",
    children: [
      {
        text: "设计原则",
        link: "/designpattern/designPrinciple/",
        // collapsible: true,
        icon: "pen-to-square",
      },
      {
        text: "创建型",
        icon: "pen-to-square",
        link: "/designpattern/creational/"
      },
      {
        text: "行为型",
        icon: "pen-to-square",
        link: "/designpattern/Behavior/"
      },
      {
        text: "结构型",
        icon: "pen-to-square",
        link: "/designpattern/structural/"
      },
    ],
  },
  //   源码专题导航
  {
    text: "源码分析",
    // collapsible: true,
    icon: "pen-to-square",
    children: [
      {
        text: "Spring源码实现",
        link: "/frameDesignAndSourceCode/springSourceCode/",
        // collapsible: true,
        icon: "pen-to-square",
      },
      {
        text: "Mybatis框架实现",
        icon: "pen-to-square",
        link: "/frameDesignAndSourceCode/mybatisSourceCode/"
      },
    ],
  },
  //   架构专题导航
  {
    text: "架构专题",
    // collapsible: true,
    icon: "pen-to-square",
    children: [
      {
        text: "软件架构",
        link: "/ArchitectureDesign/",
        icon: "pen-to-square",
      },
      {
        text: "数据架构",
        icon: "pen-to-square",
        link: "/Implementation/",
      },
    ],
  },
  //   精选文章导航
  {
    text: "精选博文",
    icon: "pen-to-square",
    prefix: "/excellentBook/",
    children: [
      {
        text: "业务知识",
        icon: "pen-to-square",
        prefix: "/excellentBook/business/",
        children: [
          { text: "金融业务",
            icon: "pen-to-square",
            link: "/excellentBook/business/" },
        ],
      },
      {
        text: "项目经验",
        icon: "pen-to-square",
        prefix: "/excellentBook/project/",
        children: [
          {
            text: "K8S部署项目",
            icon: "pen-to-square",
            link: "/excellentBook/project/",
          },
        ],
      },
      {
        text: "通用数据设计",
        icon: "pen-to-square",
        link: ""
      },
      { text: "业务场景设计",
        icon: "pen-to-square",
        link: "scence.md"
      },
    ],
  },
  //   文章归档导航
  {
    text: "基础归档",
    icon: "gaishu",
    link: "/home.md"
  },
  //   面试导航
  {
    text: "面试篇",
    icon: "gaishu",
    children: [
      {
        text: "技术博客",
        link: "/interview/TechnicalInterview/",
        icon: "pen-to-square",
      },
      {
        text: "场景题",
        icon: "pen-to-square",
        link: "/interview/Scenequestion/",
      },
      {
        text: "综合手册",
        icon: "pen-to-square",
        link: "/interview/Questions/",
      },
      {
        text: "实战分析",
        icon: "pen-to-square",
        link: "/interview/ProductionAnalysis/",
      },
    ],
  },
  // 知识星球导航
  {
    text: "知识星球",
    icon: "gaishu",
    link: "/KnowledgePlanet/"
  },
  //   B站导航
  {
    text: "B站",
    icon: "gaishu",
    link: "/video/"
  },
  {
    text: "关于我",
    icon: "book",
    link: "/introduction/introducted.md",
  },
]);