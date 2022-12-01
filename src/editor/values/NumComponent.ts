import Rete, {Component, Node as RNode} from "rete";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";

import {NumControl} from "../controls/NumControl";
import * as Sockets from "../sockets";
import i18n from "../i18n";
import {editor} from "../index";
import {SocketTypes} from "../sockets";

export class NumComponent extends Component {

    constructor(){
        super(i18n.de.num);
    }

    async builder(node: RNode) {
        const out1 = new Rete.Output('num', i18n.de.num, SocketTypes.numSocket().valSocket);

        return node.addControl(new NumControl((event:string,val:number)=>editor.trigger(event), 'num', false)).addOutput(out1);
    }

    worker(node: DNode, inputs: IOs, outputs: IOs) {
        outputs['num'] = node.data.num;
    }
}

