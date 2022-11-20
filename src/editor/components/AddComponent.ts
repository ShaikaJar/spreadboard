import Rete, {Node as RNode} from "rete";
import {NumControl} from "@/editor/components/NumControl";

import * as Sockets from "@/editor/sockets";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";

export class AddComponent extends Rete.Component {
    constructor(){
        super("Add");
    }

    async builder(node: RNode): Promise<void> {
        const inp1 = new Rete.Input('num',"Number", Sockets.types.get("number")!.valSocket);
        const inp2 = new Rete.Input('num2', "Number2", Sockets.types.get("number")!.valSocket);
        const out = new Rete.Output('num', "Number", Sockets.types.get("number")!.valSocket);

        inp1.addControl(new NumControl(this.editor, 'num', false))
        inp2.addControl(new NumControl(this.editor, 'num2', false))

        node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new NumControl(this.editor, 'preview', true))
            .addOutput(out);
    }

    worker(node: DNode, inputs:IOs, outputs:IOs, ...args: any) {
        const n1: number = (<number>(inputs['num'].length ? inputs['num'][0] : node.data.num));
        const n2: number = <number>(inputs['num2'].length?inputs['num2'][0]:node.data.num2);
        const sum: number = n1 + n2;

        //@ts-ignore
        const preview = this.editor!.nodes!.find(n => n.id == node.id)!.controls.get('preview')!;
        // @ts-ignore
        preview.setValue(sum);
        outputs['num'] = sum;
    }
}