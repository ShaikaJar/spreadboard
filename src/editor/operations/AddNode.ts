import Rete, {Component, Node as RNode} from "rete";
import {NumControl} from "../controls/NumControl";

import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import i18n from "../i18n";
import {editor} from "../index";
import {SocketTypes} from "../sockets";

export class AddNode extends Component {
    constructor(){
        super(i18n.de.add);
    }

    async builder(node: RNode): Promise<void> {
        const inp1 = new Rete.Input('num',i18n.de.addIn, SocketTypes.numSocket().valSocket);
        const inp2 = new Rete.Input('num2', i18n.de.addIn, SocketTypes.numSocket().valSocket);
        const out = new Rete.Output('num', i18n.de.res, SocketTypes.numSocket().valSocket);

        inp1.addControl(new NumControl((event:string,val:number)=>editor.trigger(event), 'num', false, i18n.de.addIn))
        inp2.addControl(new NumControl((event:string,val:number)=>editor.trigger(event), 'num2', false, i18n.de.addIn))

        node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new NumControl((event:string,val:number)=>{}, 'preview', true, i18n.de.res))
            .addOutput(out);
    }

    worker(node: DNode, inputs:IOs, outputs:IOs, ...args: any) {
        const n1: number = (<number>(inputs['num'].length ? inputs['num'][0] : node.data.num));
        const n2: number = <number>(inputs['num2'].length?inputs['num2'][0]:node.data.num2);
        const sum: number = n1 + n2;

        //@ts-ignore
        const preview = editor!.nodes!.find(n => n.id == node.id)!.controls.get('preview')!;
        // @ts-ignore
        preview.setValue(sum);
        outputs['num'] = sum;
    }
}