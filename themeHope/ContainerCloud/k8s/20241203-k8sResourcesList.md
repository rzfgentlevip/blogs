---
# 这是文章的标题
title: K8S资源清单
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 5
# 设置作者
author: bugcode
# 设置写作时间
date: 2024-11-19
# 一个页面可以有多个分类
category:
  - K8S
# 一个页面可以有多个标签
tag:
  - k8s
  - docker
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: true
# 你可以自定义页脚
footer: 分布式
# 你可以自定义版权信息
copyright: bugcode
---

<!-- TOC -->
- [K8S资源清单](#k8s资源清单)
- [1 Kubernetes常用资源对象](#1-kubernetes常用资源对象)
- [2 对象资源格式](#2-对象资源格式)
- [3 配置清单模式创建Pod](#3-配置清单模式创建pod)
  - [3.1 Pod资源spec的containers字段解析](#31-pod资源spec的containers字段解析)
- [4 标签和标签选择器](#4-标签和标签选择器)
  - [4.1 标签](#41-标签)
  - [4.2 标签选择器](#42-标签选择器)
  - [4.3 节点选择器](#43-节点选择器)
  - [4.4 资源注解](#44-资源注解)

<!-- /TOC -->


# K8S资源清单

# 1 Kubernetes常用资源对象

依据资源的主要功能作为分类标准，`Kubernetes`的`API`对象大体可分为五个类别，如下：

| 类型                       | 名称                                                         |
| -------------------------- | ------------------------------------------------------------ |
| 工作负载(Workload)         | Pod、ReplicaSet、Deployment、StatefulSet、DaemonSet、Job、Cronjob |
| 负载均衡(Discovery &LB)    | Service、Ingress                                             |
| 配置和存储(Config&Storage) | Volume、CSI、ConfigMap、Secret、DownwardAPI                  |
| 集群(Cluster)              | Namespace、Node、Role、ClusterRole、RoleBinding、ClusterRoleBinding |
| 元数据(metadata)           | HPA、PodTemplate、LimitRange                                 |

# 2 对象资源格式

`Kubernetes API` 仅接受及响应`JSON`格式的数据（`JSON`对象），同时，为了便于使用，它也允许用户提供`YAML`格式的`POST`对象，但`API Server`需要实现自行将其转换为`JSON`格式后方能提交。`API Server`接受和返回的所有`JSON`对象都遵循同一个模式，它们都具有`kind`和`apiVersion`字段，用于标识对象所属的资源类型、`API`群组及相关的版本。

大多数的对象或列表类型的资源提供元数据信息，如名称、隶属的名称空间和标签等；`spec`则用于**定义用户期望的状态**，不同的资源类型，其状态的意义也各有不同，例如`Pod`资源最为核心的功能在于运行容器；而`status`则记录着活动对象的当前状态信息，它由`Kubernetes`系统自行维护，对用户来说为只读字段。

获取对象的`JSON`格式的配置清单可以通过"`kubectl get TYPE/NAME -o yaml`"命令来获取。

```shell
[root@k8s-master ~]# kubectl get pod nginx-67685f79b5-8rjk7 -o yaml    #获取该pod的配置清单
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: "2019-08-30T07:00:30Z"
  generateName: nginx-67685f79b5-
  labels:
    pod-template-hash: 67685f79b5
    run: nginx
  name: nginx-67685f79b5-8rjk7
  namespace: default
  ownerReferences:
  - apiVersion: apps/v1
    blockOwnerDeletion: true
    controller: true
    kind: ReplicaSet
    name: nginx-67685f79b5
    uid: 6de479a9-52f6-4581-8e06-884a84dab593
  resourceVersion: "244953"
  selfLink: /api/v1/namespaces/default/pods/nginx-67685f79b5-8rjk7
  uid: 0b6f5a87-4129-4b61-897a-6020270a846e
spec:
  containers:
  - image: nginx:1.12
    imagePullPolicy: IfNotPresent
    name: nginx
    resources: {}
    terminationMessagePath: /dev/termination-log
    terminationMessagePolicy: File
    volumeMounts:
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: default-token-s8mbf
      readOnly: true
  dnsPolicy: ClusterFirst
  enableServiceLinks: true
  nodeName: k8s-node1
  priority: 0
  restartPolicy: Always
  schedulerName: default-scheduler
  securityContext: {}
  serviceAccount: default
  serviceAccountName: default
  terminationGracePeriodSeconds: 30
  tolerations:
  - effect: NoExecute
    key: node.kubernetes.io/not-ready
    operator: Exists
    tolerationSeconds: 300
  - effect: NoExecute
    key: node.kubernetes.io/unreachable
    operator: Exists
    tolerationSeconds: 300
  volumes:
  - name: default-token-s8mbf
    secret:
      defaultMode: 420
      secretName: default-token-s8mbf
status:
  conditions:
  - lastProbeTime: null
    lastTransitionTime: "2019-08-30T07:00:30Z"
```

**创建资源的方法**

- `apiserver`仅接受`JSON`格式的资源定义
- `yaml`格式提供资源配置清单，`apiserver`可自动将其转为`json`格式，而后再提交

**大部分资源的配置清单由以下5个字段组成**

```shell
apiVersion: 指明api资源属于哪个群组和版本，同一个组可以有多个版本 group/version
	# kubectl api-versions  命令可以获取

kind:       资源类别，标记创建的资源类型，k8s主要支持以下资源类别
    Pod、ReplicaSet、Deployment、StatefulSet、DaemonSet、Job、Cronjob

metadata:   用于描述对象的属性信息，主要提供以下字段：
  name:          指定当前对象的名称，其所属的名称空间的同一类型中必须唯一
  namespace:     指定当前对象隶属的名称空间，默认值为default
  labels:        设定用于标识当前对象的标签，键值数据，常被用作挑选条件
  annotations:   非标识型键值数据，用来作为挑选条件，用于labels的补充

spec:       用于描述所期望的对象应该具有的状态（disired state），资源对象中最重要的字段。

status:     用于记录对象在系统上的当前状态（current state），本字段由kubernetes自行维护
```



`kubernetes`存在内嵌的格式说明，定义资源配置清单时，可以使用`kubectl explain`命令进行查看，如查看`Pod`这个资源的定义：

```shell
[root@k8s-master ~]# kubectl explain pods
KIND:     Pod
VERSION:  v1

DESCRIPTION:
     Pod is a collection of containers that can run on a host. This resource is
     created by clients and scheduled onto hosts.

FIELDS:
   apiVersion	<string>
     APIVersion defines the versioned schema of this representation of an
     object. Servers should convert recognized schemas to the latest internal
     value, and may reject unrecognized values. More info:
     https://git.k8s.io/community/contributors/devel/api-conventions.md#resources

   kind	<string>
     Kind is a string value representing the REST resource this object
     represents. Servers may infer this from the endpoint the client submits
     requests to. Cannot be updated. In CamelCase. More info:
     https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds

   metadata	<Object>
     Standard object's metadata. More info:
     https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata

   spec	<Object>
     Specification of the desired behavior of the pod. More info:
     https://git.k8s.io/community/contributors/devel/api-conventions.md#spec-and-status

   status	<Object>
     Most recently observed status of the pod. This data may not be up to date.
     Populated by the system. Read-only. More info:
     https://git.k8s.io/community/contributors/devel/api-conventions.md#spec-and-status
```

如果需要了解某一级字段表示的对象之下的二级对象字段时，只需要指定其二级字段的对象名称即可，三级和四级字段对象等的查看方式依次类推。例如查看`Pod`资源的`Spec`对象支持嵌套使用的二级字段:

```shell
[root@k8s-master ~]# kubectl explain pods.spec
RESOURCE: spec <Object>

DESCRIPTION:
     Specification of the desired behavior of the pod. More info:
     https://git.k8s.io/community/contributors/devel/api-conventions.md#spec-and-status

     PodSpec is a description of a pod.

FIELDS:
   activeDeadlineSeconds	<integer>
     Optional duration in seconds the pod may be active on the node relative to
     StartTime before the system will actively try to mark it failed and kill
     associated containers. Value must be a positive integer.

   affinity	<Object>
     If specified, the pod's scheduling constraints

   automountServiceAccountToken	<boolean>
     AutomountServiceAccountToken indicates whether a service account token
     should be automatically mounted.
 .....
```

**spec常用字段说明：**

```shell
spec
    containers  <[]Object> -required-   # 必选参数
        name    <string> -required-     # 指定容器名称，不可更新
        image   <string> -required-     # 指定镜像
        imagePullPolicy <string>        # 指定镜像拉取方式
            # Always: 始终从registory拉取镜像。如果镜像标签为latest，则默认值为Always
            # Never: 仅使用本地镜像
            # IfNotPresent: 本地不存在镜像时才去registory拉取。默认值
        env     <[]Object>              # 指定环境变量，使用 $(var) 引用,参考: configmap中模板
        command <[]string>              # 以数组方式指定容器运行指令，替代docker的ENTRYPOINT指令
        args    <[]string>              # 以数组方式指定容器运行参数，替代docker的CMD指令
        ports   <[]Object>              # 指定容器暴露的端口
            containerPort <integer> -required-  # 容器的监听端口
            name    <string>            # 为端口取名，该名称可以在service种被引用
            protocol  <string>          # 指定协议，默认TCP
            hostIP    <string>          # 绑定到宿主机的某个IP
            hostPort  <integer>         # 绑定到宿主机的端口
        readinessProbe <Object>         # 就绪性探测，确认就绪后提供服务
            initialDelaySeconds <integer>   # 容器启动后到开始就绪性探测中间的等待秒数
            periodSeconds <integer>     # 两次探测的间隔多少秒，默认值为10
            successThreshold <integer>  # 连续多少次检测成功认为容器正常，默认值为1。不支持修改
            failureThreshold <integer>  # 连续多少次检测成功认为容器异常，默认值为3
            timeoutSeconds   <integer>  # 探测请求超时时间
            exec    <Object>            # 通过执行特定命令来探测容器健康状态
                command <[]string>      # 执行命令，返回值为0表示健康，不自持shell模式
            tcpSocket <Object>          # 检测TCP套接字
                host <string>           # 指定检测地址，默认pod的IP
                port <string> -required-# 指定检测端口
            httpGet <Object>            # 以HTTP请求方式检测
                host    <string>        # 指定检测地址，默认pod的IP
                httpHeaders <[]Object>  # 设置请求头
                path    <string>        # 设置请求的location
                port <string> -required-# 指定检测端口
                scheme <string>         # 指定协议，默认HTTP
        livenessProbe   <Object>        # 存活性探测，确认pod是否具备对外服务的能力
            # 该对象中字段和readinessProbe一致
        lifecycle       <Object>        # 生命周期
            postStart   <Object>        # pod启动后钩子，执行指令或者检测失败则退出容器或者重启容器
                exec    <Object>        # 执行指令，参考readinessProbe.exec
                httpGet <Object>        # 执行HTTP，参考readinessProbe.httpGet
                tcpSocket <Object>      # 检测TCP套接字，参考readinessProbe.tcpSocket
            preStop     <Object>        # pod停止前钩子，停止前执行清理工作
                # 该对象中字段和postStart一致
    hostname    <string>                # 指定pod主机名
    nodeName    <string>                # 调度到指定的node节点
    nodeSelector    <map[string]string> # 指定预选的node节点
    hostIPC <boolean>                   # 使用宿主机的IPC名称空间，默认false
    hostNetwork <boolean>               # 使用宿主机的网络名称空间，默认false
    serviceAccountName  <string>        # Pod运行时的服务账号
    imagePullSecrets    <[]Object>      # 当拉取私密仓库镜像时，需要指定的密码密钥信息
        name            <string>        # secrets 对象名
```

# 3 配置清单模式创建Pod

```shell
[root@k8s-master ~]# mkdir manfests 
[root@k8s-master ~]# cd manfests/
[root@k8s-master manfests]# vim pod-demo.yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-demo
  namespace: default
  labels:
    app: myapp
    tier: frontend
spec:
  containers:
  - name: myapp
    image: ikubernetes/myapp:v1
  - name: busybox
    image: busybox:latest
    command:
    - "/bin/sh"
    - "-c"
    - "sleep 3600"

[root@k8s-master manfests]# kubectl create -f pod-demo.yaml 
pod/pod-demo created
[root@k8s-master manfests]#
[root@k8s-master manfests]# kubectl get pods 
NAME       READY   STATUS    RESTARTS   AGE
pod-demo   2/2     Running   0          15s
[root@k8s-master manfests]# kubectl describe pods pod-demo   #查看pod详细信息
[root@k8s-master manfests]# kubectl get pods -o wide 
NAME       READY   STATUS    RESTARTS   AGE    IP            NODE        NOMINATED NODE   READINESS GATES
pod-demo   2/2     Running   0          102s   10.244.1.17   k8s-node1   <none>           <none>
[root@k8s-master manfests]# 
[root@k8s-master manfests]# curl 10.244.1.17
Hello MyApp | Version: v1 | <a href="hostname.html">Pod Name</a>
[root@k8s-master manfests]# 
[root@k8s-master manfests]# kubectl logs pod-demo myapp   #查看pod-demo下myapp的日志
10.244.0.0 - - [03/Sep/2019:02:32:52 +0000] "GET / HTTP/1.1" 200 65 "-" "curl/7.29.0" "-"
[root@k8s-master manfests]# 
[root@k8s-master manfests]# kubectl exec -it pod-demo -c myapp -- /bin/sh   #进入myapp容器
/ #
```

## 3.1 Pod资源spec的containers字段解析

```shell
[root@k8s-master ~]# kubectl explain pods.spec.containers
name	<string>    指定容器名称

image	<string>    指定容器所需镜像仓库及镜像名，例如ikubernetes/myapp:v1

imagePullPolicy	<string>  （可取以下三个值Always,Never,IfNotpresent）
    Always：镜像标签为“latest”时，总是去指定的仓库中获取镜像
    Never：禁止去仓库中下载镜像，即仅使用本地镜像
    IfNotpresent：如果本地没有该镜像，则去镜像仓库中下载镜像
    
ports	<[]Object>  值是一个列表，由一到多个端口对象组成。例如：(名称(可后期调用) 端口号 协议 暴露在的地址上) 暴露端口只是提供额外信息的，不能限制系统是否真的暴露
	containerPort  <integer>  指定暴露的容器端口
	name	<string>  当前端口的名称
	hostIP	<string>   主机端口要绑定的主机IP
	hostPort	<integer>   主机端口，它将接收到请求通过NAT转发至containerPort字段指定的端口
	protocol	<string>    端口的协议，默认是TCP

args	<[]string>  传递参数给command 相当于docker中的CMD

command	<[]string>  相当于docker中的ENTRYPOINT
```

**镜像中的命令和pod中定义的命令关系说明：**

- 如果`pod`中没有提供`command`或者`args`，则使用`docker`中的`CMD`和`ENTRYPOINT`。
- 如果`pod`中提供了`command`但不提供`args`，则使用提供的`command`，忽略`docker`中的`Cmd`和`Entrypoint`。
- 如果`pod`中只提供了`args`，则`args`将作为参数提供给`docker`中的`Entrypoint`使用。
- 如果`pod`中同时提供了`command`和`args`，则`docker`中的`cmd`和`Entrypoint`将会被忽略，`pod`中的`args`将最为参数给`cmd`使用。

# 4 标签和标签选择器

## 4.1 标签

标签是`Kubernetes`极具特色的功能之一，它能够附加于`Kubernetes`的任何资源对象之上。简单来说，标签就是“键值”类型的数据，可以在资源创建时直接指定，也可以随时按需添加到活动对象中。而后即可由标签选择器进行匹配度检查从而完成资源挑选。一个对象可拥有不止一个标签，而同一个标签也可以被添加到至多个资源之上。

```shell
key=value
    key：字母、数字、_、-、.  只能以字母或者数字开头
    value：可以为空，只能以字母或者数字开头及结尾，中间可以使用字母、数字、_、-、.
    在实际环境中，尽量做到见名知意，且尽可能保持简单
```



```shell
[root@k8s-master ~]# kubectl get pods --show-labels     #查看pod信息时，并显示对象的标签信息
NAME       READY   STATUS    RESTARTS   AGE     LABELS
pod-demo   2/2     Running   5          5h13m   app=myapp,tier=frontend

[root@k8s-master ~]# kubectl get pods -l app   #过滤包含app标签的pod
NAME       READY   STATUS    RESTARTS   AGE
pod-demo   2/2     Running   5          5h20m

[root@k8s-master ~]# kubectl get pods -l app,tier    #过滤同时包含app，tier标签的pod
NAME       READY   STATUS    RESTARTS   AGE
pod-demo   2/2     Running   5          5h20m

[root@k8s-master ~]# kubectl get pods -L app   #显示有app键的标签信息
NAME       READY   STATUS    RESTARTS   AGE     APP
pod-demo   2/2     Running   5          5h21m   myapp

[root@k8s-master ~]# kubectl get pods -L app,tier    #显示有app和tier键的标签信息
NAME       READY   STATUS    RESTARTS   AGE     APP     TIER
pod-demo   2/2     Running   5          5h21m   myapp   frontend
```



1）给已有的`pod`添加标签，通过`kubectl label`命令

```shell
[root@k8s-master ~]# kubectl label --help 
Usage:
  kubectl label [--overwrite] (-f FILENAME | TYPE NAME) KEY_1=VAL_1 ... KEY_N=VAL_N
[--resource-version=version] [options]


[root@k8s-master ~]# kubectl label pods/pod-demo env=production    #给pod资源pod-demo添加env标签值为production
pod/pod-demo labeled
[root@k8s-master ~]# kubectl get pods --show-labels
NAME       READY   STATUS    RESTARTS   AGE     LABELS
pod-demo   2/2     Running   5          5h32m   app=myapp,env=production,tier=frontend
```

2）修改已有的标签的值

```shell
[root@k8s-master ~]# kubectl label pods/pod-demo env=testing --overwrite   #同上面添加标签一样，只是添加--overwrite参数
pod/pod-demo labeled
[root@k8s-master ~]# 
[root@k8s-master ~]# kubectl get pods --show-labels
NAME       READY   STATUS    RESTARTS   AGE     LABELS
pod-demo   2/2     Running   5          5h39m   app=myapp,env=testing,tier=frontend
```

## 4.2 标签选择器

标签选择器用于选择标签的查询条件或选择标准，`kubernetes API`目前支持两个选择器：**基于等值关系以及基于集合关系**。例如，`env=production`和`env!=qa`是基于等值关系的选择器，而`tier in(frontend,backend)`则是基于集合关系的选择器。使用标签选择器时还将遵循以下逻辑：

1）同时指定的多个选择器之间的逻辑关系为“与”操作

2）使用空值的标签选择器意味着每个资源对象都将被选中

3）空的标签选择器将无法选出任何资源。

- 等值关系标签选择器：

  "="、“==”和“!=”三种，其中前两个意义相同，都表示等值关系；最后一个表示不等关系。

- 集合关系标签选择器：

  KEY in(VALUE1,VALUE2,...)：指定的健名的值存在于给定的列表中即满足条件

  KEY notin(VALUE1,VALUE2,...)：指定的键名的值不存在与给定的列表中即满足条件

  KEY：所有存在此健名标签的资源。

  !KEY：所有不存在此健名标签的资源。



1）等值关系示例：



```shell
[root@k8s-master ~]# kubectl get pods -l app=myapp    #过滤标签键为app值为myapp的pod
NAME       READY   STATUS    RESTARTS   AGE
pod-demo   2/2     Running   6          6h11m

[root@k8s-master ~]# kubectl get pods -l app=myapp,env=testing    #过滤标签键为app值为myqpp，并且标签键为env值为testing的pod
NAME       READY   STATUS    RESTARTS   AGE
pod-demo   2/2     Running   6          6h11m

[root@k8s-master ~]# kubectl get pods -l app!=my    #过滤标签键为app值不为my的所有pod
NAME       READY   STATUS    RESTARTS   AGE
pod-demo   2/2     Running   6          6h17m
```



2）集合关系示例：

```shell
[root@k8s-master ~]# kubectl get pods -l "app in (myapp)"    #过滤键为app值有myapp的pod
NAME       READY   STATUS    RESTARTS   AGE
pod-demo   2/2     Running   6          6h51m

[root@k8s-master ~]# kubectl get pods -l "app notin (my)"    #过滤键为app值没有my的pod
NAME       READY   STATUS    RESTARTS   AGE
pod-demo   2/2     Running   6          6h59m
```



处此之外，`kubernetes`的诸多资源对象必须以标签选择器的方式关联到`pod`资源对象，例如`Service`、`Deployment`和`ReplicaSet`类型的资源等，它们在`spec`字段中嵌套使用嵌套的`“selector”`字段，通过`“matchlabels”`来指定标签选择器，有的甚至还支持使用`“matchExpressions”`构建复杂的标签选择器机制。

- matchLabels：通过直接给定键值对来指定标签选择器
- matchExpressions：基于表达式指定的标签选择器列表，每个选择器都形如“{key:KEY_NAME, operator:OPERATOR, values:[VALUE1,VALUE2,...]}”

## 4.3 节点选择器

`pod`节点选择器是标签及标签选择器的一种应用，它能够让`pod`对象基于集群中工作节点的标签来挑选倾向运行的目标节点。

```shell
#在定义pod资源清单时，可以通过nodeName来指定pod运行的节点，或者通过nodeSelector来挑选倾向的节点
[root@k8s-master ~]# kubectl explain pods.spec
   nodeName	<string>
     NodeName is a request to schedule this pod onto a specific node. If it is
     non-empty, the scheduler simply schedules this pod onto that node, assuming
     that it fits resource requirements.

   nodeSelector	<map[string]string>
     NodeSelector is a selector which must be true for the pod to fit on a node.
     Selector which must match a node's labels for the pod to be scheduled on
     that node. More info:
     https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
```



查看节点默认的标签

```shell
[root@k8s-master ~]# kubectl get nodes --show-labels
NAME         STATUS   ROLES    AGE    VERSION   LABELS
k8s-master   Ready    master   6d2h   v1.15.2   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=k8s-master,kubernetes.io/os=linux,node-role.kubernetes.io/master=
k8s-node1    Ready    <none>   6d1h   v1.15.2   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=k8s-node1,kubernetes.io/os=linux
k8s-node2    Ready    <none>   6d1h   v1.15.2   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=k8s-node2,kubernetes.io/os=linux
```

给节点添加标签

```shell
[root@k8s-master ~]# kubectl label nodes/k8s-node1 disktype=ssd
node/k8s-node1 labeled
[root@k8s-master ~]# kubectl get nodes --show-labels
NAME         STATUS   ROLES    AGE    VERSION   LABELS
k8s-master   Ready    master   6d2h   v1.15.2   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=k8s-master,kubernetes.io/os=linux,node-role.kubernetes.io/master=
k8s-node1    Ready    <none>   6d2h   v1.15.2   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,disktype=ssd,kubernetes.io/arch=amd64,kubernetes.io/hostname=k8s-node1,kubernetes.io/os=linux
k8s-node2    Ready    <none>   6d2h   v1.15.2   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=k8s-node2,kubernetes.io/os=linux
```



修改`yaml`文件，添加节点选择器`nodeSelector`，然后重新创建`pod`

```yaml
[root@k8s-master ~]# vim manfests/pod-demo.yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-demo
  namespace: default
  labels:
    app: myapp
    tier: frontend
spec:
  containers:
  - name: myapp
    image: ikubernetes/myapp:v1
    ports:
    - name: http
      containerPort: 80
  - name: busybox
    image: busybox:latest
    command:
    - "/bin/sh"
    - "-c"
    - "sleep 3600"
  nodeSelector:
    disktype: ssd
    
[root@k8s-master ~]# kubectl delete -f manfests/pod-demo.yaml    #删除上面创建的pod资源
pod "pod-demo" deleted
[root@k8s-master ~]# kubectl create -f manfests/pod-demo.yaml     #重新创建pod-demo资源
pod/pod-demo created
[root@k8s-master ~]# kubectl get pods -o wide     #查看pod，可以看到分配到了k8s-node1节点（也就是上面打上disktype标签的节点）
NAME       READY   STATUS    RESTARTS   AGE   IP            NODE        NOMINATED NODE   READINESS GATES
pod-demo   2/2     Running   0          16s   10.244.1.19   k8s-node1   <none>           <none>

[root@k8s-master ~]# kubectl describe pods pod-demo
......
Events:
  Type    Reason     Age   From                Message
  ----    ------     ----  ----                -------
  Normal  Scheduled  58s   default-scheduler   Successfully assigned default/pod-demo to k8s-node1
......
```



## 4.4 资源注解

除了标签（label）之外，Pod与其他各种资源还能使用资源注解（annotation）。与标签类似，注解也是“键值”类型的数据，不过它不能用于标签及挑选Kubernetes对象，仅可用于资源提供“元数据”信息。另外，注解中的元数据不受字符数量的限制，它可大可小，可以为结构化或非结构化形式，也支持使用在标签中禁止使用的其他字符。