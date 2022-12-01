import Rete, {Component, Node as RNode} from "rete";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";

import i18n from "../i18n";
import {editor} from "../index";
import {SocketTypes} from "../sockets";
import {BoolControl} from "../controls/BoolControl";

export class BoolComponent extends Component {

    constructor() {
        super(i18n.de.bool);
    }

    async builder(node: RNode) {
        const out1 = new Rete.Output('bool', i18n.de.bool, SocketTypes.boolSocket().valSocket);

        return node
            .addControl(new BoolControl((event: string, val: boolean) => editor.trigger(event), 'bool', false))
            .addOutput(out1);
    }

    worker(node: DNode, inputs: IOs, outputs: IOs) {
        //console.log("Output:",node.data.bool);
        outputs['bool'] = node.data.bool;
    }
}

