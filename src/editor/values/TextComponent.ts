import Rete, {Component, Node as RNode} from "rete";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import * as Sockets from "../sockets";
import {TextControl} from "../controls/TextControl";
import i18n from "../i18n";
import {editor} from "../index";
import {SocketTypes} from "../sockets";

export class TextComponent extends Component {

    constructor(){
        super(i18n.de.txt);
    }

    async builder(node: RNode) {
        const out1 = new Rete.Output('txt', i18n.de.txt, SocketTypes.textSocket().valSocket);

        return node.addControl(new TextControl(editor, 'txt', false)).addOutput(out1);
    }

    worker(node: DNode, inputs:IOs, outputs:IOs) {
        outputs['txt'] = node.data.txt;
    }
}

