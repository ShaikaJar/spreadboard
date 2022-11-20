import Rete, {Node as RNode} from "rete";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";

import {NumControl} from "@/editor/components/NumControl";
import * as Sockets from "@/editor/sockets";

export class NumComponent extends Rete.Component {

    constructor(){
        super("Number");
    }

    async builder(node: RNode) {
        const out1 = new Rete.Output('num', "Number", Sockets.types.get("number")!.valSocket);
        const out2 = new Rete.Output('type', "Type", Sockets.typeSocket);

        return node.addControl(new NumControl(this.editor, 'num', false)).addOutput(out1).addOutput(out2);
    }

    worker(node: DNode, inputs: IOs, outputs: IOs) {
        outputs['num'] = node.data.num;
    }
}

