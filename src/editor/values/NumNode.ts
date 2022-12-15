import Rete, {Component, Node as RNode} from "rete";

import {NumControl} from "../controls/NumControl";
import * as Sockets from "../sockets";
import i18n from "../i18n";
import {editor} from "../index";
import {SocketTypes} from "../sockets";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";

export class NumNode extends Component {

    category:string[] = ["Zahl"];

    constructor(){
        super(i18n.de.num);
    }

    async builder(node: RNode) {
        const out1 = new Rete.Output('num', i18n.de.num, SocketTypes.numSocket().valSocket);

        node.addControl(new NumControl((event:string,val:number)=>editor.trigger(event), 'num', false)).addOutput(out1);
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
        outputs['num'] = node.data.num;
    }
}

