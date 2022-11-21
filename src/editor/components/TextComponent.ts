import Rete, {Node as RNode} from "rete";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import * as Sockets from "@/editor/sockets";
import {TextControl} from "@/editor/components/TextControl";
import i18n from "@/i18n";
import {editor} from "@/editor";

export class TextComponent extends Rete.Component {

    constructor(){
        super(i18n.de.txt);
    }

    async builder(node: RNode) {
        const out1 = new Rete.Output('txt', i18n.de.txt, Sockets.types.get("text")!.valSocket);

        return node.addControl(new TextControl(editor, 'txt', false)).addOutput(out1);
    }

    worker(node: DNode, inputs:IOs, outputs:IOs) {
        outputs['txt'] = node.data.txt;
    }
}

