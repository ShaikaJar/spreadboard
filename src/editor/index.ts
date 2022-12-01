import Rete, {Node as RNode, NodeEditor} from "rete";
// @ts-ignore
import VueRenderPlugin from "rete-vue-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
//@ts-ignore
import AreaPlugin from "rete-area-plugin";
import DockPlugin from "rete-dock-plugin";
import {OutputComponent} from "./misc/OutputComponent";
import {AddComponent} from "./operations/AddComponent";
import {NumComponent} from "./values/NumComponent";
import {TextComponent} from "./values/TextComponent";
import {CombineComponent} from "./operations/CombineComponent";
import {HeaderComponent} from "./misc/HeaderComponent";
import {NumVarComponent} from "./variables/NumVarComponent";
import {ButtonComponent} from "./controlFlow/ButtonComponent";
import {SetVarComponent} from "./variables/SetVarComponent";
import {WaitComponent} from "./controlFlow/WaitComponent";
import {TriggerComponent} from "./controlFlow/TriggerComponent";
import {EventComponent} from "./controlFlow/EventComponent";
import {BoolComponent} from "./values/BoolComponent";
import {ConditionComponent} from "./controlFlow/ConditionComponent";


import eventEmitter from "./controlFlow/EventEmitter";
import {Variables} from "./variables/Variable";

let htmlContainer: any = null;

let editor: any = null;

async function start(container: HTMLElement){
    htmlContainer = container;
    htmlContainer.innerHTML = "";
    init(container);
}

export function clearBoard(){
    const nodes = (editor as NodeEditor).nodes;
    for (const node of nodes) {
        (editor as NodeEditor).removeNode(node);
    }
    editor.clear();
    eventEmitter.clear();
    for (const variableKey of Variables.keys()) {
        Variables.get(variableKey)!.clear();
    }
    console.log("Cleared");
    //init(htmlContainer);
}

async function init(container: HTMLElement, saveObj: Object = {id:"demo@0.1.0", nodes: {}}) {
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

    //document.querySelector(".dock")!.innerHTML = "";

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
            new ButtonComponent(),
            new SetVarComponent(),
            new WaitComponent(),
            new TriggerComponent(),
            new EventComponent(),
            new BoolComponent(),
            new ConditionComponent()
        ];

    for (let i = 0; i < compList.length; i++) {
        editor.register(compList[i]);
        engine.register(compList[i]);
    }

    // add starting node
    await editor.fromJSON(
        saveObj
    );

    editor.on(
        ["connectioncreate", 'connectionremove', "nodecreate", 'noderemove'],
        (data: any) => {
            editor.trigger("process");
        }
    );

    editor.on('process', async () => {
        //console.log('json', editor.toJSON());
        await engine.abort();
        await engine.process(editor.toJSON());
    });


    editor.view.resize();
    editor.trigger('process');
}


export {start, editor};
