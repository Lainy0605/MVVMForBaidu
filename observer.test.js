const {addSub,notify} = require("./observer");
const {Watcher} = require("./watcher");
describe('observer.js',()=>{
    it('defineReactive',()=> {
        addSub(new Watcher())
        notify()
    })
})