import Rete, { Control } from "rete";
import VueBoolControl from "../components/VueBoolControl.vue";


export class BoolControl extends Control {
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