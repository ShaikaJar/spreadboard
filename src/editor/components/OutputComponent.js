import Rete from "rete";
import * as Socket from "../sockets";

export class OutputComponent extends Rete.Component {
    containerQuery;
    constructor(containerQuery) {
        super("OutputComponent");
        this.containerQuery = containerQuery;
    }

    builder(node) {
        node.addInput(new Rete.Input("in", "", Socket.string))
        return node;
    }


    // eslint-disable-next-line no-unused-vars
    worker(node, inputs, outputs) {
        if(this.containerQuery){
            let container = document.querySelector(this.containerQuery);
            if(container)
                container.innerHTML = inputs['in'][0];
        }
    }

}
