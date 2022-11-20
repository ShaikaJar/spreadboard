import Rete, {Connection, Input, Node as RNode, Output} from "rete";
import {NumControl} from "@/editor/components/NumControl";
import * as Sockets from "@/editor/sockets";
import {Variable} from "./Variable";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import {TaskComponent} from "@/editor/TaskComponent";

export class SetVarComponent extends TaskComponent {

    types: Map<number, string>;

    constructor() {
        super("Set Variable");
        this.types = new Map<number, string>();
    }

    async builder(node:RNode) {
        const ipType = new Rete.Input('type', "Type", Sockets.typeSocket);
        const inpAct = new Rete.Input('act', "Action", Sockets.actSocket);
        const outAct = new Rete.Output('act', "Action", Sockets.actSocket);



        return node
            .addControl(new NumControl(this.editor, 'preview', true))
            .addInput(ipType)
            .addInput(inpAct)
            .addOutput(outAct);
    }

    worker(node: DNode, inputs:IOs, outputs:IOs): any {
        const superReturn = super.worker(node,inputs,outputs);
        node = superReturn.node;
        inputs = superReturn.inputs;
        outputs = superReturn.outputs;
        console.log("SetVar-Inputs", inputs)

        const type: string = inputs['type'][0];

        if(type == this.types.get(node.id))
            return;

        this.types.set(node.id, type);

        // @ts-ignore
        const nodeComp: RNode = this.editor!.nodes!.find(n => n.id == node.id);

        if(nodeComp.inputs.get("ref"))
            nodeComp.removeInput(nodeComp.inputs.get("ref")!);
        if(nodeComp.inputs.get("val"))
            nodeComp.removeInput(nodeComp.inputs.get("val")!);

        nodeComp.addInput(new Rete.Input('ref', "Reference", Sockets.types.get(type)!.refSocket));
        nodeComp.addInput(new Rete.Input('val', "Reference", Sockets.types.get(type)!.valSocket));


    }

    async task(node: DNode, inputs: IOs, outputs: IOs, event: any){
        const ref = inputs['ref'][0];
        const val = inputs['val'][0];
        if(ref && val){
            ref.set(val);
        }
        return outputs;
    }
}

