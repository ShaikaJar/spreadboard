import Rete, {Node as RNode, Output, Component} from "rete";
import {NumControl} from "../controls/NumControl";
import {Variable, Variables} from "./Variable";
import i18n from "../i18n";
import {editor} from "../index";
import {SocketTypes} from "../sockets";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";

export class NumVarNode extends Component {

    category:string[] = ["Zahl"];
    private declare varKey:string;

    variables = () => <Map<number,Variable<number>>>Variables.get(this.varKey)!;

    constructor() {
        super(i18n.de.numVar);
        this.varKey = this.name+Math.random();
        Variables.set(this.varKey, new Map<number,Variable<number>>);
    }

    async builder(node: RNode) {
        const preview = new NumControl((event: string, val: number) => {
            editor.trigger(event);
        }, 'curVal', true, i18n.de.curVal);

        const variable = new Variable<number>((val: number) => {
            console.log("Value Changed");
            preview.setValue(val);
            node.update();
            editor.trigger('process');
        });

        const inp = new Rete.Input('init', i18n.de.initVal, SocketTypes.numSocket().valSocket);
        inp.addControl(new NumControl((event: string, val: number) => {
            variable.setInitial(val);
        }, 'init', false, i18n.de.val));

        this.variables().set(node.id, variable);

        const outRef: Output = new Rete.Output('ref', i18n.de.ref, SocketTypes.numSocket().refSocket);
        const outVal: Output = new Rete.Output('val', i18n.de.curVal, SocketTypes.numSocket().valSocket);
        const outType = new Rete.Output('type', i18n.de.type, SocketTypes.typeSocket);

        node
            .addControl(preview)
            .addInput(inp)
            .addOutput(outType)
            .addOutput(outRef)
            .addOutput(outVal);
    }

    setPreview(node: RNode, value: number) {
        const preview = <NumControl>node.controls.get('curVal');
        if (preview)
            preview.setValue(value);
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
        const initVal = (inputs['init'].length ? inputs['init'][0] : node.data.init) as number;

        const variable = this.variables().get(node.id)!;

        variable.setInitial(initVal);

        const nodeComp = editor!.nodes!.find((n:RNode) => n.id == node.id)!;

        this.setPreview(nodeComp, variable.get());

        outputs["val"] = variable.get();
        outputs["ref"] = variable;
        outputs["type"] = "number";
    }
}

