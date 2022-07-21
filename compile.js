const {Watcher} = require("./watcher");
class Compile{
    constructor(el,vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;

        if(this.el){
            //判断该元素是否能获取
            //1.先把真实的DOM移入到内存中 fragment
            let fragment = this.nodeToFragment(this.el);
            //2. 编译 提取想要的元素节点 和 文本节点 {{}}
            this.compile(fragment);
            //3.把编译好的fragment放回页面
            this.el.appendChild(fragment);
        }
    }

    /*
    编译辅助方法
     */
    isElementNode(node){
        return node.nodeType === 1;
    }

    isDirective(name){
        return name.includes('v-');
    }
    /*
    编译核心方法
     */
    nodeToFragment(el){ //将el中的内容放到内存中
        let fragment = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild){
            fragment.appendChild(firstChild);
        }
        return fragment; //内存中的节点
    }

    compile(fragment){
        //需要递归
        let childNotes = fragment.childNodes
        Array.from(childNotes).forEach(node=>{
            if(this.isElementNode(node)){
                //元素节点 需要继续编译元素
                this.compileElement(node);
                this.compile(node)
            }else{
                //文本节点 继续编译文本
                this.compileText(node)
            }
        })
    }

    compileElement(node){
        //带v-
        let attrs = node.attributes; //取出当前节点的所有属性
        Array.from(attrs).forEach(attr=>{
            //判断属性名是否包含v-
            let attrName = attr.name;
            if(this.isDirective(attrName)){
                //取出对应的值放到节点中
                let expr = attr.value;
                let type = attrName.toString().slice(2);
                //node vm.$data expr
                CompileUtil[type](node,this.vm,expr)
            }
        })
    }

    compileText(node){
        //带{{asd}}
        let expr = node.textContent; //取文本中的内容
        let reg = /\{\{([^}]+)\}\}/g;       // {{a}} {{b}} {{c}}
        if(reg.test(expr)){
            CompileUtil['text'](node,this.vm,expr);
        }
    }

}

CompileUtil = {
    getVal(vm,expr){ //获取实例上对应的数据
        expr = expr.split('.');  //[a,b,c,d,e]
        return expr.reduce((prev,next)=>{
            return prev[next];
        },vm.$data)
    },
    text(node, vm, expr){ //文本处理
        let updateFn = this.updater['textUpdater'];
        // vm.$data[expr];
        let value = expr.replace(/\{\{([^}]+)\}\}/g,(...args)=>{
            return this.getVal(vm,args[1]);
        })
        expr.replace(/\{\{([^}]+)\}\}/g,(...args)=>{
            new Watcher(vm,args[1],(newValue)=>{
                //如果数据变化 文本节点需要重新获取依赖的数据 更新文本中的内容
                updateFn && updateFn(node,expr.replace(/\{\{([^}]+)\}\}/g,(...args)=>{
                    return this.getVal(vm,args[1]);
                }));
            })
        })
        updateFn && updateFn(node,value);
    },
    setVal(vm,expr,value){ //[message,a]
        expr = expr.split('.');
        //收敛
        return expr.reduce((prev,next,currenIndex)=>{
            if(currenIndex === expr.length - 1){  //如果是最后一个 进行赋值
                return prev[next] = value;
            }
            return prev[next];
        },vm.$data)
    },
    model(node,vm,expr){ //输入框处理
        let updateFn = this.updater['modelUpdater'];
        //添加一个watcher 数据发生变化 调用watch的callback
        new Watcher(vm,expr,(newValue)=>{
            //当值变化后，会调用cb 将新的值传递 newValue
            updateFn && updateFn(node,this.getVal(vm,expr))
        })
        node.addEventListener('input',(e)=>{
            let newValue = e.target.value;
            this.setVal(vm,expr,newValue)
        })
        updateFn && updateFn(node,this.getVal(vm,expr))
    },
    bind(node,vm,expr){
        let updateFn = this.updater['bindUpdater'];
        new Watcher(vm,expr,()=>{
            updateFn && updateFn(node,this.getVal(vm,expr))
        })
        updateFn && updateFn(node,this.getVal(vm,expr))
    },
    updater:{
        //文本更新
        textUpdater(node,value){
            node.textContent = value
        },
        //输入框双向绑定更新
        modelUpdater(node, value){
            node.value = value
        },
        //单向绑定
        bindUpdater(node,value){
            node.value = value
        }
    }
}

module.exports = {
    Compile,
    isElementNode(node){
        return node.nodeType === 1;
    },
    isDirective(name){
        return name.includes('v-');
    },
}