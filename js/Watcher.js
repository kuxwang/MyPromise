class Watcher {
    constructor(vm,exp,cb){
        this.cb=cb;
        this.vm=vm;
        this.exp=exp;
        this.value =this.get()
    }
    update(){
        this.run()
    }
    run(){
        const value =this.get();
        const oldValue=this.value;
        if(value !== oldValue){
            this.value=value;
            this.cb.call(this.vm,value,oldValue)
        }
    }
    addDep(){
        if(!this.depIds.hasOwnProperty(dep.id)){
            dep.addSub(this)
            this.depIds[dep.id]=dep;
        }
    }
    get(){
        Dep.target=this;
        const value =this.getter.call(this.vm,this.vm)
        Dep.target=null;
        return value
    }
    parseGetter(exp){
        // if()
    }
}