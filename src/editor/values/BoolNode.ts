import Rete, {Component, Node as RNode} from "rete";

import i18n from "../i18n";
import {editor} from "../index";
import {SocketTypes} from "../sockets";
import {BoolControl} from "../controls/BoolControl";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";

export class BoolNode extends Component {

    category:string[] = ["Wahrheitswerte"];
    constructor() {
        super(i18n.de.bool);
    }

    async builder(node: RNode) {
        const out1 = new Rete.Output('bool', i18n.de.bool, SocketTypes.boolSocket().valSocket);

        node
            .addControl(new BoolControl((event: string, val: boolean) => editor.trigger(event), 'bool', false))
            .addOutput(out1);
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
        outputs['bool'] = node.data.bool;
    }
}

