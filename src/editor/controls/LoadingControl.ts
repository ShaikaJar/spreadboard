import Rete, { Control } from "rete";
//@ts-ignore
import VueLoadingControl from "../components/VueLoadingControl.vue";
import i18n from "../i18n";


export class LoadingControl extends Control {
    private component: any;
    private props: Object;

    private cur:number= 1;
    private max:number=1;

    constructor(emitter: Function, key:string, readonly:boolean = false, title:string|null = null) {
        super(key);
        this.component = VueLoadingControl;
        this.props = { ikey: key, title: title};
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