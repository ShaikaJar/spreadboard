import Rete from "rete";
import * as Sockets from "@/editor/sockets";
import {TextControl} from "@/editor/components/TextControl";

export class HeaderComponent extends Rete.Component {
    constructor(){
        super("Header");
    }

    builder(node) {
        var inp1 = new Rete.Input('txt',"Text", Sockets.string);
        var out = new Rete.Output('h', "header", Sockets.string);

        inp1.addControl(new TextControl(this.editor, 'txt'));

        return node
            .addInput(inp1)
            .addControl(new TextControl(this.editor, 'preview', true))
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        var n1 = inputs['txt'].length?inputs['txt'][0]:node.data.txt;
        let h = "<h1>"+n1+"</h1>";
        this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(h);
        outputs['h'] = h;
    }
}