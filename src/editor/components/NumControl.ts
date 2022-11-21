import Rete from "rete";
//@ts-ignore
import VueNumControl from "@/components/VueNumControl";


export class NumControl extends Rete.Control {
    private component: any;
    private props: Object;

    constructor(emitter: Function, key:string, readonly:boolean = false) {
        super(key);
        this.component = VueNumControl;
        this.props = { emitter, ikey: key, readonly };
    }

    setValue(val: number) {
        //@ts-ignore
        this.vueContext.value = val;
    }
}