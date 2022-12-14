import Rete, {Component, Node as RNode} from "rete";
import {NumControl} from "../controls/NumControl";
import i18n from "../i18n";
import {Variable, Variables} from "../variables/Variable";
import * as Sockets from "../sockets";
import {editor} from "../index";
import taskHandler from "./EventEmitter";
import {SocketTypes} from "../sockets";
import {LoadingControl} from "../controls/LoadingControl";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";

export class WaitNode extends Component {

    category:string[] = ["Kontrollfluss"];

    private declare varKey:string;

    constructor() {
        super(i18n.de.wait);
        this.varKey = this.name+Math.random();
        Variables.set(this.varKey, new Map<number, Variable<number>>);
    }

    variables = () => <Map<number, Variable<number>>>Variables.get(this.varKey)!;

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

        this.variables().set(node.id, variable);

        node
            .addInput(inTime)
            .addControl(preview)
            .addOutput(new Rete.Output('act', '', SocketTypes.actSocket()))
            .addInput(new Rete.Input('act', '', SocketTypes.actSocket()));
    }

    getActOut(nodeId:number){
        return this.varKey+':'+nodeId;
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): any {

        taskHandler.removeListener(node.id);

        const nodeComp = editor.nodes.find((n: RNode) => n.id == node.id)!;
        const variable = this.variables().get(node.id)!;

        const initVal = (inputs['val'].length ? inputs['val'][0] : node.data.val) as number;
        outputs['act'] = this.getActOut(node.id);
        variable.setInitial(initVal);
        taskHandler.on([(inputs['act'] as string[])[0]!], node.id, (event: string, ...args: any) => {
            this.task(node, inputs)
        })
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async task(node: NodeData, inputs: WorkerInputs) {

        //console.log("Try Waiting")
        const variable = this.variables().get(node.id)!;

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
        taskHandler.trigger(this.getActOut(node.id));
    }

}