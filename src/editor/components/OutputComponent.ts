import Rete, {Node as RNode} from "rete";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import * as Socket from "../sockets";

export class OutputComponent extends Rete.Component {
    containerQuery;

    constructor(containerQuery: string) {
        super("OutputComponent");
        this.containerQuery = containerQuery;
    }

    async builder(node: RNode) {
        node.addInput(new Rete.Input("in", "", Socket.string))
        return node;
    }


    // eslint-disable-next-line no-unused-vars
    worker(node: DNode, inputs: IOs, outputs: IOs) {
        if (this.containerQuery) {
            // eslint-disable-next-line no-undef
            const container = document.querySelector(this.containerQuery);
            if (container)
                container.innerHTML = (inputs['in'].length > 0) ? inputs['in'][0] : "";

        }
    }

}
