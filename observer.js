class Observer{
    constructor(data) {
        this.observe(data);
    }
    observe(data){
        //要对data数据将原有属性改为setter和getter
        if(!data || typeof data !== 'object'){
            return;
        }
        // 要将数据全部实现劫持 先获取data的key和value
        Object.keys(data).forEach(key=>{
            //劫持
            this.defineReactive(data,key,data[key]);
            this.observe(data[key]) //深度劫持
        });
    }

    //定义响应式
    defineReactive(obj,key,value){
        let that = this;
        let dep = new Dep() //每个变化的数据 都对应一个数组
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:true,
            get(){ //取值
                Dep.target && dep.addSub(Dep.target)
                return value;
            },
            set(newValue){ //更改值
                that.observe(newValue);  //劫持新的数据
                value = newValue;
                dep.notify(); //通知数据更新
            }
        })
    }
}

class Dep{
    static target;
    constructor() {
        //订阅的数组
        this.subs = []
    }

    //添加订阅
    addSub(watcher){
        this.subs.push(watcher);
    }

    notify(){
        this.subs.forEach(watcher=>watcher.update())
    }
}
if(typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    module.exports={
        Observer,
        Dep
    }
}
