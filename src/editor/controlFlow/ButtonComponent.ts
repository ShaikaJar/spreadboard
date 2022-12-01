import Rete, {Component, Node as RNode} from "rete";
import * as Sockets from "../sockets";
import {ButtonControl} from "../controls/ButtonControl";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import i18n from "../i18n";
import taskHandler from "../controlFlow/EventEmitter";
import {SocketTypes} from "../sockets";

export class ButtonComponent extends Component {

    constructor(){
        super(i18n.de.button);
    }

    async builder(node: RNode) {
        node.addControl(new ButtonControl(()=>{
            taskHandler.trigger(node.id+'-onClick');
        }, "start"))
        node.addOutput(new Rete.Output('act', '', SocketTypes.actSocket()))
    }

    worker(node: DNode, inputs:IOs, outputs:IOs): any {
        outputs['act']= node.id+"-onClick";
    }
}