import Rete, {Component, Node as RNode} from "rete";
import * as Sockets from "../sockets";
import {TextControl} from "../controls/TextControl";
import i18n from "../i18n";
import {editor} from "../index";
import {SocketTypes} from "../sockets";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";

export class HeaderNode extends Component {

    category:string[] = ["Anderes"];

    constructor(){
        super(i18n.de.header);
    }

    async builder(node: RNode) {
        const inp1 = new Rete.Input('txt',i18n.de.txt, SocketTypes.textSocket().valSocket);
        const out = new Rete.Output('h', i18n.de.header, SocketTypes.textSocket().valSocket);

        inp1.addControl(new TextControl(editor, 'txt', false));

        node
            .addInput(inp1)
            .addControl(new TextControl(editor, 'preview', true))
            .addOutput(out);
    }

    worker(node: NodeData, inputs:WorkerInputs, outputs:WorkerOutputs) {
        const n1 = inputs['txt'].length?inputs['txt'][0]:node.data.txt;
        const h = "<h1>"+n1+"</h1>";
        
        editor.nodes.find((n: RNode) => n.id == node.id).controls.get('preview').setValue(h);
        outputs['h'] = h;
    }
}