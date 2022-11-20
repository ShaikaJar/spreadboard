import Rete, {Node as RNode} from "rete";

import * as Sockets from "@/editor/sockets";
import {TextControl} from "@/editor/components/TextControl";
import {IOs} from "rete/types/engine/component";
import {Node as DNode} from "rete/types/core/data";
import i18n from "@/i18n";

export class CombineComponent extends Rete.Component {
    constructor(){
        super(i18n.de.combine);
    }

    async builder(node: RNode) {
        const inp1 = new Rete.Input('txt',i18n.de.txt, Sockets.types.get("text")!.valSocket);
        const inp2 = new Rete.Input('txt2', i18n.de.txt, Sockets.types.get("text")!.valSocket);
        const out = new Rete.Output('txt', i18n.de.res, Sockets.types.get("text")!.valSocket);

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