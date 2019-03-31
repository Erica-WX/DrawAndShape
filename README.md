# DrawAndShape

------

2018/09/26

## 目录
[TOC]

### 1、功能简介

本项目允许用户使用鼠标自由绘制简单的几何图形，如线段、三角形、正方形、长方形、五边形、圆等；绘制完成后可以对所绘内容进行识别，并将识别结果显示在界面上，同时还支持对绘制内容及标注信息的存储和读取。

### 2、使用说明

#### 1、画图

把鼠标移动到画布上即可开始画图

#### 2、识别

抬起鼠标时即对当前的笔迹进行图形识别

#### 3、清除

点击下方的clean按钮，即可清空画布中的所有内容

#### 4、保存

点击下方的save按钮，即可保存当前画布的笔迹内容

#### 5、查看保存内容

点击下方getAll按钮，即可获取保存的所有内容，选取文件名，即可查看详细内容



### 3. 项目结构

​	DrawAndShape 项目中，使用分层体系结构风格，系统分为三层（展示层，业务逻辑层，数据层。展示层包含UI界面的实现，业务逻辑层包含业务逻辑处理的实现，数据层负责提供数据访问和数据持久化。

​	本项目使用 OpenCV 3.4.1 进行图形检测，使用文件系统进行存储。



### 4. 部署环境

#### 1、适用平台

全平台适用

#### 2、系统依赖配置

##### JDK

​	系统需要安装 JDK。如未安装 JDK，可以首先在网站下载，然后参考http://www.oracle.com/technetwork/java/javase/downloads/index.html 

​	jdk请使用64位的版本




##### OpenCV

​	本项目使用 OpenCV 3.4.1，部署时请参照 https://www.cnblogs.com/yezhang/p/4006134.html 。

一定要注意引入Java包和配置运行时参数



### 5、运行项目

在Intellij Idea 中import项目，运行DrawAndShapeApplication.java文件后，在浏览器中访问http://127.0.0.1:8091/draw.html即可运行。



### 6. 逻辑实现

​	本项目检测图形时使用OpenCV进行轮廓凸点拟合，根据凸点数目判断图形形状。



### 7. 参考项目

​	https://github.com/wohui/shape-color-dector

​	https://blog.csdn.net/gzh8579/article/details/79505691

​	https://www.cnblogs.com/yezhang/p/4006134.html





