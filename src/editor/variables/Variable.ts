

export class Variable<Type>{
    private declare initVal:Type;
    private declare curValue:Type;
    private declare edited:boolean;
    private readonly onChange: Function;

    constructor(onChange: Function) {
        this.onChange = onChange;
    }

    set(newVal:Type){
        this.curValue = newVal;
        this.edited=true;
        this.onChange(newVal);
    }

    setInitial(val:Type){
        this.initVal=val;
        if(!this.edited)
            this.curValue=val;
        //this.onChange(val);
    }

    reset(){
        this.curValue = this.initVal;
        this.edited = false;
    }

    get = () => this.curValue;

}