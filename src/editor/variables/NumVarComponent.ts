import Rete, {Node as RNode, Output} from "rete";
import {NumControl} from "@/editor/components/NumControl";
import * as Sockets from "@/editor/sockets";
import {Variable} from "./Variable";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import i18n from "@/i18n";
import {editor} from "@/editor";

export class NumVarComponent extends Rete.Component {

    variables: Map<number, Variable<number>>;

    constructor() {
        super(i18n.de.numVar);
        this.variables = new Map<number, Variable<number>>();
    }

    async builder(node:RNode) {
        const preview = new NumControl((event:string,val:number)=>{editor.trigger(event);}, 'curVal', true);

        const variable = new Variable<number>( (val:number) => {
            console.log("Value Changed");
            preview.setValue(val);
            node.update();
            editor.trigger('process');
        });

        const inp = new Rete.Input('init', i18n.de.initVal, Sockets.types.get("number")!.valSocket);
        inp.addControl(new NumControl((event:string,val:number)=> {
            variable.setInitial(val);
        }, 'init'));

        this.variables.set(node.id, variable);

        const outRef: Output = new Rete.Output('ref', i18n.de.ref, Sockets.types.get("number")!.refSocket);
        const outVal: Output = new Rete.Output('val', i18n.de.curVal, Sockets.types.get("number")!.valSocket);
        const outType = new Rete.Output('type', i18n.de.type, Sockets.typeSocket);

        return node
            .addControl(preview)
            .addInput(inp)
            .addOutput(outType)
            .addOutput(outRef)
            .addOutput(outVal);
    }

    setPreview(node: RNode, value: number){
        const preview = <NumControl>node.controls.get('curVal');
        if(preview)
            preview.setValue(value);
    }

    worker(node: DNode, inputs:IOs, outputs:IOs) {
        const initVal = inputs['init'].length ? inputs['init'][0] : node.data.init;

        const variable = this.variables.get(node.id)!;

        variable.setInitial(initVal);
        //@ts-ignore
        const nodeComp = editor!.nodes!.find(n => n.id == node.id);

        this.setPreview(nodeComp, variable.get());

        outputs["val"] = variable.get();
        outputs["ref"] = variable;
        outputs["type"] = "number";
    }
}

