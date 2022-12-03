import Rete, {Component, Node as RNode} from "rete";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import * as Socket from "../sockets";
import * as Sockets from "../sockets";
import i18n from "../i18n";
import {SocketTypes} from "../sockets";

export class OutputNode extends Component {
    containerQuery;

    constructor(containerQuery: string) {
        super(i18n.de.view);
        this.containerQuery = containerQuery;
    }

    async builder(node: RNode) {
        node.addInput(new Rete.Input("in", "", SocketTypes.textSocket().valSocket))
        return node;
    }


    // eslint-disable-next-line no-unused-vars
    worker(node: DNode, inputs: IOs, outputs: IOs) {
        if (this.containerQuery) {
            // eslint-disable-next-line no-undef
            const container = document.querySelector(this.containerQuery);
            if (container)
                container.innerHTML = (inputs['in'][0] != undefined && inputs['in'][0] != null) ? inputs['in'][0] : "";

        }
    }

}
