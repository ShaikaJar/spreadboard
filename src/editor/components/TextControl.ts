import Rete from "rete";
//@ts-ignore
import VueTextControl from "@/components/VueTextControl";


export class TextControl extends Rete.Control {
    private component: any;
    private props: any;

    constructor(emitter: CallableFunction, key:string, readonly:boolean = false) {
        super(key);
        this.component = VueTextControl;
        this.props = { emitter, ikey: key, readonly };
    }

    setValue(val:string) {
        //@ts-ignore
        this.vueContext.value = val;
    }
}