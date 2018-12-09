//解析模版指令，将模版中的变量替换成数据

class Compile {
  constructor(el) {
    //判断el是不是一个node 不是的话选择node
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    //如果el存在
    if (this.$el) {
      //创建一个文本fragment碎片，将el传入，对el进行解析,
      this.$fragment = this.node2Fragment(this.$el); //
      this.init(); //开始
      this.$el.appendChild(this.$fragment); //子元素添加进去
    }
  }
  isElementNode(el) {
    return;
  }
  /**
   *
   * @param {Node} el
   */
  node2Fragment(el) {
    //创建一个碎片
    let fragment = document.createDocumentFragment(), //创建一个空的文档节点
      child;
    //将el中的子节点放入fragment中
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }
    //返回这个fragment
    return fragment;
  }
  init() {
    this.compileElement(this.$fragment);
  }
  //解析元素
  compileElement(el) {
    var childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      var text = node.textContent;
      var reg = /\{\{(.*)\}\}/;
      //判断子元素的类型
      if (this.isElementNode(node)) {
        this.compile(node);
        //解析子元素
      } else if (this.isTextNode(node)) {
      }
      if (node.childNodes && node.childNodes.length) {
        //继续往下解析
        this.compileElement(node);
      }
    });
  }
  //解析element，
  compile(node) {
    //将element的属性遍历出来
    let nodeAttrs = node.atttibutes;
    Array.from(nodeAttrs).forEach(attr => {
      let attrName = attr.name;
      //如果属性名是一个指令
      if (this.isDirective(attrName)) {
        //获取指令的值和指令名称
        let exp = attr.value;
        let dir = attrName.subString(0, 2);
        if (this.isEventDirective(dir)) {
          //事件指令 绑定
        } else {
          //普通指令   调用compileUtil对象内的dir对应的方法  传入解析的node和vm,exp属性的值
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }
      }
    });
  }

  // nodeType == 1 element   2attr  3ext
  isElementNode(node) {
    return node.nodeType == 1;
  }
  isTextNode(node) {
    return node.nodeType == 3;
  }
}


class CompileUtil {
    // bind方法
    bind(node,vm,exp,dir){
        let updaterFn =updater[`${dir}Updater`]
        updateFn && updaterFn(node,)
    }
}
