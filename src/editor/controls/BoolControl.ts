import Rete from "rete";
//@ts-ignore
import i18n from "@/i18n";
import VueBoolControl from "@/components/VueBoolControl.vue";


export class BoolControl extends Rete.Control {
    private component: any;
    private props: Object;

    constructor(emitter: Function, key:string, readonly:boolean = false, title:string|null = null) {
        super(key);
        this.component = VueBoolControl;
        this.props = { emitter, ikey: key, readonly, title: title };
    }

    setValue(val: boolean) {
        //@ts-ignore
        this.vueContext.value = val;
    }
    getValue() {
        //@ts-ignore
        return this.vueContext.value;
    }
}