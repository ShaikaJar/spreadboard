import Rete, {Node as RNode} from "rete";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import {NumControl} from "@/editor/controls/NumControl";
import i18n from "@/i18n";
import {Variable} from "@/editor/variables/Variable";
import * as Sockets from "@/editor/sockets";
import {editor} from "@/editor";
import taskHandler from "@/editor/controlFlow/EventEmitter";
import {SocketTypes} from "@/editor/sockets";
import {LoadingControl} from "@/editor/controls/LoadingControl";

export class WaitComponent extends Rete.Component {

    constructor() {
        super(i18n.de.wait);
    }

    variables: Map<number, Variable<number>> = new Map<number, Variable<number>>();

    async builder(node: RNode) {

        const preview: LoadingControl = new LoadingControl((event: string, val: number) => {
        }, 'preview', true);

        const inControll = new NumControl((event: String, val: number) => {
            const oldInit = variable.getInitial();
            variable.setInitial(val);
            preview.setValue(oldInit*preview.getValue()/val);
        }, 'val', false);

        const inTime = new Rete.Input('val', i18n.de.initTime, SocketTypes.get("number")!.valSocket);

        const variable = new Variable<number>((val: number) => {
            preview.setValue(Math.round(val*100/variable.getInitial()));
            //if(inControll.getValue()!=val)
            //    inControll.setValue(val);
            //editor.trigger("process");
        });

        inTime.addControl(inControll);

        this.variables.set(node.id, variable);

        return node
            .addInput(inTime)
            .addControl(preview)
            .addOutput(new Rete.Output('act', '', SocketTypes.actSocket()))
            .addInput(new Rete.Input('act', '', SocketTypes.actSocket()));
    }

    worker(node: DNode, inputs: IOs, outputs: IOs): any {

        taskHandler.removeListener(node.id);

        const nodeComp = editor.nodes.find((n: RNode) => n.id == node.id)!;
        const variable = this.variables.get(node.id)!;

        const initVal = inputs['val'].length ? inputs['val'][0] : node.data.val;
        outputs['act'] = node.id + "";
        variable.setInitial(initVal);
        taskHandler.on([inputs['act'][0]!], node.id, (event: string, ...args: any) => {
            this.task(node, inputs)
        })
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async task(node: DNode, inputs: IOs) {

        //console.log("Try Waiting")
        const variable = this.variables.get(node.id)!;

        if (variable.getEdited()) {
            variable.reset();
            return;
        }

        let lastTime: number = Date.now();
        let newTime: number = lastTime;
        const time = 10;
        while (variable.get() > 0) {
            await this.delay(time);
            //console.log("Waiting")
            newTime = Date.now();
            variable.set(variable.get() - (newTime - lastTime) / 1000);
            lastTime = newTime;
        }
        variable.reset();
        variable.set(variable.get());
        taskHandler.trigger(node.id + "");
    }

}