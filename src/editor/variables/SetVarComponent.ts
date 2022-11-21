import Rete, {Connection, Input, Node as RNode, Output} from "rete";
import {NumControl} from "@/editor/components/NumControl";
import * as Sockets from "@/editor/sockets";
import {Variable} from "./Variable";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import {TaskComponent} from "@/editor/TaskComponent";
import i18n from "@/i18n";

export class SetVarComponent extends TaskComponent {

    types: Map<number, string>;

    constructor() {
        super(i18n.de.setVar);
        this.types = new Map<number, string>();
    }

    async builder(node: RNode) {
        const inRef = new Rete.Input('ref', i18n.de.ref, Sockets.anyTypeSocket.refSocket);
        const inVal = new Rete.Input('val', i18n.de.val, Sockets.anyTypeSocket.valSocket);


        const inpAct = new Rete.Input('act', i18n.de.act, Sockets.actSocket);
        const outAct = new Rete.Output('act', i18n.de.act, Sockets.actSocket);


        return node
            .addInput(inRef)
            .addInput(inVal)
            .addInput(inpAct)
            .addOutput(outAct);
    }

    worker(node: DNode, inputs: IOs, outputs: IOs): any {
        super.worker(node, inputs, outputs);

        // @ts-ignore
        const nodeComp: RNode = this.editor!.nodes!.find(n => n.id == node.id);

        // @ts-ignore
        const refConnection = nodeComp.getConnections().find((value, index) => (value.input.key == 'ref'));

        // @ts-ignore
        const valConnection = nodeComp.getConnections().find((value, index) => (value.input.key == 'val'));

        if (refConnection && refConnection.output.socket &&
            valConnection && valConnection.output.socket &&
            valConnection.output.socket != Sockets.types.getValByRef(refConnection.output.socket)) {
            valConnection.remove();
        } else if (refConnection && refConnection.output.socket) {
            nodeComp.inputs.get('val')!.socket = Sockets.types.getValByRef(refConnection.output.socket);
        } else if (valConnection && valConnection.output.socket) {
            nodeComp.inputs.get('ref')!.socket = Sockets.types.getRefByVal(valConnection.output.socket);
        } else {
            if (refConnection)
                refConnection.remove();
            if (valConnection)
                valConnection.remove();
            nodeComp.inputs.get('ref')!.socket = Sockets.anyTypeSocket.refSocket;
            nodeComp.inputs.get('val')!.socket = Sockets.anyTypeSocket.valSocket;
        }

    }

    async task(node: DNode, inputs: IOs, outputs: IOs, event: any) {
        const ref = inputs['ref'][0];
        const val = inputs['val'][0];
        if (ref && val) {
            ref.set(val);
        }
        return outputs;
    }
}

