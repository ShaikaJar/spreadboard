import Rete, {Node as RNode} from "rete";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import * as Socket from "../sockets";
import * as Sockets from "@/editor/sockets";
import i18n from "@/i18n";

export class OutputComponent extends Rete.Component {
    containerQuery;

    constructor(containerQuery: string) {
        super(i18n.de.view);
        this.containerQuery = containerQuery;
    }

    async builder(node: RNode) {
        node.addInput(new Rete.Input("in", "", Sockets.types.get("text")!.valSocket))
        return node;
    }


    // eslint-disable-next-line no-unused-vars
    worker(node: DNode, inputs: IOs, outputs: IOs) {
        if (this.containerQuery) {
            // eslint-disable-next-line no-undef
            const container = document.querySelector(this.containerQuery);
            if (container)
                container.innerHTML = (inputs['in'][0]) ? inputs['in'][0] : "";

        }
    }

}
