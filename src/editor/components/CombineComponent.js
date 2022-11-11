import Rete from "rete";

import * as Sockets from "@/editor/sockets";
import {TextControl} from "@/editor/components/TextControl";

export class CombineComponent extends Rete.Component {
    constructor(){
        super("Text + Text");
    }

    builder(node) {
        var inp1 = new Rete.Input('txt',"Text", Sockets.string);
        var inp2 = new Rete.Input('txt2', "Text2", Sockets.string);
        var out = new Rete.Output('txt', "Text", Sockets.string);

        inp1.addControl(new TextControl(this.editor, 'txt'))
        inp2.addControl(new TextControl(this.editor, 'txt2'))

        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new TextControl(this.editor, 'preview', true))
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        var n1 = inputs['txt'].length?inputs['txt'][0]:node.data.txt;
        if(n1 == undefined)
            n1 = "";
        var n2 = inputs['txt2'].length?inputs['txt2'][0]:node.data.txt2;
        if(n2 == undefined)
            n2 = "";
        var sum = n1 + "" + n2;

        this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(sum);
        outputs['txt'] = sum;
    }
}