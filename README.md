```shell
   _
  | |     ___   ___ 
  | |    / _ \ / _ \
  | |___|  __/| (_) |
   \_____\___| \___/
```
##work flow是工作流前端界面

## 安装

```shell
git clone https://github.com/zlstone/work_flow.git
```
依赖于jquery，初始化前将会进行检测全局变量检测
加载js文件前请确保jquery已正确加载并配置为全局变量，否则workflow不会进行初始化

## 目录
	dom.jsPlumb-1.6.2.js为依赖库
	workflow.js为未压缩代码
	workflow-ck.js为压缩代码
	测试环境请加载workflow.js方便调试
	线上环境请加载workflow-ck.js

## 配置项参数
```shell
jsPlumb_Z_config为全局的workflow配置项
	"type" : [String] 数据获取类型，可选择XML，ajax, 对应读取XML文件或请求ajax接口， 默认ajax
	"url" : [String] 数据获取接口地址, 分别为XML文件地址或ajax请求地址，请注意由于XML需要调用DOM读取方法，type和url值必须相对应
	"display" : [String] 数据可视化展现方式，由于不同展现方式调用算法不同，如出现初始化失败的问题，请确认此项配置正确，默认workflow
	"submitUrl" : [String] 数据提交接口，提交可视化workflow数据，后台所需获取数据存放在$_POST['data']，关系图展现无需配置
	"listConfig" : [Object] 右键显示菜单配置，key为中文显示，value为[Array]类型数据
	"activityId" : [Number/String] //当前关系图扩展点key值， 默认是1，根据数据处理，此项已无需配置
	"distance" : 120, // workflow数据展现工作流距离，如遇到过多工作流堆叠的情况，请增大此属性
	"radius" : 150, //relp数据展现工作流距离，如遇到过多工作流堆叠的情况，请增大此属性
	"debug" : false //默认关闭，开启后全局会增加实例化jsPlumb_Z全局对象
```
## workflow配置范例
```shell
window.jsPlumb_Z_config ={
	type : 'ajax',
	url : 'test.php',
	submitUrl : '', 
	listConfig : {
		'类型' : [ 'Action', 'ParallelSplit','Synchronization', 'SubWorkflow' ]
	}, //右键菜单配置
}
```
## rely配置范例
```shell
window.jsPlumb_Z_config ={
		type : 'ajax',
		url : 'test.php?id=1', //数据获取接口
		display : 'rely', //workflow | rely
	}
```
