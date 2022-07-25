const {MVVM} = require("./MVVM");

test('',()=>{
    let vm = new MVVM({
        el:'#app',
        data:{
            message1:'',
            message2:''
        }
    })
})