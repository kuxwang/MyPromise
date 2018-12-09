// function observer(data){
//     if(!data || typeof data !== 'object'){
//         return
//     }
//     //取出所有属性
//     Object.keys(data).forEach(key => {
//         defineReactive(data,key,data[key])
//     })
// }

// function defineReactive(data,key,val){
//     const dep=new Dep()
//     //监听子属性
//     observer(val)
//     Object.defineProperty(data,key,{
//         enumerable:true,
//         configurable:false,
//         get(){
//             return val
//         },
//         set(newValue){

//             if(val === newValue) return
//             console.log(`哈哈哈，监听到了变化,${val} ====> ${newValue}`)
//             val =newValue;
//             dep.notify()
//         }
//     })

//     class Dep {
//         constructor(){
//             this.subs=[]
//         }
//         addSub(sub){
//             this.subs.push(sub)
//         }
//         notify(){
//             this.subs.forEach( fn =>{
//                 sub.update()
//             })
//         }
//     }

// }

// var data ={name:'nico',list:{a:1,b:2}}
// observer(data)

// data.name='呵呵'
// data.list.a='a123'

class Dep {
  constructor() {
    this.subs = [];
    this.target=null
  }
  //向列表里添加函数
  addSub(sub) {
    this.subs.push(sub);
  }
  //遍历列表 使函数更新
  notify() {
    this.subs.forEach(fn => {
      sub.update();
    });
  }
}
function observer(value, vm) {
  if (!value || typeof value !== "object") {
    return;
  }

  return new Observer(value);
}

/**
 * 对data进行递归遍历，如果
 *
 */

class Observer {
  constructor(data) {
    this.data = data;
    this.walk(data);
  }
  walk(data) {
    Object.keys(data).forEach(key => {
      this.convert(key, data[key]);
    });
  }
  convert(key, val) {
    this.defineReactive(this.data, key, val);
  }
  defineReactive(data, key, val) {
    const dep = new Dep();
    let childObj = observer(val); //
    if (!data || typeof data !== "object") {
      return;
    }
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get() {
        console.log(`劫持到了get ${key},${val}`);
        if(dep.target){
            dep.depend()
        }
        return val;
      },
      set(newValue) {
        if (val === newValue) {
          return;
        }
        observer(newValue);
        console.log(`劫持到set ${key}:${val} ====> ${newValue}`);
        val = newValue;
        childObj=observer(newValue)
        dep.notify()  //通知一波
      }
    });
  }
}

// var test ={
//     name:'nico',
//     data:{
//         a:1,
//         b:2
//     }
// }

// observer(test)
// test.name='jack'
// console.log(test.name)
