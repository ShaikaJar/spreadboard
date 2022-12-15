import Rete, {Component, Node as RNode} from "rete";
import * as Sockets from "../sockets";
import {ButtonControl} from "../controls/ButtonControl";
import i18n from "../i18n";
import taskHandler from "./EventEmitter";
import eventEmitter from "./EventEmitter";
import {SocketTypes} from "../sockets";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";

export class EventNode extends Component {

    category:string[] = ["Kontrollfluss"];
    private declare varKey:string;

    constructor(){
        super(i18n.de.event);
        this.varKey = this.name+Math.random();
    }

    getActOut(nodeId:number){
        return this.varKey+':'+nodeId;
    }

    async builder(node: RNode) {
        node.addOutput(new Rete.Output('actRef', '', SocketTypes.eventSocket()))
        node.addOutput(new Rete.Output('act', '', SocketTypes.actSocket()))
    }

    worker(node: NodeData, inputs:WorkerInputs, outputs:WorkerOutputs): any {
        outputs["actRef"] = this.getActOut(node.id)+':trigger';
        outputs['act'] = this.getActOut(node.id)+':event';
        eventEmitter.removeListener(node.id);
        eventEmitter.on([outputs['actRef']as string], node.id, (event:string,...args:any)=>{
            console.log("triggered")
            if(outputs['act'] != null)
                eventEmitter.trigger(outputs['act']as string);
        });
    }
}