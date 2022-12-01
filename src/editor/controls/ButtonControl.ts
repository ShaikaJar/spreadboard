import Rete, { Control } from "rete";
//@ts-ignore
import VueNumControl from "../components/VueButtonControl.vue";
import VueButtonControl from "../components/VueButtonControl.vue";


export class ButtonControl extends Control {
    private component: any;
    private props: Object;

    constructor(emitter: Function, key:string) {
        super(key);
        this.component = VueButtonControl;
        this.props = { emitter, ikey: key };
    }
}