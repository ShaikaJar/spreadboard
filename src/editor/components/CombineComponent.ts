import Rete, {Node as RNode} from "rete";

import * as Sockets from "@/editor/sockets";
import {TextControl} from "@/editor/components/TextControl";
import {IOs} from "rete/types/engine/component";
import {Node as DNode} from "rete/types/core/data";

export class CombineComponent extends Rete.Component {
    constructor(){
        super("Text + Text");
    }

    async builder(node: RNode) {
        const inp1 = new Rete.Input('txt',"Text", Sockets.string);
        const inp2 = new Rete.Input('txt2', "Text2", Sockets.string);
        const out = new Rete.Output('txt', "Text", Sockets.string);

        inp1.addControl(new TextControl(this.editor, 'txt', false))
        inp2.addControl(new TextControl(this.editor, 'txt2',false))

        node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new TextControl(this.editor, 'preview', true))
            .addOutput(out);
    }

    worker(node:DNode, inputs:IOs, outputs:IOs, ...args: any) : any {
        let n1 = inputs['txt'].length?inputs['txt'][0]:node.data.txt;
        if(n1 == undefined)
            n1 = "";
        let n2 = inputs['txt2'].length?inputs['txt2'][0]:node.data.txt2;
        if(n2 == undefined)
            n2 = "";
        const sum = n1 + "" + n2;

        //@ts-ignore
        this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(sum);
        outputs['txt'] = sum;
        return null;
    }
}