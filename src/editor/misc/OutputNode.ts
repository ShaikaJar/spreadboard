import Rete, {Component, Node as RNode} from "rete";
import * as Socket from "../sockets";
import * as Sockets from "../sockets";
import i18n from "../i18n";
import {SocketTypes} from "../sockets";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";

export class OutputNode extends Component {

    category:string[] = ["Anderes"];
    containerQuery;

    constructor(containerQuery: string) {
        super(i18n.de.view);
        this.containerQuery = containerQuery;
    }

    async builder(node: RNode) {
        node.addInput(new Rete.Input("in", "", SocketTypes.textSocket().valSocket))
        node;
    }


    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
        if (this.containerQuery) {
            const container = document.querySelector(this.containerQuery);
            if (container)
                container.innerHTML = ((inputs['in'][0] != undefined && inputs['in'][0] != null) ? inputs['in'][0] : "") as string;

        }
    }

}
