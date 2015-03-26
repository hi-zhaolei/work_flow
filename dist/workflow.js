(function(Z) {
  var $, baseUrl;
  if ($ = $ || jQuery) {
    baseUrl = document.getElementsByTagName('script');
    baseUrl = baseUrl[baseUrl.length - 1];
    baseUrl = baseUrl.src.split('/');
    baseUrl.pop();
    return $.getScript(baseUrl.join('/') + '/dom.jsPlumb-1.6.2.js', function() {
      return Z.init();
    });
  } else {
    return alert('抱歉！无依赖jquery对象存在！');
  }
})({
  name: 'work_flow',
  author: 'leozhao',
  version: '1.1.0',
  instance: null,
  DATA: null,
  xmlDoc: null,
  selected: {
    length: 0
  },
  config: {
    type: 'ajax',
    url: 'test.php',
    default_XML: '<?xml version="1.0" encoding="UTF-8"?><workflow name="engine_score_show_click" version="1"><node id="1" type="Start"></node><node id="2" type="End"/><variableHandler variable="params" class="VariableHandler"/></workflow>',
    default_ajax: {
      "name": "new workflow",
      "version": "1",
      "nodes": {
        "1": {
          "id": "1",
          "type": "Start",
          "out": ["3"]
        },
        "2": {
          "id": "2",
          "type": "End"
        },
        "3": {
          "id": "3",
          "type": "Action",
          "string": "unknow",
          "out": ["4"]
        },
        "4": {
          "id": "4",
          "type": "Action",
          "string": "unknow",
          "out": ["5"]
        },
        "5": {
          "id": "5",
          "type": "Action",
          "string": "unknow",
          "out": ["2"]
        },
        length: 5
      }
    },
    display: 'workflow',
    debug: false,
    submitUrl: '',
    submitBefore: function() {
      return true;
    },
    relationUrl: '',
    distance: 120,
    radius: 100,
    activityId: 1,
    parent: "#jsPlumb_demo",
    listConfig: {},
    disabled: false
  },
  storage: {
    isInit: false,
    container: '#jsPlumb_demo_ctn',
    list: null,
    isAdd: false,
    isEdit: false,
    id: 3,
    target: null
  },
  util: {
    sin: function() {
      return parseInt(Math.sin(arguments[0] * Math.PI / 180) * 1000) / 1000;
    },
    cos: function() {
      return parseInt(Math.cos(arguments[0] * Math.PI / 180) * 1000) / 1000;
    },
    position: function(d) {
      var _d;
      if (d > 90) {
        _d = 180 - d;
        return {
          x: Math.round(-this.radius * this.cos(_d)),
          y: Math.round(this.radius * this.sin(_d)),
          skew: 90 - _d,
          angle: d,
          direction: -1
        };
      } else if (d === 90) {
        return {
          x: 0,
          y: this.radius,
          skew: 0,
          angle: 90,
          direction: 0
        };
      } else {
        return {
          x: Math.round(this.radius * this.cos(d)),
          y: Math.round(this.radius * this.sin(d)),
          skew: 90 - d,
          angle: d,
          direction: 1
        };
      }
    },
    positions: function(l) {
      var arr, _d, _radius;
      _d = 180 / (l + 1);
      arr = [];
      _radius = this.radius;
      this.radius = _radius + _radius * (1 - 1 / l);
      for(var _i=0; _i< l; _i++){
        arr.push( this.position( _d + _d * _i ) );
      };
      this.radius = _radius;
      return arr;
    }
  },
  init: function() {
    if (jsPlumb_Z_config) {
      $.extend(this.config, jsPlumb_Z_config);
      if (this.config.debug) {
        window.jsPlumb_Z = this;
      }
    }
    if (document.getElementById('jsPlumb_demo')) {
      $("#jsPlumb_demo").html('');
      if (this.config.display === 'workflow') {
        return this.initWorkFlow();
      }
      if (this.config.display === 'rely') {
        return this.initRelation();
      }
    } else {
      return console.warning('没有可初始化目标，请配置id为jsPlumb_demo的区域，重新执行init方法！');
    }
  },
  initWorkFlow: function() {
    this.initDom().initCss().initEvent();
    if (this.config.type === 'XML') {
      this.render(this.DATA = this.translate(this.getXMLDom()));
      this.initJsPlumb();
      return this.storage.isInit = true;
    } else if (this.config.type === 'ajax') {
      return this.getAjax(function(res) {
        this.render(this.DATA = res);
        this.initJsPlumb();
        return this.storage.isInit = true;
      });
    }
  },
  initRelation: function() {
    var _this;
    this.initRelationDom().initCss();
    this.util.radius = this.config.radius;
    _this = this;
    $('#jsPlumb_demo_ctn')[0].oncontextmenu = function() {
      return false;
    };
    $('#jsPlumb_demo').on('click', function() {
      return _this.storage.list.hide();
    });
    $('body').on('mouseup', '.w', function(ev) {
      var json;
      if (ev.button === 2) {
        _this.storage.target = $(this);
        json = {};
        $.extend(json, _this.DATA.nodes[this.id].urls || {});
        return _this.renderMenu(json, {
          type: this.dataset.type
        }).css({
          left: ev.pageX,
          top: ev.pageY
        }).show();
      }
    });
    return this.getAjax(function(res) {
      this.renderRelation(this.DATA = res);
      return this.initJsPlumbRely();
    });
  },
  initDom: function() {
    var _this;
    _this = this;
    $('<div id="jsPlumb_demo_buttons" style="position:absolute;top: 0;left:0; z-index:100"><button class="jsPlumb_btn" id="jsPlumb_add"><span class="icon"><span class="icon-plus"></span></span>添加</button><button class="jsPlumb_btn" id="jsPlumb_line"><span class="icon"><span class="icon-minus"></span></span>连线</button><button class="jsPlumb_btn" id="jsPlumb_translate"><span class="icon"><span class="icon-upload"></span></span>提交数据</button></div><div id="jsPlumb_demo_ctn"></div>').appendTo("#jsPlumb_demo");
    this.storage.list = $('<ul id="jsPlumb_list" class="list-group"></ul>').appendTo('body').on('click', 'a', function() {
      return _this.listEvent(this);
    });
    return this;
  },
  initRelationDom: function() {
    $('<div id="jsPlumb_demo_ctn"></div>').appendTo("#jsPlumb_demo");
    this.storage.list = $('<ul id="jsPlumb_list" class="list-group"></ul>').appendTo('body');
    return this;
  },
  initCss: function() {
    var h, oStyle;
    h = "#jsPlumb_demo * { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;}#jsPlumb_demo { width:100%; -webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;outline:0; posi ; }#jsPlumb_demo_ctn{ position:relative; width:100%; outline:0;}.demo-move .w{cursor:move;}.w { cursor:default; border:3px solid #ccc; -moz-border-radius:1em;border-radius:1em;text-align:center;z-index:20; position:absolute;background-color:#eeeeef;color:black;font-family:helvetica;padding:0 10px;font-size:1em; line-height:3em;}.w.active { border-color:green;}.w > input{ width:80%; border:0; outline:0; background:none; -webkit-box-shadow:none!important;box-shadow:none!important;}.aLabel {-webkit-transition:background-color 0.25s ease-in;-moz-transition:background-color 0.25s ease-in;transition:background-color 0.25s ease-in;}.aLabel._jsPlumb_hover, ._jsPlumb_source_hover, ._jsPlumb_target_hover {background-color:#1e8151;color:white;}.aLabel {background-color:white; padding:1px 1em; font:12px sans-serif; color:#444;z-index:21;border:1px dotted gray;opacity:0.8;filter:alpha(opacity=80);cursor: pointer;}.statemachine-demo ._jsPlumb_endpoint {z-index:3;}.dragHover { border:2px solid orange; }.jsPlumb_btn{display: inline-block;margin-bottom: 0;font-weight: normal;text-align: center;vertical-align: middle;cursor: pointer;padding: 0 10px 0 10px;font-size: 14px;line-height: 30px;border: none;outline: none;background-color: #3498db;color: #fff;-webkit-transition: .25s;transition: .25s;}#jsPlumb_demo button.active,#jsPlumb_demo button.active:hover{background-color: #ccc;box-shadow: inset 1px 1px 5px #333;}#jsPlumb_demo button:hover{background-color: #2980b9;}path { cursor:pointer;}div[data-type=Start]{background:#3366FF; color:#fff;-moz-border-radius:50%;border-radius:50%;border:0}div[data-type=End]{ background:#FF3300;color:#fff;-moz-border-radius:50%;border-radius:50%; border:0}.jsPlumb_box{border:1px solid #ccc; position:absolute;}.list-group {position:absolute;padding-left: 0;margin-bottom: 20px;display:none;z-index : 101;}.list-group li {position: relative;display: block;margin-bottom: -1px;background-color: #fff;border: 1px solid #ddd; min-width:100px;}.list-group>li:first-child {border-top-left-radius: 4px;border-top-right-radius: 4px;}.list-group>li:last-child {margin-bottom: 0;border-bottom-right-radius: 4px;border-bottom-left-radius: 4px;}.list-group li a{display:block;padding: 5px 10px;font-size:12px;line-height:20px;text-decoration:none;color:#555;}.list-group li a:hover,.list-group li.active a{background:#3498db;color: #fff;}.list-group>li{ position:relative;}.list-group>li>b{float:right;line-height: 32px;margin-right: 5px;color: #555;}.list-group>li>ul{ display:none; position:absolute; min-width:100%; left:100%; top:0; z-index:101; padding:0; margin:0;}.list-group>li:hover>ul{ display:block;}.list-group>li>ul>li{ min-width:100px;}#jsPlumb_demo_buttons .jsPlumb_btn{padding: 0 10px 0 30px!important;}#jsPlumb_demo .icon {line-height: 100%;position: relative;display: block;float: left;margin-left:-18px;margin-top:6px;}.icon .icon-plus {top: 1px;left: 0;border-width: 0 4px 4px 0;}.icon .icon-plus,.icon .icon-plus:after {position: absolute;width: 9px;height: 9px;border-style: solid;border-color: #fff;box-sizing: border-box;}.icon .icon-plus:after {content: '';top: 5px;left: 5px;border-width: 4px 0 0 4px;}.icon .icon-minus {position: absolute;top: 6px;left: 0;width: 14px;height: 4px;background-color: #fff;}.icon-download, .icon-upload {position: absolute;left: 4px;top: 4px;width: 4px;height: 10px;background-color: #fff;}.icon-download:before, .icon-upload:before {content: '';position: absolute;left: -4px;width: 0;height: 0;border-width: 6px;border-style: solid;}.icon-upload:before {top: -9px;border-color: transparent transparent #fff transparent;}.icon-download:after, .icon-upload:after {content: '';position: absolute;left: -7px;width: 13px;height: 3px;border-width: 0 3px 2px 3px;border-style: solid;border-color: #fff;}.icon-upload:after {top: 9px;}";
    oStyle = document.createElement("style");
    oStyle.type = "text/css";
    if (oStyle.styleSheet) {
      oStyle.styleSheet.cssText = h;
    } else {
      oStyle.appendChild(document.createTextNode(h));
    }
    document.getElementsByTagName("head")[0].appendChild(oStyle);
    return this;
  },
  initEvent: function() {
    var _this;
    _this = this;
    $('#jsPlumb_demo_ctn')[0].oncontextmenu = function() {
      return false;
    };
    $('#jsPlumb_add').on('click', function() {
      $('#jsPlumb_line').hasClass('active') && $('#jsPlumb_line').trigger('click');
      if (_this.storage.isAdd) {
        _this.storage.isAdd = false;
        return $(this).removeClass('active');
      } else {
        _this.storage.isAdd = true;
        return $(this).addClass('active');
      }
    });
    $('#jsPlumb_line').on('click', function() {
      $('#jsPlumb_add').hasClass('active') && $('#jsPlumb_add').trigger('click');
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        _this.instance.draggable($("#jsPlumb_demo_ctn .w"));
        _this.instance.unmakeEverySource($("#jsPlumb_demo_ctn .w"));
      } else {
        $(this).addClass('active');
        _this.instance.destroyEveryDraggable($('#jsPlumb_demo_ctn .w'));
        _this.instance.makeSource($("#jsPlumb_demo_ctn .w").not('#2'), {
          anchor: "Continuous",
          connector: ["StateMachine"],
          isTarget: true,
          maxConnections: 5,
          uniqueEndpoint: true
        });
      }
      return false;
    });
    $('#jsPlumb_translate').on('click', function() {
      var json;
      json = {};
      (function(id) {
        var o, s, _i, _j, _json, _len, _len1, _ref, _ref1, _results;
        _json = {
          id: id,
          type: $('#' + id).attr('data-type'),
          string: $('#' + id).html(),
          out: []
        };
        _ref = _this.instance.getConnections({
          source: id
        });
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          s = _ref[_i];
          _json.out.push(s.targetId);
        }
        json[_json.id] = _json;
        if (_json.out) {
          _ref1 = _json.out;
          _results = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            o = _ref1[_j];
            _results.push(arguments.callee(o));
          }
          return _results;
        }
      }).call(this, '1');
      if (json['1']) {
        delete json['1'].string;
      }
      if (json['2']) {
        delete json['2'].string;
        delete json['2'].out;
      }
      return _this.ajax({
        name: $('#Workflow_workflow_name').val(),
        nodes: json
      });
    });
    $("#jsPlumb_demo_ctn").on('mousedown', function(ev) {
      if (_this.storage.list.is(':visible')) {
        _this.storage.list.hide();
        return _this.storage.target = this;
      } else {
        _this.selected = {
          length: 0
        };
        $('#jsPlumb_demo .w').removeClass('active');
        return _this.mousedown(ev);
      }
    });
    $("#jsPlumb_demo_ctn").on('dblclick', '.w', function() {
      if (!_this.storage.isEdit) {
        if ($('#jsPlumb_add').hasClass('active')) {
          $('#jsPlumb_add').trigger('click');
        }
        if ($('#jsPlumb_line').hasClass('active')) {
          $('#jsPlumb_line').trigger('click');
        }
        _this.storage.isEdit = true;
        _this.storage.target = $(this);
        $(this).html('<input type="text" value="' + this.innerHTML + '">').children().focus()[0].selectionStart = 99;
      }
      return false;
    });
    $('#jsPlumb_demo_ctn').on('blur', '.w input', function() {
      var oParent, str;
      _this.storage.isEdit = false;
      oParent = $(this).parent();
      str = this.value;
      oParent.html(str);
      return _this.DATA.nodes[oParent[0].id].string = str;
    });
    $('body').on('mouseup', '.w', function(ev) {
      var json;
      if (ev.button === 2 && +this.id > 2) {
        _this.storage.target = $(this);
        json = {};
        $.extend(json, _this.DATA.nodes[this.id].urls || {}, _this.config.listConfig);
        return _this.renderMenu(json, {
          type: this.dataset.type || 'Action'
        }).css({
          left: ev.pageX,
          top: ev.pageY
        }).show();
      }
    });
    $('#jsPlumb_demo_ctn').attr('tabindex', 1).on('keydown', (function(_this) {
      return function(ev) {
        var id, keymap;
        if (_this.storage.isEdit) {
          if (ev.keyCode === 13) {
            return _this.storage.target.find('input').blur();
          } else if (ev.keyCode === 27) {
            id = _this.storage.target[0].id;
            _this.storage.target.html(_this.DATA.nodes[id] ? _this.DATA.nodes[id].string : '');
            return _this.storage.isEdit = false;
          }
        } else {
          keymap = {
            '76': function() {
              return $('#jsPlumb_line').trigger('click');
            },
            '65': function() {
              return $('#jsPlumb_add').trigger('click');
            },
            '27': function() {
              $('#jsPlumb_add').hasClass('active') && $('#jsPlumb_add').trigger('click');
              $('#jsPlumb_line').hasClass('active') && $('#jsPlumb_line').trigger('click');
              if (_this.selected.length) {
                _this.selected = {
                  length: 0
                };
                return $('#jsPlumb_demo .w').removeClass('active');
              }
            },
            '8': function() {
              var arr, k, min, s, t, v, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
              if (_this.selected.length) {
                arr = [];
                min = _this.storage.id;
                _ref = _this.selected;
                for (k in _ref) {
                  v = _ref[k];
                  if (k !== 'length') {
                    v.id < min && (min = v.id);
                    arr.push(v.innerHTML + '#' + v.id);
                  }
                }
                if (confirm('确认删除' + arr.join('，') + '么？')) {
                  _this.storage.id = min;
                  _ref1 = _this.selected;
                  for (k in _ref1) {
                    v = _ref1[k];
                    if (k !== 'length') {
                      id = v.id;
                      _ref2 = _this.instance.getConnections({
                        source: id
                      });
                      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                        s = _ref2[_i];
                        _this.instance.detach(s);
                      }
                      _ref3 = _this.instance.getConnections({
                        target: id
                      });
                      for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
                        t = _ref3[_j];
                        _this.instance.detach(t);
                      }
                      _this.instance.removeElement(v);
                      delete _this.DATA.nodes[id];
                    }
                  }
                }
              }
              return false;
            },
            '46': function() {
              return this['8']();
            }
          };
          return keymap[ev.keyCode] && keymap[ev.keyCode]();
        }
      };
    })(this));
    return this;
  },
  listEvent: function(obj) {
    obj = $(obj);
    if (obj.parent().hasClass('jsPlumb_types')) {
      this.DATA.nodes[this.storage.target[0].id].type = obj.html();
      this.storage.target.attr('data-type', obj.html());
      return this.storage.list.hide();
    }
  },
  newWork: function(obj) {
    var id;
    id = this.storage.id;
    while (document.getElementById(id)) {
      id++;
    }
    if (obj.outerWidth() < 80) {
      return obj.remove();
    }
    obj.attr({
      "class": "w jsplumb-draggable jsplumb-droppable",
      "id": id,
      'data-type': 'Action'
    }).css('height', 52);
    $('#jsPlumb_line').hasClass('active') && $('#jsPlumb_line').trigger('click');
    this.instance.draggable(obj);
    this.instance.makeTarget(obj, {
      dropOptions: {
        hoverClass: "dragHover"
      },
      anchor: "Continuous"
    });
    return this.DATA.nodes[id] = {
      id: id,
      string: '',
      type: 'Action'
    };
  },
  mousedown: function(ev) {
    var iX, iY, oDiv, _iX, _iY;
    _iX = $('#jsPlumb_demo_ctn').offset().left;
    _iY = $('#jsPlumb_demo_ctn').offset().top;
    iX = ev.pageX - _iX;
    iY = ev.pageY - _iY;
    oDiv = $('<div class="jsPlumb_box" style="left: ' + iX + 'px;top:' + iY + 'px;"></div>').appendTo('#jsPlumb_demo_ctn');
    $(document).on('mousemove', function(ev) {
      var X, Y;
      X = ev.pageX - _iX;
      Y = ev.pageY - _iY;
      if (X > iX) {
        oDiv.css('width', X - iX);
      } else {
        oDiv.css({
          'width': iX - X,
          'left': X
        });
      }
      if (Y > iY) {
        return oDiv.css('height', Y - iY);
      } else {
        return oDiv.css({
          'height': iY - Y,
          'top': Y
        });
      }
    });
    return $(document).on('mouseup', (function(_this) {
      return function(ev) {
        var X, Y, arr;
        X = ev.pageX - _iX;
        Y = ev.pageY - _iY;
        $(document).off('mousemove').off('mouseup');
        if (_this.storage.isAdd) {
          return _this.newWork(oDiv);
        } else {
          oDiv.remove();
          if (Math.abs(iX - X) > 30 && Math.abs(iY - Y) > 30) {
            arr = [];
            if (X > iX) {
              arr[0] = iX;
              arr[2] = X;
            } else {
              arr[0] = X;
              arr[2] = iX;
            }
            if (Y > iY) {
              arr[1] = iY;
              arr[3] = Y;
            } else {
              arr[1] = Y;
              arr[3] = iY;
            }
            return _this.filterSelected.apply(_this, arr);
          }
        }
      };
    })(this));
  },
  filterSelected: function(iX, iY, X, Y) {
    var _this;
    _this = this;
    return $('#jsPlumb_demo .w').each(function() {
      var l, t, _l, _ref, _t;
      if ((_ref = this.id) === '1' || _ref === '2') {
        return true;
      }
      l = $(this).offset();
      t = l.top - $('#jsPlumb_demo_ctn').offset().top;
      _t = t + $(this).outerHeight();
      l = l.left - $('#jsPlumb_demo_ctn').offset().left;
      _l = l + $(this).outerWidth();
      if (_t > iY && t < Y && _l > iX && l < X) {
        $(this).addClass('active');
        _this.selected[this.id] = this;
        _this.selected.length = _this.selected.length + 1;
      }
      return true;
    });
  },
  getXMLDom: function() {
    var xmlhttp;
    xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", 'BMP.xml', false);
    xmlhttp.send(null);
    if (xmlhttp.readyState === 4) {
      return this.xmlDoc = xmlhttp.responseXML.documentElement;
    }
  },
  getAjax: function(fn) {
    if (this.config.url) {
      return $.getJSON(this.config.url, null, (function(_this) {
        return function(data) {
          return fn && fn.call(_this, data);
        };
      })(this));
    } else {
      return fn.call(this, this.config.default_ajax);
    }
  },
  ajax: function(json) {
    var _this;
    _this = this;
    if (this.config.submitUrl) {
      if (confirm('数据将提交给后台，确认继续，取消将中断该操作')) {
        if (_this.config.submitBefore && _this.config.submitBefore(json)) {
          return $.post(this.config.submitUrl, {
            data: JSON.stringify(json)
          }, function(data) {
            if (+data) {
              alert('数据提交成功！');
              return _this.config.submitAfter && _this.config.submitAfter(json, data);
            } else {
              return alert(data);
            }
          });
        }
      }
    } else {
      console.log(json);
      console.log(JSON.stringify(json));
      return alert('未设置数据发送地址！请查看console校验数据！');
    }
  },
  translate: function(xml) {
    var aLi, json;
    json = {};
    json.name = $(xml).attr('name');
    json.version = $(xml).attr('version');
    json.nodes = {};
    aLi = $(xml).find('node').each(function(index) {
      var aNodes, arr, oString, _json;
      _json = {
        id: this.id,
        type: $(this).attr('type')
      };
      if ((oString = $(this).find('string')).length) {
        _json.string = oString.text();
      }
      if ((aNodes = $(this).find('outNode')).length) {
        arr = [];
        aNodes.each(function() {
          return arr.push(this.id);
        });
        _json.out = arr;
      }
      json.nodes[_json.id] = _json;
      json.nodes.length = index + 1;
      return true;
    });
    return json;
  },
  renderMenu: function(json, config) {
    var k, str, v, _i, _len, _v;
    if (json) {
      str = '';
      for (k in json) {
        v = json[k];
        if (toString.call(v) === '[object String]') {
          str += '<li><a href="' + v + '">' + k + '</a></li>';
        } else {
          str += '<li><b>&raquo;</b><a href="javascript:;">' + k + '</a>';
          str += '<ul>';
          for (_i = 0, _len = v.length; _i < _len; _i++) {
            _v = v[_i];
            str += '<li class="jsPlumb_types' + (config.type === _v ? ' active' : '') + '"><a href="javascript:;">' + _v + '</a></li>';
          }
          str += '</ul></li>';
        }
      }
      return this.storage.list.html(str);
    } else {
      return this.storage.list;
    }
  },
  render: function() {
    var data, dis, iMaxTop, sourceMap;
    dis = this.config.distance;
    sourceMap = {};
    iMaxTop = 0;
    data = arguments[0].nodes;
    (function(data, i, params) {
      var l, o, t, threshold, v, w, _i, _j, _len, _len1, _ref, _ref1, _t, _w;
      w = data[i];
      if (i in sourceMap) {
        if (sourceMap[i].indexOf(params.p) === -1) {
          sourceMap[i].push(params.p);
        }
        _w = $("#" + w.id);
        t = 0;
        l = [];
        _ref = sourceMap[i];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          v = _ref[_i];
          _t = $("#" + v).position().top;
          t = _t > t ? _t : t;
        }
        v = $("#" + sourceMap[i][0]);
        l = Math.round(v.position().left + v.width() / 2 + (sourceMap[i].length / 2 | 0) * dis - $("#" + w.id).width() / 2);
        t = Math.round(t + dis);
      } else {
        sourceMap[i] = params ? [params.p] : 1;
        _w = $("<div class=\"w jsplumb-draggable\" id=\"" + w.id + "\" data-type=\"" + w.type + "\">" + (w.string || w.type) + "</div>").appendTo('#jsPlumb_demo_ctn');
        t = params ? Math.round(params.t) : 0;
        l = params ? Math.round(params.l - (_w.width() / 2)) : Math.round(($('#jsPlumb_demo').width() - _w.width()) / 2);
      }
      _w.css({
        top: t,
        left: l
      });
      if (t > iMaxTop) {
        iMaxTop = t;
      }
      if (w.out) {
        threshold = w.out.length / 2;
        params = {
          l: l + (_w.width() / 2) - (threshold | 0) * dis,
          t: t + dis,
          p: w.id
        };
        if (w.out.length) {
          _ref1 = w.out;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            o = _ref1[_j];
            arguments.callee(data, o, {
              l: params.l + _j * dis + (w.out.length % 2 === 0 && _j >= threshold ? dis : 0),
              t: params.t,
              p: params.p
            });
          }
        } else if (w.type === 'Start') {
          arguments.callee(data, 2, params);
        }
      }
      return true;
    }).call(this, data, this.config.activityId);
    $('#jsPlumb_demo_ctn').height($('#2').position().top + 60);
    return this;
  },
  filterRelationData: function(nodes) {
    var k, o, str, w, _i, _len, _ref;
    nodes = JSON.parse(nodes);
    str = '';
    for (k in nodes) {
      w = nodes[k];
      str += '<div class="w jsplumb-draggable" id="' + w.id + '" data-type="' + w.type + '">' + w.string + '</div>';
      if (w.out) {
        _ref = w.out;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          o = _ref[_i];
          o = nodes[o];
          if (!o["in"]) {
            o["in"] = [];
            o._in = {};
          }
          o["in"].push(w.id);
          o._in[w.id] = 1;
        }
      }
    }
    $('#jsPlumb_demo_ctn').html(str);
    return nodes;
  },
  renderRelation: function(data) {
    var L, MAX, T, nodes, radius, record;
    nodes = this.filterRelationData(JSON.stringify(data.nodes));
    record = {};
    L = $('#jsPlumb_demo').width() / 2;
    T = 0;
    radius = this.config.radius;
    MAX = {
      x: 0,
      y: 0,
      z: 0
    };
    record = {};
    (function(id, position) {
      var W, i, node, p, pArray, _i, _in, _len, _node, _ref, _results;
      node = nodes[id];
      _node = $("#" + node.id);
      if (!record[id]) {
        if (position.direction) {
          W = _node.outerWidth();
          p = {
            left: position.x - (position.direction > 0 ? W : 0),
            top: position.y - _node.outerHeight()
          };
          position.x = p.left + W / 2;
        } else {
          p = {
            left: position.x - _node.outerWidth() / 2,
            top: position.y - _node.outerHeight()
          };
        }
        $.extend(p, node.style);
        if (node.type !== 'Action') {
          p['border-radius'] = 0;
        }
        _node.css(p);
        if (MAX.x > p.left) {
          MAX.x = p.left;
        }
        if (MAX.y > p.top) {
          MAX.y = p.top;
        }
        record[id] = 1;
      }
      if (node["in"]) {
        if (node.out) {
          _ref = node["in"];
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            _in = _ref[i];
            if (_in === node.out[0]) {
              node["in"].splice(i, 1);
            }
          }
        }
        pArray = this.util.positions(node["in"].length);
        i = 0;
        _results = [];
        while (_in = node["in"].shift()) {
          arguments.callee.call(this, _in, {
            x: Math.round(position.x - pArray[i].x),
            y: Math.round(position.y - pArray[i].y),
            skew: pArray[i].skew,
            angle: pArray[i].angle,
            direction: pArray[i].direction
          });
          _results.push(i++);
        }
        return _results;
      }
    }).call(this, this.config.activityId, {
      x: L,
      y: T,
      skew: 0,
      direction: 0
    });
    (function(id, position) {
      var W, i, node, p, pArray, _i, _len, _node, _out, _ref, _results;
      node = nodes[id];
      _node = $('#' + node.id);
      if (!record[id]) {
        if (position.direction) {
          W = _node.outerWidth();
          p = {
            left: position.x - (position.direction < 0 ? W : 0),
            top: position.y
          };
          position.x = p.left + W / 2;
        } else {
          p = {
            left: position.x - _node.outerWidth() / 2,
            top: position.y
          };
        }
        _node.css($.extend(p, node.style, {
          "border-radius": node.type !== 'Action' ? 0 : '1em',
          border: 'none'
        }.attr(node.attr)));
        if (MAX.x > position.x) {
          MAX.x = position.x;
        }
        if (MAX.z < position.y) {
          MAX.z = position.y;
        }
        record[id] = 1;
      }
      if (node.out) {
        if (node.type !== 'Action') {
          _ref = node.out;
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            _out = _ref[i];
            _out in node._in && node.out.splice(i, 1);
          }
        }
        pArray = this.util.positions(node.out.length).reverse();
        i = 0;
        _results = [];
        while (_out = node.out.shift()) {
          arguments.callee.call(this, _out, {
            x: position.x + pArray[i].x,
            y: position.y + pArray[i].y,
            skew: pArray[i].skew,
            angle: pArray[i].angle,
            direction: pArray[i].direction
          });
          _results.push(i++);
        }
        return _results;
      }
    }).call(this, this.config.activityId, {
      x: L,
      y: T,
      skew: 0,
      direction: 0
    });
    return $('#jsPlumb_demo_ctn').css({
      'top': Math.abs(MAX.y),
      'left': Math.abs(MAX.x)
    }).parent().css({
      'height': Math.abs(MAX.y) + MAX.z + 60
    });
  },
  initJsPlumb: function() {
    var jsPlumb_work, k, nodes, t, w, _results;
    this.instance = jsPlumb_work = jsPlumb.getInstance({
      anchor: "Continuous",
      connector: ["StateMachine"],
      PaintStyle: {
        strokeStyle: "#5c96bc",
        lineWidth: 2,
        outlineColor: "transparent",
        outlineWidth: 4
      },
      HoverPaintStyle: {
        strokeStyle: "#1e8151",
        lineWidth: 2
      },
      ConnectionOverlays: [
        [
          "Arrow", {
            location: 1,
            id: "arrow",
            width: 14,
            length: 10,
            foldback: 0.8
          }
        ], [
          "Label", {
            label: "FOO",
            id: "label",
            cssClass: "aLabel"
          }
        ]
      ],
      Endpoint: [
        "Dot", {
          radius: 2
        }
      ],
      Container: "jsPlumb_demo_ctn"
    });
    jsPlumb_work.draggable($("#jsPlumb_demo_ctn .w"));
    jsPlumb_work.bind("connection", function(info) {
      return info.connection.getOverlay("label").setLabel(info.target.id);
    });
    jsPlumb_work.bind("click", function(conn, originalEvent) {
      if (confirm("确认删除链接 从 " + conn.sourceId + " 到 " + conn.targetId + "?")) {
        return jsPlumb_work.detach(conn);
      }
    });
    jsPlumb_work.bind("connectionDrag", function(connection) {
      var v, _i, _len, _ref, _results;
      _ref = jsPlumb_work.getConnections({
        source: connection.sourceId
      });
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        _results.push(jsPlumb_work.unmakeTarget($('#' + v.targetId)));
      }
      return _results;
    });
    jsPlumb_work.bind("connectionDragStop", function(connection) {
      var v, _i, _len, _ref, _results;
      _ref = jsPlumb_work.getConnections({
        source: connection.sourceId
      });
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        _results.push(jsPlumb_work.makeTarget($('#' + v.targetId)));
      }
      return _results;
    });
    jsPlumb_work.makeTarget($("#jsPlumb_demo_ctn .w").not('#1'), {
      dropOptions: {
        hoverClass: "dragHover"
      },
      anchor: "Continuous"
    });
    nodes = this.DATA.nodes;
    _results = [];
    for (k in nodes) {
      w = nodes[k];
      if (w.out) {
        _results.push((function() {
          var _i, _len, _ref, _results1;
          _ref = w.out;
          _results1 = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            t = _ref[_i];
            _results1.push(jsPlumb_work.connect({
              source: w.id,
              target: t
            }, {
              anchor: "Continuous",
              connector: ["StateMachine"]
            }));
          }
          return _results1;
        })());
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  },
  initJsPlumbRely: function() {
    var jsPlumb_rely, k, t, w, _ref, _results;
    this.instance = jsPlumb_rely = jsPlumb.getInstance({
      anchor: "Continuous",
      connector: ["StateMachine"],
      PaintStyle: {
        strokeStyle: "#5c96bc",
        lineWidth: 2,
        outlineColor: "transparent",
        outlineWidth: 4
      },
      HoverPaintStyle: {
        strokeStyle: "#1e8151",
        lineWidth: 2
      },
      ConnectionOverlays: [
        [
          "Arrow", {
            location: 1,
            id: "arrow",
            width: 14,
            length: 10,
            foldback: 0.8
          }
        ]
      ],
      Endpoint: [
        "Dot", {
          radius: 2
        }
      ],
      Container: "jsPlumb_demo_ctn"
    });
    jsPlumb_rely.draggable($("#jsPlumb_demo_ctn .w"));
    _ref = this.DATA.nodes;
    _results = [];
    for (k in _ref) {
      w = _ref[k];
      if (w.out) {
        _results.push((function() {
          var _i, _len, _ref1, _results1;
          _ref1 = w.out;
          _results1 = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            t = _ref1[_i];
            _results1.push(jsPlumb_rely.connect({
              source: '' + w.id,
              target: '' + (t.id || t)
            }, {
              anchor: "Continuous",
              connector: ["StateMachine"]
            }));
          }
          return _results1;
        })());
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  }
});
