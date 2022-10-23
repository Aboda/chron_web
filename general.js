/*
  base of homemade framework 2021/10/14
*/
const ao = {
    "lng":document.documentElement.lang.slice(0,2),
    zyx (tag,thing,show) {
      if (show){console.log(tag,thing);};
    },
    ost (object,newkey,content) {
      if(object[newkey] == undefined){
        object[newkey] = content;return true;
      }else{return false;};
    },
    fe (method,resource,callback,information) {
      var negotiator = new XMLHttpRequest();
      negotiator.open(method,resource);
      negotiator.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      negotiator.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              callback(this.responseText);
          };
      };
      if (information != undefined) {
        negotiator.send(information);
      }else{
        negotiator.send();
      }    
    },
    "simple":{},
    "node_flattener":{
      "a":true,
      "button":"input",
      "checkbox":"input",
      "date":"input",
      "div":true,
      "email":"input",
      "file":"input",
      "h1":true,
      "h2":true,
      "h3":true,
      "h4":true,
      "h5":true,
      "h6":true,
      "iframe":true,
      "img":true,
      "input":true,
      "label":true,
      "option":true,
      "p":true,
      "password":"input",
      "path":true,
      "script":true,
      "select":true,
      "span":true,
      "sub":true,
      "textarea":true,
      "table":true,
      "tr":true,
      "td":true,
      "ul":true,
      "ol":true,
      "li":true
    },
    "prop_pass":{
      "onload":true,
      "alt":true,
      "async":true,
      "crossorigin":true,
      "defer":true,
      "id":true,
      "innerText":true,
      "value":true,
      "for":true,
      "title":true,
      "href":true,
      "src":true,
      "order":"style",
      "height":"style",
      "width":"style",
      "top":"style",
      "left":"style",
      "right":"style",
      "display":"style",
      "position":"style",
      "src":true,
      "alignSelf":"style",
      "fontSize":"style",
      "overflowX":"style",
      "transition":"style"
    },
    qq (qq,container) {
      this.aint_got_no_id(qq);
      var node;
      var type;
      if (this.node_flattener[qq.nodetype] == true) {
          node = qq.nodetype;
      }else{
          node = this.node_flattener[qq.nodetype];
          type = qq.nodetype;
      };
      node = document.createElement(node);
      if (type != undefined) {node.type = type;};
      for (let items in qq){
        if (this.prop_pass[items] !=  undefined) {
          if (this.prop_pass[items] == true) {
            node[items] = qq[items];
          }else {
            node[this.prop_pass[items]][items] = qq[items];
          };
  
        };
      };
      if (qq.styles != undefined) {this.dress(node,qq.styles,true)};
      if (qq.path != undefined) {node.setAttribute("d", qq.path)};
      if (qq.nodetype == "a") {
        if (qq.link_text != undefined) {
          node.append(document.createTextNode(qq.link_text));
        }else{
          node.append(document.createTextNode(qq.target));
        };
        node.href = qq.target;
      };
      if (qq.triggers != undefined) {
        for(let items of qq.triggers){
          node.addEventListener(items[0],items[1]);
        };
      };
      qq.node = node;
      let unique = this.ost(this.simple,qq.id,qq);
      if (!unique) {
        throw {
          "error":"attempted to recreate an object",
          "original":this.simple[qq.id],
          "new":qq
        }
      }
      if (container != undefined){container[qq.id] = this.simple[qq.id];};    
      return node;
    },
    "counters":{
      "id":0
    },
    aint_got_no_id(some_config_obj) {
      if (some_config_obj.id == undefined) {
        some_config_obj.id = "aid-"+this.counters.id;
        this.counters.id++;
      };
    },
    dress(htmlelement,classarray,trueaddfalseremove){
      for (var a = 0; a < classarray.length;a++) { 
        if (trueaddfalseremove){
          htmlelement.classList.add(classarray[a]);
        };
        if (trueaddfalseremove == false){
          htmlelement.classList.remove(classarray[a]);
        };
      };
    },
    simple_delete(simple_item){
      simple_item.node.remove();
      delete simple_item;
    },
    controller_simple_delete(controller) {
      for (let content in controller) {
        this.simple_delete(controller[content])
      }
      delete controller;
    }
};