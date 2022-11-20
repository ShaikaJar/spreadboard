import Rete, {Node as RNode} from "rete";
import * as Sockets from "@/editor/sockets";
import {ButtonControl} from "@/editor/components/ButtonControl";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import {TaskComponent} from "@/editor/TaskComponent";

export class TriggerComponent extends TaskComponent {

    constructor(){
        super('Button event');
    }

    async builder(node: RNode) {
        node.addControl(new ButtonControl(()=>{
            this.run(node.id, "onClick")
        }, "start"))
        node.addOutput(new Rete.Output('act', '', Sockets.actSocket))
    }

    worker(node: DNode, inputs:IOs, outputs:IOs): any {
        const superReturn = super.worker(node,inputs,outputs);
        node = superReturn.node;
        inputs = superReturn.inputs;
        outputs = superReturn.outputs;
    }

    async task(node: DNode, inputs: IOs, outputs: IOs, event: string) {
        return outputs;
    }
}