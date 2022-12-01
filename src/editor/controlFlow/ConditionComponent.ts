import Rete, {Connection, Input, Node as RNode, Output, Socket, Component} from "rete";
import {NumControl} from "../controls/NumControl";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import i18n from "../i18n";
import taskHandler from "../controlFlow/EventEmitter";
import {SocketTypes} from "../sockets";

export class ConditionComponent extends Component {

    constructor() {
        super(i18n.de.condition);
    }

    async builder(node: RNode) {
        const inCondition = new Rete.Input('bool', i18n.de.bool, SocketTypes.boolSocket().valSocket);
        const inIf = new Rete.Input('if', i18n.de.if, SocketTypes.anySocket);
        const inElse = new Rete.Input('else', i18n.de.else, SocketTypes.anySocket);


        const outRes = new Rete.Output('res', i18n.de.res, SocketTypes.anySocket);


        return node
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

    worker(node: DNode, inputs: IOs, outputs: IOs): any {

        taskHandler.removeListener(node.id);

        // @ts-ignore
        const nodeComp: RNode = this.editor!.nodes!.find(n => n.id == node.id);

        // @ts-ignore
        const ifConn = nodeComp.getConnections().find((value, index) => (value.input.key == 'if'));

        // @ts-ignore
        const elseConn = nodeComp.getConnections().find((value, index) => (value.input.key == 'else'));

        // @ts-ignore
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

