import Rete, {Node as RNode} from "rete";
import * as Sockets from "@/editor/sockets";
import {TextControl} from "@/editor/components/TextControl";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";

export class HeaderComponent extends Rete.Component {
    constructor(){
        super("Header");
    }

    async builder(node: RNode) {
        const inp1 = new Rete.Input('txt',"Text", Sockets.string);
        const out = new Rete.Output('h', "header", Sockets.string);

        inp1.addControl(new TextControl(this.editor, 'txt', false));

        return node
            .addInput(inp1)
            .addControl(new TextControl(this.editor, 'preview', true))
            .addOutput(out);
    }

    worker(node: DNode, inputs:IOs, outputs:IOs) {
        const n1 = inputs['txt'].length?inputs['txt'][0]:node.data.txt;
        const h = "<h1>"+n1+"</h1>";

        // @ts-ignore
        this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(h);
        outputs['h'] = h;
    }
}