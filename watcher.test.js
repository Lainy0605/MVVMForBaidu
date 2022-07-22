const {Watcher} = require("./watcher");
const {MVVM} = require("./MVVM");
describe('watcher.js',()=>{
    let vm = new MVVM({
        el:'#app',
        data:{
            message:{
                a:"111"
            }
        }
    })
    let watcher = new Watcher(vm,"message.a",()=>{})
    it('getVal',()=> {
        expect(watcher.getVal(vm,watcher.expr)).toEqual("111")
    })
    it('get', ()=> {
        expect(watcher.get(vm,watcher.expr)).toEqual("111")
    })
    it('update', ()=> {
        watcher.update()
    });
})