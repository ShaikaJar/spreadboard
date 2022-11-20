import Rete, {Node as RNode, Output} from "rete";
import {NumControl} from "@/editor/components/NumControl";
import * as Sockets from "@/editor/sockets";
import {Variable} from "./Variable";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";

export class NumVarComponent extends Rete.Component {

    variables: Map<number, Variable<number>>;

    constructor() {
        super("Number - Variable");
        this.variables = new Map<number, Variable<number>>();
    }

    async builder(node:RNode) {

        const inp = new Rete.Input('val', "Initial Value", Sockets.types.get("number")!.valSocket);
        inp.addControl(new NumControl(this.editor, 'val'));

        this.variables.set(node.id, new Variable<number>( (val:number) => {
            node.update();
            this.setPreview(node,val);
            this.editor.trigger("process");
        }));

        const outRef: Output = new Rete.Output('ref', "Reference", Sockets.types.get("number")!.refSocket);
        const outVal: Output = new Rete.Output('val', "Current Value", Sockets.types.get("number")!.valSocket);
        const outType = new Rete.Output('type', "Type", Sockets.typeSocket);

        return node
            .addControl(new NumControl(this.editor, 'preview', true))
            .addInput(inp)
            .addOutput(outRef)
            .addOutput(outVal)
            .addOutput(outType);
    }

    setPreview(node: RNode, value: number){
        const preview = node.controls.get('preview');
        //@ts-ignore
        preview.setValue(value);
    }

    worker(node: DNode, inputs:IOs, outputs:IOs) {

        const initVal = inputs['val'].length ? inputs['val'][0] : node.data.val;

        const variable = this.variables.get(node.id)!;

        variable.setInitial(initVal);
        //@ts-ignore
        this.setPreview(this.editor.nodes.find(n => n.id == node.id)!, variable.get());

        outputs["val"] = variable.get();
        outputs["ref"] = variable;
        outputs["type"] = "number";
    }
}

