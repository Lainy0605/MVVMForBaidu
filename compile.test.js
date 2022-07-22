const {Compile, CompileUtil} = require("./compile");
const {MVVM} = require("./MVVM");
describe('compile.js',()=>{
    let e = document.createElement("input")
    let vm = new MVVM({
        el:e,
        data:{
            message1:'11',
            message2:''
        }
    })
    let compile = new Compile(e,vm)
    it('isElementNode',()=>{
        let node = {};
        node.nodeType = 1;
        expect(compile.isElementNode(node)).toEqual(true);
    })
    it('isDirective', ()=> {
        let name = "v-model"
        expect(compile.isDirective(name)).toEqual(true)
    });
    it('nodeToFragment',()=>{
        let fragment = document.createDocumentFragment();
        let firstChild;
        while(firstChild = vm.$el.firstChild){
            fragment.appendChild(firstChild);
        }
        expect(compile.nodeToFragment(vm.$el)).toEqual(fragment)
    })
    it('compile', ()=> {
        let fragment = document.createDocumentFragment();
        compile.compile(fragment)
    });
    it('compileElement', ()=> {
        let node = document.createElement("input")
        let attr = document.createAttribute("v-model")
        attr.nodeValue = "message1"
        node.attributes.setNamedItem(attr)
        compile.compileElement(node)
    });
    it('compileText', ()=> {
        let node = document.createElement("p")
        node.innerText = "{{message1}}"
        compile.compileText(node)
    });
})

describe('CompileUtil',()=>{
    let vm = new MVVM({
        el:'#app',
        data:{
            message:{
                a:"111"
            }
        }
    })
    it('getVal',()=>{
        expect(CompileUtil.getVal(vm,'message.a')).toEqual("111")
    })
    it('text',()=>{
        let node = {};
        node.nodeType = 1;
        CompileUtil.text(node,vm,"{{message.a}}")
    })
    it('setValue',()=>{
        CompileUtil.setVal(vm,"message.a","222")
        expect(vm.$data.message.a).toEqual("222")
    })
    it('bind',  ()=> {
        let node = {};
        node.nodeType = 1;
        CompileUtil.bind(node,vm,"message.a")
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