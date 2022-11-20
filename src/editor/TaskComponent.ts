import Rete, {Node as RNode} from "rete";
import {Node as DNode} from "rete/types/core/data";
import {IOs} from "rete/types/engine/component";

class TaskEmitter {
    public onEmits: Map<number, Function> = new Map();

    public emit(event: any) {
        for (const onEmit of this.onEmits.values()) {
            onEmit.call(event);
        }
    }
}

export abstract class TaskComponent extends Rete.Component {

    constructor(name:string) {
        super(name);
        this.listenerMap = new Map();
        this.emitterMap = new Map();
        this.inputMap = new Map();
        this.nodeMap = new Map();
        this.outputMap = new Map;
    }
    protected emitterMap: Map<number,TaskEmitter>;
    private listenerMap: Map<number,TaskEmitter[]>;

    private inputMap: Map<number, IOs>;
    private outputMap: Map<number, IOs>;
    private nodeMap: Map<number, DNode>;

    worker(node: DNode, inputs: IOs, outputs: IOs) {
        //@ts-ignore
        const nodeComp: RNode = this.editor!.nodes!.find(n => n.id == node.id);

        if(this.listenerMap.get(node.id))
            this.listenerMap.get(node.id)!.forEach(
            (emitter: TaskEmitter) => emitter.onEmits.delete(node.id)
        );
        this.listenerMap.set(node.id, []);

        for (const key of nodeComp.inputs.keys()) {
            if (key.includes("act")) {
                const listener = (<TaskEmitter>inputs[key][0]);
                if (listener) {
                    console.log("Listening")
                    this.listenerMap.get(node.id)!.push(listener);
                    listener.onEmits.set(node.id, (event: any) => this.run(node.id, event))
                }
            }
        }

        for (const key of nodeComp.outputs.keys()) {
            if (key.includes("act")) {
                if (!this.emitterMap.get(node.id))
                    this.emitterMap.set(node.id, new TaskEmitter());
                outputs[key] = this.emitterMap.get(node.id);
            }
        }

        this.inputMap.set(node.id, inputs);
        this.outputMap.set(node.id, outputs);
        this.nodeMap.set(node.id, node);
        return {node: node, inputs: inputs,outputs: outputs};
    }

    abstract task(node: DNode, inputs: IOs, outputs: IOs, event: string): Promise<any>;

    run(nodeId: number, event: any) {
        const node = this.nodeMap.get(nodeId)!;
        // @ts-ignore
        const nodeComp: RNode = this.editor!.nodes!.find(n => n.id == nodeId);
        this.task(node, this.inputMap.get(nodeId)!, this.outputMap.get(nodeId)!, event).then(
            (value: any) => {
                this.emitterMap.get(nodeId)!.emit(value);
            }
        );
    }


}