const {Compile} = require("./compile");
const {Observer} = require("./observer");
class MVVM{
    constructor(options) {
        // 先把传输的参数数据保存
        this.$el = options.el;
        this.$data = options.data;

        //判断是否需要编译
        if(this.$el){
            //数据劫持 把对象的所有属性改成getter和setter
            new Observer(this.$data);
            //数据代理 直接操作vm.message
            this.proxyData(this.$data)
            //将数据和元素进行编译
            new Compile(this.$el, this);
        }
    }

    proxyData(data){
        Object.keys(data).forEach(key=>{
            Object.defineProperty(this,key,{
                get(){
                    return data[key]
                },
                set(newValue){
                    data[key] = newValue
                }
            })
        })
    }


}

module.exports={
    MVVM
}