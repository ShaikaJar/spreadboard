import Rete, {Component, Node as RNode} from "rete";
import * as Sockets from "../sockets";
import {ButtonControl} from "../controls/ButtonControl";
import i18n from "../i18n";
import taskHandler from "./EventEmitter";
import eventEmitter from "./EventEmitter";
import {SocketTypes} from "../sockets";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";

export class TriggerNode extends Component {
    category:string[] = ["Kontrollfluss"];

    constructor(){
        super(i18n.de.trigger);
    }

    async builder(node: RNode) {
        node.addInput(new Rete.Input('actRef', '', SocketTypes.eventSocket()))
        node.addInput(new Rete.Input('act', '', SocketTypes.actSocket(), true))
    }

    worker(node: NodeData, inputs:WorkerOutputs, outputs:WorkerInputs): any {
        eventEmitter.removeListener(node.id);
        eventEmitter.on(inputs['act'] as string[], node.id, (event:string,...args:any)=>{
            //console.log("Trigger",inputs['actRef'][0] )
            if((inputs['actRef'] as string[])[0] != null)
                eventEmitter.trigger((inputs['actRef'] as string[])[0]);
        });
    }
}