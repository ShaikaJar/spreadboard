import Rete, {Node, NodeEditor} from "rete";
// @ts-ignore
import VueRenderPlugin from "rete-vue-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
//@ts-ignore
import AreaPlugin from "rete-area-plugin";
import DockPlugin from "rete-dock-plugin";
import 'regenerator-runtime/runtime'
import {OutputComponent} from "@/editor/components/OutputComponent";
import {AddComponent} from "@/editor/components/AddComponent";
import {NumComponent} from "@/editor/components/NumComponent";
import {TextComponent} from "@/editor/components/TextComponent";
import {CombineComponent} from "@/editor/components/CombineComponent";
import {HeaderComponent} from "@/editor/components/HeaderComponent";
import {NumVarComponent} from "@/editor/variables/NumVarComponent";
import {TriggerComponent} from "@/editor/TriggerComponent";
import {SetVarComponent} from "@/editor/variables/SetVarComponent";
import {NumControl} from "@/editor/components/NumControl";


function replay(editor: NodeEditor) {
    const nodes = editor.nodes;
    for (const node of nodes) {
        for (const outputKey of node.outputs.keys()) {
            const output = node.outputs.get(outputKey)!;
            for (const connection of output.connections) {
                const conOut = editor.nodes.find(value => value.id=node.id)!.outputs.get(connection.output.key)!;
                const conIn = editor.nodes.find(value => value.id=connection.input.node!.id)!.inputs.get(connection.input.key)!;

                editor.connect(conOut,conIn);
            }
        }
    }
}

const save = {
    "id": "demo@0.1.0",
    "nodes": {}
};

let editor: any = null;

async function init(container: HTMLElement) {
    editor = new Rete.NodeEditor("demo@0.1.0", container);
    const engine = new Rete.Engine('demo@0.1.0');
    editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin);
    editor.use(AreaPlugin, {
        background: false,
        snap: false,
        scaleExtent: {min: 0.25, max: 1},
        translateExtent: {width: 5000, height: 4000}
    });

    // register before dock plugin to prevent showing in dock

    const outputComp = new OutputComponent(".output-view");
    editor.register(outputComp);
    engine.register(outputComp);


    editor.use(ContextMenuPlugin);

    editor.use(DockPlugin, {
        //@ts-ignore
        container: document.querySelector(".dock"),
        plugins: [VueRenderPlugin] // render plugins
    });

    const compList =
        [
            new AddComponent(),
            new NumComponent(),
            new TextComponent(),
            new CombineComponent(),
            new HeaderComponent(),
            new NumVarComponent(),
            new TriggerComponent(),
            new SetVarComponent()
        ];

    for (let i = 0; i < compList.length; i++) {
        editor.register(compList[i]);
        engine.register(compList[i]);
    }

    // add starting node
    await editor.fromJSON(save);

    replay(editor);

    editor.on(
        ["connectioncreate", 'connectionremove', "nodecreate", 'noderemove'],
        (data: any) => {
            editor.trigger("process");
        }
    );

    editor.on('process', async () => {
        console.log('json', editor.toJSON());
        await engine.abort();
        await engine.process(editor.toJSON());
    });


    editor.view.resize();
}


export {init, editor};
