#work flow

## 概况

work flow是工作流前端界面，用于360数据计算平台

#####!!!此界面是内部项目控件，不支持对外使用

## 安装

```shell
git clone https://github.com/zlstone/work_flow.git
```

依赖于jquery，初始化前将会进行检测全局变量检测
加载js文件前请确保jquery已正确加载并配置为全局变量，否则workflow不会进行初始化

## 目录
```
demo-- 事例目录
dist-- 代码文件目录
	|- dom.jsPlumb-1.6.2.js为依赖库
	|- workflow.js为未压缩代码
	 - workflow.min.js为压缩代码
src- 源码
```

## 使用

### 启动

页面需要有id为jsPlumb_demo的区域以供工作流进行初始化

jsPlumb_Z_config是可选的工作流配置项，必须在js加载前定义，配置项会覆盖对象内部配置，如果没有配置项，默认工作流会执行内置初始化数据

### 配置项

```
jsPlumb_Z_config为全局的workflow配置项
	"type" : [String] 数据获取类型，可选择XML，ajax, 对应读取XML文件或请求ajax接口， 默认ajax
	"url" : [String] 数据获取接口地址, 分别为XML文件地址或ajax请求地址，请注意由于XML需要调用DOM读取方法，type和url值必须相对应
	"display" : [String] 数据可视化展现方式，由于不同展现方式调用算法不同，如出现初始化失败的问题，请确认此项配置正确，默认workflow
	"submitUrl" : [String] 数据提交接口，提交可视化workflow数据，后台所需获取数据存放在$_POST['data']，关系图展现无需配置
	"submitBefore" : [Function] 执行submitUrl提交之前执行函数，函数返回值必须true，否则不会进行数据提交
	"submitAfter" : [Function] 执行submitUrl提交之后执行函数，参数为提交数据和返回数据
	"listConfig" : [Object] 右键显示菜单配置，key为中文显示，value为[Array]类型数据
	"activityId" : [Number/String] //当前关系图扩展点key值， 默认是1，根据数据处理，此项已无需配置
	"distance" : 120, // workflow数据展现工作流距离，如遇到过多工作流堆叠的情况，请增大此属性
	"radius" : 150, //relp数据展现工作流距离，如遇到过多工作流堆叠的情况，请增大此属性
	"debug" : false //默认关闭，开启后全局会增加实例化jsPlumb_Z全局对象
```

## 更新
* 1.1.0 : 关系图项目错误时添加tip显示
* 1.0.0 : fresh meat
