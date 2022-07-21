const {isElementNode,isDirective} = require("./compile");

describe('compile.js',()=>{
    it('isElementNode',()=>{
        let node = {};
        node.nodeType = 1;
        expect(isElementNode(node)).toEqual(true);
    })
    it('isDirective', ()=> {
        let name = "v-model"
        expect(isDirective(name)).toEqual(true)
    });
})

// test('是否生成对应的getter和setter',()=>{
//     let vm = new MVVM({
//         el:'#app',
//         data:{
//             message1:'test',
//             message2:''
//         }
//     })
//     expect(vm.$data.message1.get()).toEqual('test');
//     vm.$data.message1.set('hello');
//     expect(vm.$data.message1.get()).toEqual('hello');
// })