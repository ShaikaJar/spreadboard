import Rete from "rete";
//@ts-ignore
import VueNumControl from "@/components/VueNumControl";
import i18n from "@/i18n";


export class NumControl extends Rete.Control {
    private component: any;
    private props: Object;

    constructor(emitter: Function, key:string, readonly:boolean = false, title:string|null = null) {
        super(key);
        this.component = VueNumControl;
        this.props = { emitter, ikey: key, readonly, title: title };
    }

    setValue(val: number) {
        //@ts-ignore
        this.vueContext.value = val;
    }
    getValue() {
        //@ts-ignore
        return this.vueContext.value;
    }
}