import Rete, {Node as RNode} from "rete";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import * as Sockets from "@/editor/sockets";
import {TextControl} from "@/editor/components/TextControl";

export class TextComponent extends Rete.Component {

    constructor(){
        super("Text");
    }

    async builder(node: RNode) {
        const out1 = new Rete.Output('txt', "Text", Sockets.string);

        return node.addControl(new TextControl(this.editor, 'txt', false)).addOutput(out1);
    }

    worker(node: DNode, inputs:IOs, outputs:IOs) {
        outputs['txt'] = node.data.txt;
    }
}

