import Rete, {Control } from "rete";
//@ts-ignore
import VueTextControl from "../components/VueTextControl.vue";
import i18n from "../i18n";


export class TextControl extends Control {
    private component: any;
    private props: any;

    constructor(emitter: CallableFunction, key:string, readonly:boolean = false, title: string|null = null) {
        super(key);
        this.component = VueTextControl;
        this.props = { emitter, ikey: key, readonly , title: title};
    }

    setValue(val:string) {
        //@ts-ignore
        this.vueContext.value = val;
    }
}