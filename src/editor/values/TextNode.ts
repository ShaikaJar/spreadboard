import Rete, {Component, Node as RNode} from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import {TextControl} from "../controls/TextControl";
import i18n from "../i18n";
import {editor} from "../index";
import {SocketTypes} from "../sockets";

export class TextNode extends Component {
    category:string[] = ["Text"];

    constructor(){
        super(i18n.de.txt);
    }

    async builder(node: RNode) {
        const out1 = new Rete.Output('txt', i18n.de.txt, SocketTypes.textSocket().valSocket);

        node.addControl(new TextControl(editor, 'txt', false)).addOutput(out1);
    }

    worker(node: NodeData, inputs:WorkerInputs, outputs:WorkerOutputs) {
        outputs['txt'] = node.data.txt;
    }
}

