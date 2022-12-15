import Rete, {Component, Node as RNode} from "rete";

import * as Sockets from "../sockets";
import {TextControl} from "../controls/TextControl";
import i18n from "../i18n";
import {editor} from "../index";
import {SocketTypes} from "../sockets";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";

export class CombineNode extends Component {
    category:string[] = ["Text"];
    constructor(){
        super(i18n.de.combine);
    }

    async builder(node: RNode) {
        const inp1 = new Rete.Input('txt',i18n.de.txt, SocketTypes.numSocket().valSocket);
        const inp2 = new Rete.Input('txt2', i18n.de.txt, SocketTypes.numSocket().valSocket);
        const out = new Rete.Output('txt', i18n.de.res, SocketTypes.numSocket().valSocket);

        inp1.addControl(new TextControl(editor, 'txt', false))
        inp2.addControl(new TextControl(editor, 'txt2',false))

        node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new TextControl(editor, 'preview', true))
            .addOutput(out);
    }

    worker(node:NodeData, inputs:WorkerInputs, outputs:WorkerOutputs, ...args: any) : any {
        let n1 = inputs['txt'].length?inputs['txt'][0]:node.data.txt;
        if(n1 == undefined)
            n1 = "";
        let n2 = inputs['txt2'].length?inputs['txt2'][0]:node.data.txt2;
        if(n2 == undefined)
            n2 = "";
        const sum = n1 + "" + n2;

        editor.nodes.find((n:RNode) => n.id == node.id).controls.get('preview').setValue(sum);
        outputs['txt'] = sum;
        return null;
    }
}