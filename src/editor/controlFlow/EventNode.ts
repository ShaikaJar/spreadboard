import Rete, {Component, Node as RNode} from "rete";
import * as Sockets from "../sockets";
import {ButtonControl} from "../controls/ButtonControl";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import i18n from "../i18n";
import taskHandler from "./EventEmitter";
import eventEmitter from "./EventEmitter";
import {SocketTypes} from "../sockets";

export class EventNode extends Component {

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

    worker(node: DNode, inputs:IOs, outputs:IOs): any {
        outputs["actRef"] = this.getActOut(node.id)+':trigger';
        outputs['act'] = this.getActOut(node.id)+':event';
        eventEmitter.removeListener(node.id);
        eventEmitter.on([outputs['actRef']], node.id, (event:string,...args:any)=>{
            console.log("triggered")
            if(outputs['act'] != null)
                eventEmitter.trigger(outputs['act']);
        });
    }
}