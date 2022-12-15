import Rete, {Connection, Input, Node as RNode, Output, Socket, Component} from "rete";
import i18n from "../i18n";
import taskHandler from "./EventEmitter";
import {SocketTypes} from "../sockets";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";

export class ConditionNode extends Component {

    category:string[] = ["Kontrollfluss"];
    constructor() {
        super(i18n.de.condition);
    }

    async builder(node: RNode) {
        const inCondition = new Rete.Input('bool', i18n.de.bool, SocketTypes.boolSocket().valSocket);
        const inIf = new Rete.Input('if', i18n.de.if, SocketTypes.anySocket);
        const inElse = new Rete.Input('else', i18n.de.else, SocketTypes.anySocket);


        const outRes = new Rete.Output('res', i18n.de.res, SocketTypes.anySocket);


        node
            .addInput(inCondition)
            .addInput(inIf)
            .addInput(inElse)
            .addOutput(outRes);
    }

    reconnectOutput(output: Output | undefined, connection: Connection|undefined, newSocketType: Socket){
        if(output){
            if(!newSocketType.compatibleWith(output.socket))
                connection?.remove();

            output.socket = newSocketType;
        }
    }


    reconnectInput(input: Input | undefined, connection: Connection|undefined, newSocketType: Socket){
        if(input){
            if(!newSocketType.compatibleWith(input.socket))
                connection?.remove();

            input.socket = newSocketType;
        }
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): any {

        taskHandler.removeListener(node.id);

        const nodeComp: RNode = this.editor!.nodes!.find(n => n.id == node.id)!;

        const ifConn = nodeComp.getConnections().find((value, index) => (value.input.key == 'if'));

        const elseConn = nodeComp.getConnections().find((value, index) => (value.input.key == 'else'));

        const resConn = nodeComp.getConnections().find((value, index) => (value.input.key == 'res'));


        let socketType = SocketTypes.anySocket;


        if (ifConn && ifConn.output.socket) {
            socketType = ifConn.output.socket;
        } else if (elseConn && elseConn.output.socket) {
            socketType = elseConn.output.socket;
        }else if(resConn && resConn.output.socket){
            socketType = resConn.output.socket;
        }


        this.reconnectInput(nodeComp.inputs.get('if'), ifConn,socketType);
        this.reconnectInput(nodeComp.inputs.get('else'), elseConn,socketType);
        this.reconnectOutput(nodeComp.outputs.get('res'), resConn,socketType);


        console.log(inputs['bool'][0]);

        outputs['res'] = (inputs['bool'][0])?(inputs['if'][0]):(inputs['else'][0]);
    }
}

