# MVVM

姓名：李亚飞 

学校：南京大学

专业：软件工程

年级：大二

QQ：592511932

## 1. 导言

这是2022百度前端实战训练营大作业，实现了一个简单的MVVM框架，功能包括：

- 数据劫持
- 发布订阅模式
- 单向绑定
- 双向绑定

## 2. 主体代码结构

### 2.1 MVVM.html

### 2.2 MVVM.js

整合数据劫持observer和编译compile

### 2.3 compile.js

实现MVVM类的编译，主要包括元素和文本两类，实现单向绑定和双向绑定

### 2.4 observer.js

实现数据劫持功能，添加对象属性的get和set

### 2.5 watcher.js

实现发布订阅模式

## 3. 功能实现

- 数据劫持

  - 为每个属性值添加get和set方法

- 单向绑定

  - 改变输入框中的值，对应属性值未发生变化

    ![](https://seec-homework.oss-cn-shanghai.aliyuncs.com/image-20220721132628720.png)

    ![](https://seec-homework.oss-cn-shanghai.aliyuncs.com/image-20220721132703386.png)

  - 改变属性值，对应展示值发生变化

    ![](https://seec-homework.oss-cn-shanghai.aliyuncs.com/image-20220721132742924.png)

- 双向绑定

  - 从输入框中改变值，对应属性值改变

  ![](https://seec-homework.oss-cn-shanghai.aliyuncs.com/image-20220721132233858.png)

  ![](https://seec-homework.oss-cn-shanghai.aliyuncs.com/image-20220721132821026.png)

  - 改变属性值，对应展示值也发生改变

    ![](https://seec-homework.oss-cn-shanghai.aliyuncs.com/image-20220721132521374.png)

    ![](https://seec-homework.oss-cn-shanghai.aliyuncs.com/image-20220721132545095.png)

- 发布订阅模式

  - 属性值改变，对应的展示也发生变化

  ![](https://seec-homework.oss-cn-shanghai.aliyuncs.com/image-20220721132545095.png)

  ![](https://seec-homework.oss-cn-shanghai.aliyuncs.com/image-20220721132948217.png)

## 4. 单元测试

![](https://seec-homework.oss-cn-shanghai.aliyuncs.com/image-2022-07-22-UnitTest.png)
