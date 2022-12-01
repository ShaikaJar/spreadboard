import Rete, {Component, Node as RNode} from "rete";
import * as Sockets from "../sockets";
import {TextControl} from "../controls/TextControl";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import i18n from "../i18n";
import {editor} from "../index";
import {SocketTypes} from "../sockets";

export class HeaderComponent extends Component {
    constructor(){
        super(i18n.de.header);
    }

    async builder(node: RNode) {
        const inp1 = new Rete.Input('txt',i18n.de.txt, SocketTypes.textSocket().valSocket);
        const out = new Rete.Output('h', i18n.de.header, SocketTypes.textSocket().valSocket);

        inp1.addControl(new TextControl(editor, 'txt', false));

        return node
            .addInput(inp1)
            .addControl(new TextControl(editor, 'preview', true))
            .addOutput(out);
    }

    worker(node: DNode, inputs:IOs, outputs:IOs) {
        const n1 = inputs['txt'].length?inputs['txt'][0]:node.data.txt;
        const h = "<h1>"+n1+"</h1>";

        // @ts-ignore
        editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(h);
        outputs['h'] = h;
    }
}