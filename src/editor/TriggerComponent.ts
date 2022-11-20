import Rete, {Node as RNode} from "rete";
import * as Sockets from "@/editor/sockets";
import {ButtonControl} from "@/editor/components/ButtonControl";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import {TaskComponent} from "@/editor/TaskComponent";
import i18n from "@/i18n";

export class TriggerComponent extends TaskComponent {

    constructor(){
        super(i18n.de.trigger);
    }

    async builder(node: RNode) {
        node.addControl(new ButtonControl(()=>{
            this.run(node.id, "onClick")
        }, "start"))
        node.addOutput(new Rete.Output('act', '', Sockets.actSocket))
    }

    worker(node: DNode, inputs:IOs, outputs:IOs): any {
        super.worker(node,inputs,outputs);
    }

    async task(node: DNode, inputs: IOs, outputs: IOs, event: string) {
        return outputs;
    }
}