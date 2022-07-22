//观察者：给需要变化的元素增加一个观察者，当数据变化后执行对应的方法
// const {Dep} = require("./observer");
class Watcher{
    constructor(vm,expr,cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;

        //先获取旧值
        this.value = this.get();
    }

    getVal(vm,expr){ //获取实例上对应的数据
        expr = expr.split('.');  //[a,b,c,d,e]
        return expr.reduce((prev,next)=>{
            return prev[next];
        },vm.$data)
    }

    get(){
        Dep.target = this;
        let value = this.getVal(this.vm,this.expr);
        Dep.target = null;
        return value;
    }
    //对外暴露的方法
    update(){
        let newValue = this.getVal(this.vm,this.expr)
        let oldValue = this.value;

        if(newValue!==oldValue){
            this.cb(newValue) //调用对应watch的callback方法
        }
    }
}
if(typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    module.exports = {
        Watcher
    }
}
