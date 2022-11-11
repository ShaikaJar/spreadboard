import Rete from "rete";
import * as Sockets from "@/editor/sockets";
import {TextControl} from "@/editor/components/TextControl";

export class TextComponent extends Rete.Component {

    constructor(){
        super("Text");
    }

    builder(node) {
        var out1 = new Rete.Output('txt', "Text", Sockets.string);

        return node.addControl(new TextControl(this.editor, 'txt')).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs['txt'] = node.data.txt;
    }
}

