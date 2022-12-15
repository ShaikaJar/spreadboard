import Rete, {Component, Node as RNode} from "rete";
import {NumControl} from "../controls/NumControl";

import i18n from "../i18n";
import {editor} from "../index";
import {SocketTypes} from "../sockets";
import { BoolControl } from "../controls/BoolControl";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";

export class GreaterNode extends Component {

    category:string[] = ["Mathe"];
    constructor(){
        super(i18n.de.greater);
    }

    async builder(node: RNode): Promise<void> {
        const inp1 = new Rete.Input('num',i18n.de.compareIn1, SocketTypes.numSocket().valSocket);
        const inp2 = new Rete.Input('num2', i18n.de.compareIn2, SocketTypes.numSocket().valSocket);
        const out = new Rete.Output('bool', i18n.de.res, SocketTypes.boolSocket().valSocket);

        inp1.addControl(new NumControl((event:string,val:number)=>editor.trigger(event), 'num', false, i18n.de.compareIn1))
        inp2.addControl(new NumControl((event:string,val:number)=>editor.trigger(event), 'num2', false, i18n.de.compareIn2))

        node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new BoolControl((event:string,val:boolean)=>{}, 'preview', true, i18n.de.res))
            .addOutput(out);
    }

    worker(node: NodeData, inputs:WorkerInputs, outputs:WorkerOutputs, ...args: any) {
        const n1: number = (<number>(inputs['num'].length ? inputs['num'][0] : node.data.num));
        const n2: number = <number>(inputs['num2'].length?inputs['num2'][0]:node.data.num2);
        const compare: boolean = n1 > n2;

        const preview = editor!.nodes!.find((n:RNode) => n.id == node.id)!.controls.get('preview')!;
        // @ts-ignore
        preview.setValue(compare);
        outputs['bool'] = compare;
    }
}