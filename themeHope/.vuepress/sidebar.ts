import { sidebar } from "vuepress-theme-hope";

    //将其他文件下的内容导入此文件
export const sidebarConfig = sidebar({
    //   ------------------------------------------------导航文档导入 start-----------------------------------------------------
    // 自定义starter 组件开发，可以添加多个折叠组件项目
    "/Widget/" :[
        {
            text: "组件开发步骤",
            collapsible: true,
            prefix: "devWidget/",
            children:
                [
                    "20241120-customizeWidget.md",
                ]
        },
    ],
    // 项目开发 可以添加多个折叠项目
    "/Project/": [
        {
            text: "动态线程池",
            collapsible: true,
            prefix: "DynamicThreadPool/",
            children:
                [
                    "20241119-dynamicThreadPool-design.md",
                    "20241129-dynamicThreadPoolRelease.md"
                ]
        },
    ],

    // 架构专题
    "/ArchitectureDesign/": [
        {
            text: "DDD架构思想",
            collapsible: true,
            prefix: "DDD/",
            children:
                [
                    "first-mvcDesignArchitecture.md",
                    "second-ddd-Concept-Theory.md",
                    "third-ddd-Engineering-Model.md",
                    "four-ddd-architecture-design.md",
                    "five-ddd-Architectural-Refactoring.md",
                    "20241116-DDDModeling.md"
                ]
        },
        {
            text: "数据架构",
            collapsible: true,
            prefix: "DataArchitecture/",
            children:
                [
                    "20241123-dataArchitecture.md"
                ]
        },
    ],

    // 软件架构落地实现
    "/Implementation/": [
        {
            text: "数据仓库架构",
            collapsible: true,
            prefix: "dataArvhitectureImple/",
            children:
                [
                   "20241123-Implementation.md"
                ]
        },
    ],
    // 算法专题 可以添加多个算法分类
    "/algorithm/": [
        {
            text: "双指针",
            collapsible: true,
            prefix: "twoPoint/",
            children:
            [

            ]
        },
        {
            text: "滑动窗口",
            collapsible: true,
            prefix: "slidingWindow/",
            children:
            [
           
            ]
        },
        {
            text: "动态规划",
            collapsible: true,
            prefix: "DynamicProgramming/",
            children:
            [
           
            ]
        },
        {
            text: "回溯算法",
            collapsible: true,
            prefix: "backtracking/",
            children:
            [
            
            ]
        },
        {
            text: "贪心算法",
            collapsible: true,
            prefix: "GreedyAlgorithm/",
            children:
            [
         
            ]
        },
        {
            text: "Hot 100",
            collapsible: true,
            prefix: "hotting/",
            children:
            [
                "20241121-twoSum.md",
                "20241209-waterMuch.md",
                "20241209-charectopic.md",
                "20241209-longestConsecutive.md",
                "20241210-moveZeroes.md",
                "20241211-threeSum.md",
                "20241212-trap.md",
                "20241212-lengthOfLongestSubstring.md",
                "20241217-maxSlidingWindow.md",
                "20241218-maxSubArray.md",
                "20241225-merge.md",
                "20241225-roate.md",
                "20241226-FirstMissingPositive.md",
                "20241226-PoductExceptSelf.md",
                "20250104-48rotate.md",
                "20250104-searchMatrix.md",
                "20250104-getIntersectionNode.md",
                "20250104-reverseList.md"
            ]
        },
    ],
// 数据结构专题
    "/dataStructure/": [
        {
            text: "数据结构",
            collapsible: true,
            // prefix: "twoPoint/",
            children:
            [
            "basicDataStructure.md"
            ]
        },
    ],
    // 知识星球
    "/KnowledgePlanet/": [
        "act_one_aboutMyKnowledgePlanet.md"
    ],
    // B站
    "/video/": [
        "act_one_aboutMyvideo.md"
    ],
    "/interview/TechnicalInterview/": [
        "act-two-分布式锁.md",
        "act_three-Redis和Mysql双写一致性问题.md",
        "act_four_分布式基础.md",
        "act_five_分布式事务.md",
        "20241204-distributedTransition.md",
        "20241116-distributedAndMicroservices.md",
        "20241116-highConcurrency.md",
        "20241113-performance.md",
        "20241122-memoryAnalyze.md",
        "20241204-interfaceIdempotence.md",
        "20241205-mysqlThreeLog.md",
        "20241207-k8sNamespaceResource.md",
        "20241207-k8sApiVersion.md",
        "20241207-springbeanLifecycle.md",
        "20241207-druidParma.md",
        "20241207-k8sDeployKafka.md",
        "20241209-zookeeperLeaserSelecter.md",
        "20241210-rediscluster.md",
        "20241212-linux-zero-copy.md",
        "20241217-Threadpool.md",
        "20241221-ArchitectureEvolution.md",
        "20241225-k8spod.md"
    ],
    // 场景题目
    "/interview/Scenequestion/":[
        "actone_Microservice_architecture.md",
        "act_two_interface_design.md",
        "act_three_Slow_SQL.md",
        "act_four_Frequent_calls.md",
        "act_five_Duplicate_data.md",
    ],
    // 综合面试题
    "/interview/Questions/":[
       "20241116-Redis.md",
        "20241208-redisImprove.md",
        "20241116-Kafka.md",
        "20241208-kafkaImprove.md",
        "20241117-Jvm(1).md",
        "20241117-Jvm(2).md",
        "20241117-Mysql(1).md",
        "20241117-Mysql(2).md",
        "20241117-Thread(1).md",
        "20241117-Thread(2).md",
        "20241117-Collection(1).md",
        "20241117-Collection(2).md",
        "20241206-spring(1).md",
        "20241206-Mybatis(1).md",
        "20241118-SparkBasic.md",
        "20241118-FlinkBasic.md",
        "20241203-K8S-one.md",
        "20241203-K8S-three.md",
        "20241203-K8S-four.md",
        "20241204-docker-one.md",
    ],
    // 问题分析
    "/interview/ProductionAnalysis/":[
        "20241119-dataImbalance-bigdata.md",
        "20241119-DevelopmentExperience-bigdata.md",
        "20241119-SpringbootRefreshCacheMethod.md",
        "20241119-kafkaProperties.md",
        "20241129-wiresharkAnalyze.md",
        "20241204-javaPerformanceTuning.md",
        "20241211-mavenDependency.md"
    ],
    // 业务
    "/business/": [
    ],
    "/frameDesignAndSourceCode/springSourceCode/" :[
        "act_one-springIntroduction.md",
        "act_two-springBeanDefineAndRegister.md",
        "act_three-springConstructurInstantiation.md",
        "act_four-springPropertyAutowareAnddepObj.md",
        "act_five-springResourceLoadAndObjRegister.md",
        "act_six-springContext.md",
        "act_seven-springInitAndDestoryMethod.md",
        "act_eight-springAwareContainerObj.md",
        "act_nine-springActOnAndBeanFactory.md",
        "act_ten-springContainerAndEventListener.md",
        "act_eleven-spring-aopJdkAndCglib.md",
        "act_tweve-spring-UseAopInSpringContainer.md",
        "act_thirteen-spring-UseAopInSpringContainer.md",
        "act_fourteen-spring-UseAnnotationAutoPro.md",
        "act_fifteen-spring-ProxyObjSetPro.md"
    ],
    // mybatis源码
    "/frameDesignAndSourceCode/mybatisSourceCode/" :[
        "first-mybatisintroduction.md",
    ],
    // 架构专题/frameDesignAndSourceCode/
    "/engineeringArchitectureDesign/" :[

    ],
    // 设计模式篇
    "/designpattern/designPrinciple/" :[
        "act_one_classDiagram.md",
        "20241223-designPatternThinking.md"
    ],
    // 创建型设计模式
    "/designpattern/creational/" :[
        "act_one_builderPattern.md",
        "act_two_factoryPattern.md",
        "act_three_signPattern.md",
        "20241223-Prototype.md"
    ],
    //行为型设计模式
    "/designpattern/Behavior/" :[
        "act_one_templatePattern.md",
        "act_two_strategyPattern.md",
        "20241223-observer.md",
        "20241223-Chain.md",
        "20241223-state.md"
    ],
    // 结构性设计模式
    "/designpattern/structural/" :[
        "act_one_adapterPattern.md",
        "act_two_proxyPattern.md",
        "act_three_DecoratorPattern.md",
        "20241224-Facade.md",
        "20241224-bridge.md"
    ],
    "/project/" :[
        "act_one-K8SDeployApplicatinn.md",
    ],
    "/about/" :[
        "intro.md",
    ],
    // 业务
    "/excellentBook/business/":[
        "act_one_finance.md"
    ],
    // 项目经验
    "/excellentBook/project/":[
        "act_one-K8SDeployApplicatinn.md"
    ],


    //   ------------------------------------------------导航文档导入 end-----------------------------------------------------



    // --------------------------------------------------下面是目录结构-----------------------------------------------------

  "/": [
    // {
    //     text: "一、导读",
    //     collapsible: true,
    //     children:
    //         [
    //             // Java核心
    //             {
    //                 prefix: "/introduction/",
    //                 text: "1、导读",
    //                 link: "readme"
    //             },
    //             {
    //                 prefix: "introduction/",
    //                 text: "2、引言",
    //                 link: "intrd"
    //             }
    //         ]
    // },
      // 第二章节：java篇
      {
          text: "二、java核心",
          collapsible: true,
          children:
              [
              // Java核心
                  {
                      prefix: "java/javaBasic/",
                      text: "1、Java概述",
                      collapsible: true,
                      children: [
                          // 里面写每一节
                          "first-introduction.md",
                          "second-jdkInstallion.md"
                      ],
                  },
                  {
                      prefix: "java/javaCore/",
                      text: "2、Java进阶",
                      collapsible: true,
                      children: [
                          // 里面写每一节
                      ],
                  }
              ]
      },
      // 第三章节：Spring
      {
          // 大章节目录
          text: "三、后端框架篇",
          collapsible: true,
          children:
              [
                  // 第三章 第一节
                  {
                      prefix: "SpringFramework/Spring/",
                      text: "1、Spring",
                      collapsible: true,
                      children: [
                          "20241119-SpringAnnotation.md",
                          "20241119-SpringAop.md",
                          "20241119-SpringIOC.md",
                          "20241119-SpringTransaction.md"
                      ],
                  },
                  // 第三章 第二节
                  {
                      prefix: "SpringFramework/springmvc/",
                      text: "2、SpringMVC",
                      collapsible: true,
                      children: [
                          "20241119-SpringMvcBasic.md",
                          "20241119-SpringMvcBasicUp.md",
                          "20241119-SpringMvcDeclarationTransition.md",
                          "20241119-SsmIntegration.md"
                      ],
                  },
                  // 第三章 第三节
                  {
                      prefix: "SpringFramework/springboot/",
                      text: "3、SpringBoot",
                      collapsible: true,
                      children: [
                          "act_one_springIntroduction.md",
                          "act_two_springboot_basic.md",
                          "act_three_springboot_webDev.md",
                          "20241119-SpringBootDataAccess.md",
                          "20241119-SpringBootTest.md",
                          "20241119-SpringBootMetricMonitoring.md",
                          "20241119-SpringBootPrinciple.md",
                          "20241119-SpringBootAnnotationPrinciple.md",
                          "20241119-SpringbootWEB.md",
                          "20241119-SpringbootIntegrationkafka.md"
                      ],
                  },
                  // 第三章 第四节 Mybatis
                  {
                      prefix: "SpringFramework/Mybatis/",
                      text: "4、Mybatis",
                      collapsible: true,
                      children: [
                          "20241119-MybatisBasic.md",
                      ],
                  },
              ]
      },
      // 第三章节：大数据
      {
          // 大章节目录
          text: "四、大数据篇",
          collapsible: true,
          children:
              [
                  // 第三章 第一节
                  {
                      prefix: "bigdata/Flink",
                      text: "1、Flink",
                      collapsible: true,
                      children: [
                          "20241119-FlinkGenerateStreamGraph.md",
                          "20241119-FlinkGenerateJobGraph.md"
                      ],
                  },
                  // 第三章 第二节
                  {
                      prefix: "bigdata/spark",
                      text: "2、Spark",
                      collapsible: true,
                      children: [
                          "20241118-SparkPrincipleofOperation.md",
                          "20241118-SparkWebUI.md",
                          "20241118-SparkSqlMergeFile.md",
                          "20241118-Sparkproblem.md",
                          "20241118-SparkParmas.md",
                          "20241118-SparkParameterList.md",
                          "20241118-SparkError.md",
                          "20241118-SparkAQESkewedJoin.md",
                          "20241119-SparkSqlExecutionProcess.md",
                      ],
                  },
                  // 第三章 Hbase
                  {
                      prefix: "bigdata/Hbase",
                      text: "3、Hbase",
                      collapsible: true,
                      children: [
                          "20241119-HbaseBasic.md",
                          "20241226-hbaseImprove.md"
                      ],
                  },
              ]
      },
      // 第四章节: 容器云
      {
          // 大章节目录
          text: "五、云原生",
          collapsible: true,
          children:
              [
                  // 第四章 第一节
                  {
                      prefix: "ContainerCloud/docker/",
                      text: "1、Docker基础",
                      collapsible: true,
                      children: [
                          "act_one_docker_one.md",
                          "act_two_docker_two.md"
                      ],
                  },
                  // 第三章 第二节
                  {
                      prefix: "ContainerCloud/k8s/",
                      text: "2、K8S基础",
                      collapsible: true,
                      children: [
                        "20241203-k8sgaishu.md",
                        "20241203-initK8sCluster.md",
                        "20241203-k8sCoreObject.md",
                        "20241203-k8sResourcesList.md",
                        "20241203-podStatusAndphase.md",
                        "202412-3-podController.md",
                        "20241203-k8sDiscover.md",
                        "20241203-k8sVolumn.md",
                        "act_two_k8s基础学习.md",
                        "20241203-k8sSummary.md",
                        "20241203-k8sClusterBuild.md",
                      ],
                  },
                  // 第三章 第四节
                  {
                    prefix: "ContainerCloud/k8sTheory/",
                    text: "3、K8S原理篇",
                    collapsible: true,
                    children: [
                      "act_one_k8s中负载均衡原理.md.md",
                      "act_none_pod异常状态排查.md",
                      "20241119-k8s-ingressAndService.md",
                      "20241119-k8sPermissions.md",
                        "20241207-k8sStateFul.md",
                        "20241225-k8sHpa.md"
                    ],
                }
              ]
      },
      // 第五章节: 前端
      {
          text: "五、前端篇",
          collapsible: true,
          children:
              [
                  // 第五章 第一节
                  {
                      prefix: "backend/react/",
                      text: "1、React",
                      collapsible: true,
                      children: [
                          "act_one_reactIntroduction.md",
                          "act_two_componentCodding.md",
                          "act_three_ReactEvent.md",
                          "act_four_lifeCycle.md",
                          "act_five_scaffold.md",
                          "act_six_route.md",
                          "act_seven_ReactHightLevel_one.md",
                          "act_seven_ReactHightLevel_two.md",
                          "act_eight_ReactHook_one.md",
                          "act_eight_ReactHook_two.md"
                      ],
                  },
              ]
      },
      // 第六章
      {
          text: "六、工具篇",
          collapsible: true,
          prefix: "tools/",
          children:
              [
              "act-one-maven-basic.md",
                "20241125-linuxCommand.md"
              ]
      },
  ],
    // 第六章
    // "/interview": [
    //     {
    //         text: "一、K8S",
    //         collapsible: true,
    //         prefix: "k8s/",
    //         children:
    //             [
    //                 "act_one_k8s基础面经一.md",
    //                 "act-two-分布式锁.md"
    //             ]
    //     },
    // ]
});









// // 第三章节：架构设计篇
// {
//     // 大章节目录
//     text: "三、工程架构设计",
//         collapsible: true,
//     children:
//     [
//         // 第三章 第一节
//         {
//             prefix: "engineeringArchitectureDesign/",
//             text: "1、MVC架构设计",
//             collapsible: true,
//             children: [
//                 "first-mvcDesignArchitecture.md",
//                 "second-ddd-Concept-Theory.md"
//             ],
//         },
//         // 第三章 第二节
//         {
//             prefix: "engineeringArchitectureDesign/",
//             text: "2、MVC架构设计",
//             collapsible: true,
//             children: [
//                 "first-mvcDesignArchitecture.md",
//             ],
//         }
//     ]
// },
// // 第四章节: 框架设计和源码阅读
// {
//     // 大章节目录
//     text: "三、源码分析及框架设计",
//         collapsible: true,
//     children:
//     [
//         // 第四章 第一节
//         {
//             prefix: "frameDesignAndSourceCode/springSourceCode/",
//             text: "1、spring框架设计",
//             collapsible: true,
//             children: [
//                 "first-springIntroduction.md",
//             ],
//         },
//         // 第三章 第二节
//         {
//             prefix: "frameDesignAndSourceCode/mybatisSourceCode/",
//             text: "2、mybatis框架设计",
//             collapsible: true,
//             children: [
//                 "first-mybatisintroduction.md",
//             ],
//         }
//     ]
// },
// ]

