import Rete, {Node as RNode} from "rete";
import * as Sockets from "@/editor/sockets";
import {ButtonControl} from "@/editor/components/ButtonControl";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import i18n from "@/i18n";
import taskHandler from "@/editor/controlFlow/EventEmitter";

export class TriggerComponent extends Rete.Component {

    constructor(){
        super(i18n.de.trigger);
    }

    async builder(node: RNode) {
        node.addControl(new ButtonControl(()=>{
            taskHandler.trigger(node.id+'-onClick');
        }, "start"))
        node.addOutput(new Rete.Output('act', '', Sockets.actSocket))
    }

    worker(node: DNode, inputs:IOs, outputs:IOs): any {
        outputs['act']= node.id+"-onClick";
    }
}