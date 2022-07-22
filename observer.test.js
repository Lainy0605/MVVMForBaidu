const {Dep, Observer} = require("./observer");
const {Watcher} = require("./watcher");
const {MVVM} = require("./MVVM");
describe('observer.js',()=>{
    let data = {
        message:"111",
    }
    let observer = new Observer(data)
    it('defineReactive',()=> {
        observer.defineReactive(data,"message","111")
    })
})

describe('Dep',()=>{
    let dep = new Dep()
    let vm = new MVVM({
        el:'#app',
        data:{
            message:{
                a:"111"
            }
        }
    })
    it('addSub',()=> {
        dep.addSub(new Watcher(vm,"message.a",()=>{}))
    })
    it('notify',()=> {
        dep.notify()
    })
})