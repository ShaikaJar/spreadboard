import Rete, {Node as RNode} from "rete";
import * as Sockets from "@/editor/sockets";
import {ButtonControl} from "@/editor/controls/ButtonControl";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import i18n from "@/i18n";
import taskHandler from "@/editor/controlFlow/EventEmitter";
import eventEmitter from "@/editor/controlFlow/EventEmitter";
import {SocketTypes} from "@/editor/sockets";

export class TriggerComponent extends Rete.Component {

    constructor(){
        super(i18n.de.trigger);
    }

    async builder(node: RNode) {
        node.addInput(new Rete.Input('actRef', '', SocketTypes.eventSocket()))
        node.addInput(new Rete.Input('act', '', SocketTypes.actSocket(), true))
    }

    worker(node: DNode, inputs:IOs, outputs:IOs): any {
        eventEmitter.removeListener(node.id);
        eventEmitter.on(inputs['act'], node.id, (event:string,...args:any)=>{
            //console.log("Trigger",inputs['actRef'][0] )
            if(inputs['actRef'][0] != null)
                eventEmitter.trigger(inputs['actRef'][0]);
        });
    }
}