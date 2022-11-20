import Rete from "rete";
//@ts-ignore
import VueNumControl from "@/components/VueButtonControl";
import VueButtonControl from "@/components/VueButtonControl.vue";


export class ButtonControl extends Rete.Control {
    private component: any;
    private props: Object;

    constructor(emitter: Function, key:string) {
        super(key);
        this.component = VueButtonControl;
        this.props = { emitter, ikey: key };
    }
}