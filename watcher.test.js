const {getVal,get,update} = require("./watcher");
describe('watcher.js',()=>{
    it('getVal',()=> {
        getVal(vm,"message.a");
    })
    it('get', ()=> {
        get()
    })
    it('update', ()=> {
        update()
    });
})