( (Z) ->
  if $ = $ or jQuery
    baseUrl = document.getElementsByTagName('script')
    baseUrl = baseUrl[ baseUrl.length - 1 ]
    baseUrl = baseUrl.src.split '/'
    baseUrl.pop()
    $.getScript baseUrl.join('/') + '/dom.jsPlumb-1.6.2.js', -> Z.init()
  else
    alert '抱歉！无依赖jquery对象存在！'
)(
  name : 'work_flow'
  author : 'leozhao'
  version : '1.1.0'
  instance : null # 实例存储
  DATA : null # 数据存储
  xmlDoc : null # xml对象存储
  selected :
    length : 0
  config :
    # jsPlumb_Z_config = { type : 'ajax', url : 'test.php' };
    # jsPlumb_Z_config = { type : 'XML', url : 'BMP.xml' };
    type : 'ajax'  #XML 或 ajax
    url : 'test.php' # ajax请求地址
    default_XML : '<?xml version="1.0" encoding="UTF-8"?><workflow name="engine_score_show_click" version="1"><node id="1" type="Start"></node><node id="2" type="End"/><variableHandler variable="params" class="VariableHandler"/></workflow>'
    default_ajax : {"name" : "new workflow","version" : "1","nodes" : {"1":{"id":"1","type":"Start","out":["3"]},"2":{"id":"2","type":"End"},"3":{"id":"3","type":"Action","string":"unknow","out":["4"]},"4":{"id":"4","type":"Action","string":"unknow","out":["5"]},"5":{"id":"5","type":"Action","string":"unknow","out":["2"]},length: 5}}
    display : 'workflow' # workflow 和 rely
    debug : no # 调试控制，开启后会在定义一个jsPlumb_Z的全局变量
    submitUrl : ''
    submitBefore : -> yes
    relationUrl : ''
    distance : 120 # 距离控制
    radius : 100 # 半径
    activityId : 1 # 起始id值
    parent : "#jsPlumb_demo" # 工作流展现区域id
    listConfig : {} # 列表控制
    disabled : no # 只读控制
  storage :
    isInit : false
    container : '#jsPlumb_demo_ctn'
    list : null
    isAdd : no
    isEdit : no
    id : 3
    target : null
  util :
    sin : -> parseInt( Math.sin( arguments[0] * Math.PI / 180 ) * 1000 ) / 1000
    cos : -> parseInt( Math.cos( arguments[0] * Math.PI / 180 ) * 1000 ) / 1000
    position : (d)->
      if d > 90
        _d = 180 - d
        {
          x : Math.round -@radius * @cos _d
          y : Math.round @radius * @sin _d
          skew : 90 - _d
          angle : d
          direction : -1
        }
      else if d is 90
        {
          x : 0
          y : @radius
          skew : 0
          angle : 90
          direction : 0
        }
      else
        {
          x : Math.round @radius * @cos d
          y : Math.round @radius * @sin d
          skew : 90 - d
          angle : d
          direction : 1
        }
    positions : (l)->
      _d = 180 / ( l + 1 )
      arr = []
      _radius = @radius
      @radius = _radius + _radius * ( 1 - 1 / l )
      `for(var _i=0; _i< l; _i++){
        arr.push( this.position( _d + _d * _i ) );
      }`
      @radius = _radius
      arr
  # 初始化
  init : ->
    if jsPlumb_Z_config
      $.extend @config, jsPlumb_Z_config
      if @config.debug
        window.jsPlumb_Z = @
    # 清空页面
    if document.getElementById 'jsPlumb_demo'
      $("#jsPlumb_demo").html ''
      if @config.display is 'workflow'
        return @initWorkFlow()
      if @config.display is 'rely'
        return @initRelation()
    else
      console.warning '没有可初始化目标，请配置id为jsPlumb_demo的区域，重新执行init方法！'
  # 初始化工作流界面
  initWorkFlow : ->
    # dom css binding events
    @initDom().initCss().initEvent()
    if @config.type is 'XML'
      # 读取文件
      @render @DATA = @translate @getXMLDom()
      @initJsPlumb()
      @storage.isInit = yes
    else if @config.type is 'ajax'
      # 请求ajax
      @getAjax (res)->
        @render @DATA = res
        @initJsPlumb()
        @storage.isInit = yes
  # 初始化关系图示界面
  initRelation : ()->
    @initRelationDom().initCss()
    # 覆盖配置半径
    @util.radius = @config.radius
    _this = @
    # 取消右键默认事件
    $('#jsPlumb_demo_ctn')[0].oncontextmenu = -> no
    $('#jsPlumb_demo').on 'click', -> _this.storage.list.hide()
    $('body').on 'mouseup', '.w', (ev)->
      if ev.button is 2
        _this.storage.target = $ @
        json = {}
        $.extend json, _this.DATA.nodes[@id].urls or {}
        _this.renderMenu json, { type : @dataset.type }
          .css
            left : ev.pageX
            top : ev.pageY
          .show()
    @getAjax (res)->
      @renderRelation @DATA = res
      @initJsPlumbRely()
  initDom : ->
    _this = @
    # 按钮dom添加
    $ '<div id="jsPlumb_demo_buttons" style="position:absolute;top: 0;left:0; z-index:100"><button class="jsPlumb_btn" id="jsPlumb_add"><span class="icon"><span class="icon-plus"></span></span>添加</button><button class="jsPlumb_btn" id="jsPlumb_line"><span class="icon"><span class="icon-minus"></span></span>连线</button><button class="jsPlumb_btn" id="jsPlumb_translate"><span class="icon"><span class="icon-upload"></span></span>提交数据</button></div><div id="jsPlumb_demo_ctn"></div>'
    .appendTo "#jsPlumb_demo"
    # 右键菜单dom添加
    @storage.list = $('<ul id="jsPlumb_list" class="list-group"></ul>').appendTo 'body'
      .on 'click', 'a', -> _this.listEvent @
    @
  initRelationDom : ->
    $('<div id="jsPlumb_demo_ctn"></div>').appendTo "#jsPlumb_demo"
    @storage.list = $('<ul id="jsPlumb_list" class="list-group"></ul>').appendTo 'body'
    @
  initCss : ->
    h = "#jsPlumb_demo * { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;}#jsPlumb_demo { width:100%; -webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;outline:0; posi
    ; }#jsPlumb_demo_ctn{ position:relative; width:100%; outline:0;}.demo-move .w{cursor:move;}.w { cursor:default; border:3px solid #ccc; -moz-border-radius:1em;border-radius:1em;text-align:center;z-index:20; position:absolute;background-color:#eeeeef;color:black;font-family:helvetica;padding:0 10px;font-size:1em; line-height:3em;}.w.active { border-color:green;}.w > input{ width:80%; border:0; outline:0; background:none; -webkit-box-shadow:none!important;box-shadow:none!important;}.aLabel {-webkit-transition:background-color 0.25s ease-in;-moz-transition:background-color 0.25s ease-in;transition:background-color 0.25s ease-in;}.aLabel._jsPlumb_hover, ._jsPlumb_source_hover, ._jsPlumb_target_hover {background-color:#1e8151;color:white;}.aLabel {background-color:white; padding:1px 1em; font:12px sans-serif; color:#444;z-index:21;border:1px dotted gray;opacity:0.8;filter:alpha(opacity=80);cursor: pointer;}.statemachine-demo ._jsPlumb_endpoint {z-index:3;}.dragHover { border:2px solid orange; }.jsPlumb_btn{display: inline-block;margin-bottom: 0;font-weight: normal;text-align: center;vertical-align: middle;cursor: pointer;padding: 0 10px 0 10px;font-size: 14px;line-height: 30px;border: none;outline: none;background-color: #3498db;color: #fff;-webkit-transition: .25s;transition: .25s;}#jsPlumb_demo button.active,#jsPlumb_demo button.active:hover{background-color: #ccc;box-shadow: inset 1px 1px 5px #333;}#jsPlumb_demo button:hover{background-color: #2980b9;}path { cursor:pointer;}div[data-type=Start]{background:#3366FF; color:#fff;-moz-border-radius:50%;border-radius:50%;border:0}div[data-type=End]{ background:#FF3300;color:#fff;-moz-border-radius:50%;border-radius:50%; border:0}.jsPlumb_box{border:1px solid #ccc; position:absolute;}.list-group {position:absolute;padding-left: 0;margin-bottom: 20px;display:none;z-index : 101;}.list-group li {position: relative;display: block;margin-bottom: -1px;background-color: #fff;border: 1px solid #ddd; min-width:100px;}.list-group>li:first-child {border-top-left-radius: 4px;border-top-right-radius: 4px;}.list-group>li:last-child {margin-bottom: 0;border-bottom-right-radius: 4px;border-bottom-left-radius: 4px;}.list-group li a{display:block;padding: 5px 10px;font-size:12px;line-height:20px;text-decoration:none;color:#555;}.list-group li a:hover,.list-group li.active a{background:#3498db;color: #fff;}.list-group>li{ position:relative;}.list-group>li>b{float:right;line-height: 32px;margin-right: 5px;color: #555;}.list-group>li>ul{ display:none; position:absolute; min-width:100%; left:100%; top:0; z-index:101; padding:0; margin:0;}.list-group>li:hover>ul{ display:block;}.list-group>li>ul>li{ min-width:100px;}#jsPlumb_demo_buttons .jsPlumb_btn{padding: 0 10px 0 30px!important;}#jsPlumb_demo .icon {line-height: 100%;position: relative;display: block;float: left;margin-left:-18px;margin-top:6px;}.icon .icon-plus {top: 1px;left: 0;border-width: 0 4px 4px 0;}.icon .icon-plus,.icon .icon-plus:after {position: absolute;width: 9px;height: 9px;border-style: solid;border-color: #fff;box-sizing: border-box;}.icon .icon-plus:after {content: '';top: 5px;left: 5px;border-width: 4px 0 0 4px;}.icon .icon-minus {position: absolute;top: 6px;left: 0;width: 14px;height: 4px;background-color: #fff;}.icon-download, .icon-upload {position: absolute;left: 4px;top: 4px;width: 4px;height: 10px;background-color: #fff;}.icon-download:before, .icon-upload:before {content: '';position: absolute;left: -4px;width: 0;height: 0;border-width: 6px;border-style: solid;}.icon-upload:before {top: -9px;border-color: transparent transparent #fff transparent;}.icon-download:after, .icon-upload:after {content: '';position: absolute;left: -7px;width: 13px;height: 3px;border-width: 0 3px 2px 3px;border-style: solid;border-color: #fff;}.icon-upload:after {top: 9px;}"
    oStyle = document.createElement "style"
    oStyle.type = "text/css"
    if oStyle.styleSheet
      oStyle.styleSheet.cssText = h
    else
      oStyle.appendChild document.createTextNode h
    document.getElementsByTagName("head")[0].appendChild oStyle
    @
  # 初始化事件绑定
  initEvent : ->
    _this = @
    # 取消右键默认事件
    $('#jsPlumb_demo_ctn')[0].oncontextmenu = -> no
    # 可拖动创建work按钮
    #
    $('#jsPlumb_add').on 'click', ->
      $('#jsPlumb_line').hasClass('active') and $('#jsPlumb_line').trigger 'click'
      if _this.storage.isAdd
        _this.storage.isAdd = no
        $(@).removeClass 'active'
      else
        _this.storage.isAdd = yes
        $(@).addClass 'active'
    # 可编辑流程箭头按钮
    #
    $('#jsPlumb_line').on 'click', ->
      $('#jsPlumb_add').hasClass('active') and $('#jsPlumb_add').trigger 'click'
      if $(@).hasClass 'active'
        $(@).removeClass 'active'
        _this.instance.draggable $ "#jsPlumb_demo_ctn .w"
        _this.instance.unmakeEverySource $("#jsPlumb_demo_ctn .w")
      else
        $(@).addClass 'active'
        _this.instance.destroyEveryDraggable $ '#jsPlumb_demo_ctn .w'
        _this.instance.makeSource $("#jsPlumb_demo_ctn .w").not('#2'), {
          anchor: "Continuous"
          connector: [ "StateMachine" ]
          isTarget:yes
          maxConnections:5
          uniqueEndpoint:yes
          # onMaxConnections: (info, e) -> alert "Maximum connections (" + info.maxConnections + ") reached"
        }
      no
    #
    # 编译成json数据
    #
    $('#jsPlumb_translate').on 'click', ->
      json = {}
      ( (id)->
        _json =
          id : id
          type : $( '#' + id ).attr 'data-type'
          string : $( '#' + id ).html()
          out : []
        _json.out.push s.targetId  for s in _this.instance.getConnections { source : id }
        json[_json.id] = _json
        arguments.callee o for o in _json.out if _json.out
      ).call(@, '1')
      if json['1']
        delete json['1'].string
      if json['2']
        delete json['2'].string
        delete json['2'].out
      _this.ajax { name : $('#Workflow_workflow_name').val(), nodes : json }
    #
    # 拖动框实现
    $("#jsPlumb_demo_ctn").on 'mousedown', (ev)->
      if _this.storage.list.is ':visible'
        _this.storage.list.hide()
        _this.storage.target = @
      else
        _this.selected = { length : 0 }
        $('#jsPlumb_demo .w').removeClass 'active'
        _this.mousedown ev
    #
    # 双击激活修改
    $("#jsPlumb_demo_ctn").on 'dblclick', '.w', ->
      if not _this.storage.isEdit
        $('#jsPlumb_add').trigger 'click' if $('#jsPlumb_add').hasClass('active')
        $('#jsPlumb_line').trigger 'click' if $('#jsPlumb_line').hasClass('active')
        _this.storage.isEdit = yes
        _this.storage.target = $(@)
        $(@).html '<input type="text" value="' + @innerHTML + '">'
          .children().focus()[0].selectionStart = 99
      no
    #
    # 失去焦点修改work string
    $('#jsPlumb_demo_ctn').on 'blur', '.w input', ->
      _this.storage.isEdit = no
      oParent = $(@).parent()
      str = @value
      oParent.html str
      _this.DATA.nodes[oParent[0].id].string = str
    #
    # 右键菜单
    $('body').on 'mouseup', '.w', (ev)->
      if ev.button is 2 and +@id > 2
        _this.storage.target = $ @
        json = {}
        $.extend json, _this.DATA.nodes[@id].urls or {}, _this.config.listConfig
        _this.renderMenu json, { type : @dataset.type or 'Action' }
          .css
            left : ev.pageX
            top : ev.pageY
          .show()

    # 删除流程块
    $('#jsPlumb_demo_ctn').attr('tabindex', 1).on 'keydown', (ev)=>
      if @storage.isEdit
        if ev.keyCode is 13
          @storage.target.find('input').blur()
        else if ev.keyCode is 27
          id = @storage.target[0].id
          @storage.target.html if @DATA.nodes[id] then @DATA.nodes[id].string else ''
          @storage.isEdit = no
      else
        keymap =
          '76' : => $('#jsPlumb_line').trigger 'click'
          '65' : => $('#jsPlumb_add').trigger 'click'
          '27' : =>
            $('#jsPlumb_add').hasClass('active') and $('#jsPlumb_add').trigger 'click'
            $('#jsPlumb_line').hasClass('active') and $('#jsPlumb_line').trigger 'click'
            if @selected.length
              @selected = { length : 0 }
              $('#jsPlumb_demo .w').removeClass 'active'
          '8' : =>
            if @selected.length
              arr = []
              min = @storage.id
              for k,v of @selected
                if k isnt 'length'
                  v.id < min and ( min = v.id )
                  arr.push v.innerHTML + '#' + v.id
              if confirm '确认删除' + arr.join('，') + '么？'
                @storage.id = min
                for k,v of @selected
                  if k isnt 'length'
                    id = v.id
                    _this.instance.detach s for s in _this.instance.getConnections { source : id }
                    _this.instance.detach t for t in _this.instance.getConnections { target : id }
                    _this.instance.removeElement v
                    delete @DATA.nodes[id]
            no
          '46' : -> @['8']()
        keymap[ev.keyCode] and keymap[ev.keyCode]()

    @
  #
  listEvent : (obj)->
    obj = $ obj
    if obj.parent().hasClass 'jsPlumb_types'
      @DATA.nodes[@storage.target[0].id].type = obj.html()
      @storage.target.attr 'data-type', obj.html()
      @storage.list.hide()
  # 新建
  newWork : (obj)->
    id  = @storage.id
    id++ while document.getElementById id
    return obj.remove() if obj.outerWidth() < 80
    obj.attr
      "class" : "w jsplumb-draggable jsplumb-droppable"
      "id" : id
      'data-type' : 'Action'
    .css 'height', 52
    $('#jsPlumb_line').hasClass('active') and $('#jsPlumb_line').trigger('click')
    @instance.draggable obj
    @instance.makeTarget obj, { dropOptions:{ hoverClass:"dragHover" }, anchor: "Continuous" }
    @DATA.nodes[id] = { id : id, string : '', type : 'Action' }
  #
  mousedown : (ev)->
    _iX = $('#jsPlumb_demo_ctn').offset().left
    _iY = $('#jsPlumb_demo_ctn').offset().top
    iX = ev.pageX - _iX
    iY = ev.pageY - _iY
    oDiv = $('<div class="jsPlumb_box" style="left: ' + iX + 'px;top:' + iY + 'px;"></div>').appendTo '#jsPlumb_demo_ctn'
    $(document).on 'mousemove', (ev)->
      X = ev.pageX - _iX
      Y = ev.pageY- _iY
      if X > iX
        oDiv.css 'width', X - iX
      else
        oDiv.css
          'width' : iX - X
          'left' : X
      if Y > iY
        oDiv.css 'height', Y - iY
      else
        oDiv.css
          'height' : iY - Y
          'top' : Y
    $(document).on 'mouseup', (ev)=>
      X = ev.pageX - _iX
      Y = ev.pageY - _iY
      $(document).off( 'mousemove' ).off 'mouseup'
      if @storage.isAdd
        @newWork oDiv
      else
        oDiv.remove()
        if Math.abs( iX - X ) > 30 and Math.abs( iY - Y ) > 30
          arr = []
          if X > iX
            arr[0] = iX
            arr[2] = X
          else
            arr[0] = X
            arr[2] = iX
          if Y > iY
            arr[1] = iY
            arr[3] = Y
          else
            arr[1] = Y
            arr[3] = iY
          @filterSelected.apply @, arr
  filterSelected : (iX, iY, X, Y)->
    _this = @
    $('#jsPlumb_demo .w').each ->
      return yes if @id in ['1', '2']
      l = $(@).offset()
      t = l.top - $('#jsPlumb_demo_ctn').offset().top
      _t = t + $(@).outerHeight()
      l = l.left - $('#jsPlumb_demo_ctn').offset().left
      _l = l + $(@).outerWidth()
      if _t > iY and t < Y and _l > iX and l < X
        $(@).addClass 'active'
        _this.selected[ @id ] = @
        _this.selected.length = _this.selected.length + 1
      yes
    # console.log _this.selected
  # 获取服务器xml数据
  getXMLDom : ->
    xmlhttp = new window.XMLHttpRequest()
    xmlhttp.open "GET", 'BMP.xml', no
    xmlhttp.send null
    @xmlDoc = xmlhttp.responseXML.documentElement if xmlhttp.readyState is 4
  # 获取ajax数据
  getAjax : (fn)->
    if @config.url
      $.getJSON @config.url, null, (data)=> fn and fn.call @, data
    else
      fn.call @, @config.default_ajax
  ajax : (json)->
    _this = @
    if @config.submitUrl
      if confirm '数据将提交给后台，确认继续，取消将中断该操作'
        if _this.config.submitBefore and _this.config.submitBefore json
          $.post @config.submitUrl, { data : JSON.stringify(json) },
            (data)->
              if +data
                alert '数据提交成功！'
                _this.config.submitAfter and _this.config.submitAfter json, data
              else
                alert data
    else
      console.log json
      console.log JSON.stringify json
      alert '未设置数据发送地址！请查看console校验数据！'
  #
  # 获取图形数据
  #
  translate : (xml) ->
    json = {};
    json.name = $(xml).attr 'name'
    json.version = $(xml).attr 'version'
    json.nodes = {};
    aLi = $(xml).find('node').each  (index) ->
      _json =
        id : @id
        type : $(@).attr('type')
      if ( oString = $(@).find('string') ).length
        _json.string = oString.text()
      if (aNodes = $(@).find('outNode')).length
        arr = []
        aNodes.each -> arr.push @id
        _json.out = arr
      json.nodes[_json.id] = _json
      json.nodes.length = index + 1
      yes
    # console.log(json);
    json
  #
  # 渲染右键菜单
  #
  renderMenu : (json, config)->
    if json
      str = ''
      for k,v of json
        if toString.call( v ) is '[object String]'
          str += '<li><a href="' + v + '">' + k + '</a></li>'
        else
          str += '<li><b>&raquo;</b><a href="javascript:;">' + k + '</a>'
          str += '<ul>'
          for _v in v
            str += '<li class="jsPlumb_types' + ( if config.type is _v then ' active' else '' ) + '"><a href="javascript:;">' + _v + '</a></li>'
          str += '</ul></li>'
      @storage.list.html str
    else
      @storage.list
  #
  # 渲染工作流
  #
  render : ->
    dis = @config.distance
    sourceMap = {}
    iMaxTop = 0
    data = arguments[0].nodes
    ( (data, i, params) ->
      w = data[i]
      if `i in sourceMap`
        # 已在缓存记录中，修正该工作块位置
        # console.log '_' + i
        sourceMap[i].push params.p if sourceMap[i].indexOf( params.p ) is -1
        _w = $ "##{w.id}"
        t = 0
        l = []
        for v in sourceMap[i]
          _t = $( "##{v}" ).position().top
          t = if _t > t then _t else t
        v = $ "##{sourceMap[i][0]}"
        l = Math.round v.position().left + v.width() / 2 + ( sourceMap[i].length / 2 | 0 ) * dis - $("##{w.id}").width() / 2
        t = Math.round t + dis
      else
        # 未缓存，展现工作块
        sourceMap[i] = if params then [ params.p ] else 1   # 填入缓存
        # console.log i, params
        # 创建dom
        _w = $ "<div class=\"w jsplumb-draggable\" id=\"#{w.id}\" data-type=\"#{w.type}\">#{w.string or w.type}</div>"
          .appendTo '#jsPlumb_demo_ctn'
        # 修正top left值
        t = if params then Math.round params.t else 0
        l = if params then Math.round params.l - ( _w.width() / 2 ) else Math.round ( $('#jsPlumb_demo').width() - _w.width() ) / 2
      _w.css { top: t, left: l }
      iMaxTop = t if t > iMaxTop
      if w.out
        # 工作块有输出项
        threshold = w.out.length / 2 # 阈值，左右分发
        params =
          l : l + ( _w.width() / 2 ) - ( threshold | 0 ) * dis #
          t : t + dis # 高度向下延伸，距离为dis的值
          p : w.id # 记录分支处id
        if w.out.length
          for o in w.out
            # 递归回调
            arguments.callee data, o,
              l : params.l + _j * dis + if w.out.length % 2 is 0 and _j >= threshold then dis else 0 # 自左至右依次叠加dis
              t : params.t
              p : params.p
        else if w.type is 'Start'
          arguments.callee data, 2, params
      yes
    ).call @, data, @config.activityId
    $('#jsPlumb_demo_ctn').height $('#2').position().top + 60
    @
  #
  # 渲染关系图
  #
  # 过滤数据
  filterRelationData : (nodes) ->
    nodes = JSON.parse nodes
    str = ''
    for k,w of nodes
      str += '<div class="w jsplumb-draggable" id="' + w.id + '" data-type="' + w.type + '">' + w.string + '</div>'
      if w.out
        for o in w.out
          o = nodes[o]
          if not o.in
            o.in = []
            o._in = {}
          o.in.push w.id
          o._in[w.id] = 1
    # console.log JSON.parse JSON.stringify nodes
    $( '#jsPlumb_demo_ctn' ).html str
    # console.log nodes
    nodes
  # 渲染
  renderRelation : (data)->
    nodes = @filterRelationData JSON.stringify data.nodes
    # return no
    record = {}
    #
    L = $('#jsPlumb_demo').width() / 2
    T = 0
    radius = @config.radius
    # 循环数据，展现图像
    MAX =
      x : 0
      y : 0
      z : 0
    record = {}
    # 递归输入数据
    ( (id, position)->
      node = nodes[id]
      _node = $ "##{node.id}"
      unless record[id]
        if position.direction
          W = _node.outerWidth()
          p =
            left : position.x - if position.direction > 0 then W else 0
            top : position.y - _node.outerHeight()
          position.x = p.left + W / 2
        else
          p =
            left : position.x - _node.outerWidth() / 2
            top : position.y - _node.outerHeight()
        $.extend p, node.style, { "border-radius" : if node.type isnt 'Action' then 0 else '1em' }
        _node.css p
        _node.attr node.attr if node.attr
        # console.log id + ' : ' + JSON.stringify position
        # console.log id + ' : ' + JSON.stringify p
        MAX.x = p.left if MAX.x > p.left
        MAX.y = p.top if MAX.y > p.top
        record[id] = 1
      if node.in
        # 剔除输入等于输出
        if node.out
          for _in,i in node.in
            node.in.splice i, 1 if _in is node.out[0]
        # 计算输入坐标
        pArray = @util.positions node.in.length
        i = 0
        while _in = node.in.shift()
          arguments.callee.call @, _in,
            x : Math.round position.x - pArray[i].x
            y : Math.round position.y - pArray[i].y
            skew : pArray[i].skew
            angle : pArray[i].angle
            direction : pArray[i].direction
          i++
    ).call @, @config.activityId, { x : L, y : T, skew : 0, direction : 0 }
    # # 递归输出数据
    ( (id, position) ->
      node = nodes[id]
      _node = $ '#' +node.id
      if not record[id]
        if position.direction
          W = _node.outerWidth()
          p =
              left : position.x - if position.direction < 0 then W else 0
              top : position.y
          position.x = p.left + W / 2
        else
          p =
            left : position.x - _node.outerWidth() / 2
            top : position.y
        _node.css $.extend p, node.style, {
          "border-radius" : if node.type isnt 'Action' then 0 else '1em'
          border: 'none'
        	}
        _node.attr node.attr if node.attr
        MAX.x = position.x if MAX.x > position.x
        MAX.z = position.y if MAX.z < position.y
        record[id] = 1
      if node.out
        `_out in node._in` and node.out.splice i, 1 for _out,i in node.out if node.type isnt 'Action'
        # 计算输出坐标
        pArray = @util.positions( node.out.length ).reverse()
        # 遍历输出数据
        i = 0
        while _out = node.out.shift()
          arguments.callee.call @, _out,
            x : position.x + pArray[i].x
            y : position.y + pArray[i].y
            skew : pArray[i].skew
            angle : pArray[i].angle
            direction : pArray[i].direction
          i++
      # console.log id + ' : ' + JSON.stringify pArray
    ).call @, @config.activityId, { x : L, y : T, skew : 0, direction : 0 }
    # console.log @storage.targetId
    # console.log MAX
    $('#jsPlumb_demo_ctn').css
      'top' : Math.abs MAX.y
      'left' : Math.abs MAX.x
    .parent().css 'height' : Math.abs( MAX.y ) + MAX.z + 60

  #
  # 初始化图像
  #
  initJsPlumb : ->
    # jsPlumb初始化
    @instance = jsPlumb_work = jsPlumb.getInstance
      anchor: "Continuous",
      connector: [ "StateMachine" ],
      PaintStyle : { strokeStyle:"#5c96bc", lineWidth:2, outlineColor:"transparent", outlineWidth:4 },
      HoverPaintStyle : {strokeStyle:"#1e8151", lineWidth:2 },
      ConnectionOverlays : [
        [ "Arrow", { location:1, id:"arrow", width: 14; length:10; foldback:0.8 } ],
        [ "Label", { label:"FOO", id:"label", cssClass:"aLabel" }]
      ],
      Endpoint : [ "Dot", {radius:2} ],
      Container:"jsPlumb_demo_ctn"
    jsPlumb_work.draggable $ "#jsPlumb_demo_ctn .w"
    # bind a connection listener. note that the parameter passed to this function contains more than
    # just the new connection - see the documentation for a full list of what is included in 'info'.
    # this listener sets the connection's internal
    # id as the label overlay's text.
    jsPlumb_work.bind "connection", (info) -> info.connection.getOverlay("label").setLabel info.target.id
    # bind a click listener to each connection; the connection is deleted. you could of course
    # just do this: jsPlumb.bind("click", jsPlumb.detach), but I wanted to make it clear what was
    # happening.
    jsPlumb_work.bind "click", (conn, originalEvent) ->
      jsPlumb_work.detach conn if confirm "确认删除链接 从 " + conn.sourceId + " 到 " + conn.targetId + "?"

    jsPlumb_work.bind "connectionDrag", (connection) ->
      jsPlumb_work.unmakeTarget $('#' + v.targetId) for v in jsPlumb_work.getConnections { source : connection.sourceId }
    jsPlumb_work.bind "connectionDragStop", (connection) ->
      jsPlumb_work.makeTarget $('#' + v.targetId) for v in jsPlumb_work.getConnections { source : connection.sourceId }
      # console.log "connection " + connection.id + " was dragged"
    # initialise all '.w' elements as connection targets.
    jsPlumb_work.makeTarget $("#jsPlumb_demo_ctn .w").not('#1'), { dropOptions:{ hoverClass:"dragHover" }, anchor: "Continuous" }
    # jsPlumb.makeTarget $("#2"), { dropOptions:{ hoverClass:"dragHover" }, anchor: [ 'Top' ] }

    # and finally, make a couple of connections
    nodes = @DATA.nodes
    for k,w of nodes
      if w.out
        for t in w.out
          jsPlumb_work.connect { source : w.id, target : t },
            anchor: "Continuous"
            connector: [ "StateMachine" ]
  #
  # 初始化关系图
  initJsPlumbRely : ->
    @instance = jsPlumb_rely = jsPlumb.getInstance
      anchor: "Continuous",
      connector: [ "StateMachine" ],
      PaintStyle : { strokeStyle:"#5c96bc", lineWidth:2, outlineColor:"transparent", outlineWidth:4 },
      HoverPaintStyle : {strokeStyle:"#1e8151", lineWidth:2 },
      ConnectionOverlays : [
        [ "Arrow", { location:1, id:"arrow", width: 14; length:10; foldback:0.8 } ]
      ],
      Endpoint : [ "Dot", {radius:2} ],
      Container:"jsPlumb_demo_ctn"
    jsPlumb_rely.draggable $ "#jsPlumb_demo_ctn .w"
    for k,w of @DATA.nodes
      if w.out
        for t in w.out
          jsPlumb_rely.connect { source : '' + w.id, target : '' + ( t.id or t ) },
            anchor: "Continuous"
            connector: [ "StateMachine" ]
)
