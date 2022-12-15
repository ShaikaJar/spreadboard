import Rete, {Component, Connection, Input, Node as RNode, Output} from "rete";
import i18n from "../i18n";
import taskHandler from "../controlFlow/EventEmitter";
import {SocketTypes} from "../sockets";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { Variable } from "./Variable";

export class SetVarNode extends Component {
    category:string[] = ["Kontrollfluss"];

    types: Map<number, string>;

    constructor() {
        super(i18n.de.setVar);
        this.types = new Map<number, string>();
    }

    async builder(node: RNode) {
        const inRef = new Rete.Input('ref', i18n.de.ref, SocketTypes.anyTypeSocket.refSocket);
        const inVal = new Rete.Input('val', i18n.de.val, SocketTypes.anyTypeSocket.valSocket);


        const inpAct = new Rete.Input('act', i18n.de.act, SocketTypes.actSocket());
        const outAct = new Rete.Output('act', i18n.de.act, SocketTypes.actSocket());


        node
            .addInput(inRef)
            .addInput(inVal)
            .addInput(inpAct)
            .addOutput(outAct);
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): any {

        taskHandler.removeListener(node.id);

        const nodeComp: RNode = this.editor!.nodes!.find((n:RNode) => n.id == node.id)!;

        const refConnection = nodeComp.getConnections().find((value, index) => (value.input.key == 'ref'));

        const valConnection = nodeComp.getConnections().find((value, index) => (value.input.key == 'val'));

        if (refConnection && refConnection.output.socket &&
            valConnection && valConnection.output.socket &&
            valConnection.output.socket != SocketTypes.getValByRef(refConnection.output.socket)) {
            valConnection.remove();
        } else if (refConnection && refConnection.output.socket) {
            nodeComp.inputs.get('val')!.socket = SocketTypes.getValByRef(refConnection.output.socket);
        } else if (valConnection && valConnection.output.socket) {
            nodeComp.inputs.get('ref')!.socket = SocketTypes.getRefByVal(valConnection.output.socket);
        }

        outputs['act'] = node.id+"";
        taskHandler.on([(inputs['act'] as string[])[0]!], node.id, (event:string, ...arsg:any)=>{this.task(node,inputs)});
    }

    async task(node: NodeData, inputs: WorkerInputs) {
        const ref = inputs['ref'][0] as Variable<number>;
        const val = inputs['val'][0] as number;
        if (ref && val!=null) {
            ref.set(val);
        }
    }
}

