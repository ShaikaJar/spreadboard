
import Rete, {Node as RNode} from "rete";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import {NumControl} from "@/editor/components/NumControl";
import i18n from "@/i18n";
import {Variable} from "@/editor/variables/Variable";
import {TaskComponent} from "@/editor/TaskComponent";
import * as Sockets from "@/editor/sockets";

export class WaitComponent extends TaskComponent {

    constructor() {
        super(i18n.de.wait);
    }

    variables: Map<number, Variable<number>> = new Map<number, Variable<number>>();

    async builder(node: RNode) {

        const preview: NumControl = new NumControl((trig:string,val:number)=>{}, 'preview', true);

        const inTime = new Rete.Input('val', i18n.de.initTime, Sockets.types.get("number")!.valSocket);


        const variable = new Variable<number>( (val:number) => {
            preview.setValue(Math.round(val));
            node.update();
            this.editor.trigger("process");
        });

        inTime.addControl(new NumControl((event:string,val:number)=>variable.setInitial(val), 'val', false));

        this.variables.set(node.id,variable);

        return node
            .addInput(inTime)
            .addControl(preview)
            .addOutput(new Rete.Output('act', '', Sockets.actSocket))
            .addInput(new Rete.Input('act', '', Sockets.actSocket));
    }

    worker(node: DNode, inputs:IOs, outputs:IOs): any {
        super.worker(node,inputs,outputs);

        const nodeComp = this.editor.nodes.find((n:RNode) => n.id == node.id)!;
        const variable = this.variables.get(node.id)!;

        const initVal = inputs['val'].length ? inputs['val'][0] : node.data.val;

        variable.setInitial(initVal);
    }

    private delay(ms:number){
        return new Promise(resolve => setTimeout(resolve,ms));
    }

    async task(node: DNode, inputs: IOs, outputs: IOs, event: string) {

        console.log("Try Waiting")
        const variable = this.variables.get(node.id)!;

        if(variable.getEdited()){
            variable.reset();
            return;
        }

        let lastTime:number = Date.now();
        let newTime: number = lastTime;
        while (variable.get()>0){
            console.log("Waiting")
            newTime= Date.now();
            variable.set(variable.get()-(newTime-lastTime)/1000);
            lastTime = newTime;
            await this.delay(1000);
        }
        variable.reset();
        variable.set(variable.get());
        return {node, inputs, outputs};
    }

}