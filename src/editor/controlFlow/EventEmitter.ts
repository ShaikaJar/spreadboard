
class EventEmitter{
    private listeners: Map<string,Map<number,Function>> = new Map();

    constructor() {
        this.listeners;
    }


    public on(events:string[], callBackId:number, callBack: Function){
        for (const event of events) {
            if(!this.listeners.get(event))
                this.listeners.set(event,new Map());
            this.listeners.get(event)!.set(callBackId,callBack);
        }
    }

    public removeListener(callBackId:number){
        for (const event of this.listeners.keys()) {
            if(this.listeners.get(event)){
                this.listeners.get(event)!.delete(callBackId);
            }
        }
    }

    public trigger(event:string, ...args:any){
        if(this.listeners.get(event))
            for (const listener of this.listeners.get(event)!.values()) {
                new Promise(resolve => setTimeout(resolve, 0)).then(
                    () => listener(event, args)
                );
            }
    }

}

const taskHandler= new EventEmitter();

export default taskHandler;