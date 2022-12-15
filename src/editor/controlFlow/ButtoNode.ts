import Rete, {Component, Node as RNode} from "rete";
import * as Sockets from "../sockets";
import {ButtonControl} from "../controls/ButtonControl";
import i18n from "../i18n";
import taskHandler from "./EventEmitter";
import {SocketTypes} from "../sockets";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";

export class ButtonNode extends Component {

    category:string[] = ["Kontrollfluss"];

    constructor(){
        super(i18n.de.button);
    }

    async builder(node: RNode) {
        node.addControl(new ButtonControl(()=>{
            taskHandler.trigger(node.id+'-onClick');
        }, "start"))
        node.addOutput(new Rete.Output('act', '', SocketTypes.actSocket()))
    }

    worker(node: NodeData, inputs:WorkerInputs, outputs:WorkerOutputs): any {
        outputs['act']= node.id+"-onClick";
    }
}