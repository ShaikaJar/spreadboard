import Rete, {Node as RNode} from "rete";
import * as Sockets from "@/editor/sockets";
import {ButtonControl} from "@/editor/controls/ButtonControl";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import i18n from "@/i18n";
import taskHandler from "@/editor/controlFlow/EventEmitter";
import eventEmitter from "@/editor/controlFlow/EventEmitter";
import {SocketTypes} from "@/editor/sockets";

export class EventComponent extends Rete.Component {

    constructor(){
        super(i18n.de.event);
    }

    async builder(node: RNode) {
        node.addOutput(new Rete.Output('actRef', '', SocketTypes.eventSocket()))
        node.addOutput(new Rete.Output('act', '', SocketTypes.actSocket()))
    }

    worker(node: DNode, inputs:IOs, outputs:IOs): any {
        outputs["actRef"] = node.id+'-trigger';
        outputs['act'] = node.id+'-event';
        eventEmitter.removeListener(node.id);
        eventEmitter.on([outputs['actRef']], node.id, (event:string,...args:any)=>{
            //console.log("triggered")
            if(outputs['act'] != null)
                eventEmitter.trigger(outputs['act']);
        });
    }
}