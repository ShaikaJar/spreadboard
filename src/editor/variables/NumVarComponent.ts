import Rete, {Node as RNode, Output} from "rete";
import {NumControl} from "@/editor/components/NumControl";
import * as Sockets from "@/editor/sockets";
import {Variable} from "./Variable";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";
import i18n from "@/i18n";

export class NumVarComponent extends Rete.Component {

    variables: Map<number, Variable<number>>;

    constructor() {
        super(i18n.de.numVar);
        this.variables = new Map<number, Variable<number>>();
    }

    async builder(node:RNode) {

        const inp = new Rete.Input('val', i18n.de.initVal, Sockets.types.get("number")!.valSocket);
        inp.addControl(new NumControl(this.editor, 'val'));

        this.variables.set(node.id, new Variable<number>( (val:number) => {
            node.update();
            this.setPreview(node,val);
            this.editor.trigger("process");
        }));

        const outRef: Output = new Rete.Output('ref', i18n.de.ref, Sockets.types.get("number")!.refSocket);
        const outVal: Output = new Rete.Output('val', i18n.de.curVal, Sockets.types.get("number")!.valSocket);
        const outType = new Rete.Output('type', i18n.de.type, Sockets.typeSocket);

        return node
            .addControl(new NumControl(this.editor, 'preview', true))
            .addInput(inp)
            .addOutput(outType)
            .addOutput(outRef)
            .addOutput(outVal);
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

