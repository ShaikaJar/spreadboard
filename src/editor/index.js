import Rete from "rete";
import VueRenderPlugin from "rete-vue-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import DockPlugin from "rete-dock-plugin";
import 'regenerator-runtime/runtime'
import {OutputComponent} from "@/editor/components/OutputComponent";
import {AddComponent} from "@/editor/components/AddComponent";
import {NumComponent} from "@/editor/components/NumComponent";
import {TextComponent} from "@/editor/components/TextComponent";
import {CombineComponent} from "@/editor/components/CombineComponent";
import {HeaderComponent} from "@/editor/components/HeaderComponent";

export default async function (container) {
    const editor = new Rete.NodeEditor("demo@0.1.0", container);
    var engine = new Rete.Engine('demo@0.1.0');
    editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin);
    editor.use(AreaPlugin, {
        background: false,
        snap: false,
        scaleExtent: { min: 0.25, max: 1 },
        translateExtent: { width: 5000, height: 4000 }
    });

    // register before dock plugin to prevent showing in dock

    const outputComp = new OutputComponent(".output-view");
    editor.register(outputComp);
    engine.register(outputComp);


    editor.use(ContextMenuPlugin);

    editor.use(DockPlugin, {
        container: document.querySelector(".dock"),
        plugins: [VueRenderPlugin] // render plugins
    });


    const addComp = new AddComponent();
    const numComp = new NumComponent();
    const txtComp = new TextComponent();
    const combComp = new CombineComponent();
    const hComp = new HeaderComponent();
    editor.register(addComp);
    editor.register(numComp);
    editor.register(txtComp);
    editor.register(combComp);
    editor.register(hComp);

    engine.register(addComp);
    engine.register(numComp);
    engine.register(txtComp);
    engine.register(combComp);
    engine.register(hComp)

    // add starting node
    await editor.fromJSON({
        id: "demo@0.1.0",
        nodes: {
            "1": {
                id: 1,
                position: [100, 50],
                name: "OutputComponent"
            }
        }
    });

    editor.on(
        "connectioncreate connectionremove nodecreate noderemove",
        (data) => {
            console.log("editor something", data);
            console.log("editor", editor.toJSON());
            editor.trigger("process");
        }
    );

    editor.on('process', async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
    });

    editor.view.resize();
}
