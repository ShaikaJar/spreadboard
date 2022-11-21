import Rete from "rete";
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


let editor: any = null;

async function init (container: HTMLElement) {
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
    await editor.fromJSON({
        id: "demo@0.1.0",
        nodes: {
            "1": {
                id: 1,
                position: [100, 50],
                name: "OutputComponent",
                //@ts-ignore
                inputs: null,
                //@ts-ignore
                outputs: null,
                data: null,
            }
        }
    });

    editor.on(
        ["connectioncreate", "connectionremove", "nodecreate", "noderemove"],
        (data: any) => {
            console.log("editor something", data);
            console.log("editor", editor.toJSON());
            editor.trigger("process");
        }
    );

    editor.on('process', async () => {
        console.log("Starting Process");
        await engine.abort();
        await engine.process(editor.toJSON());
    });

    editor.view.resize();
}

export {init, editor};
