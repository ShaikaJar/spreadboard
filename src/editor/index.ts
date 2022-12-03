import Rete, {Node as RNode, NodeEditor} from "rete";
// @ts-ignore
import VueRenderPlugin from "rete-vue-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
//@ts-ignore
import AreaPlugin from "rete-area-plugin";
import DockPlugin from "rete-dock-plugin";
import {OutputNode} from "./misc/OutputNode";
import {AddNode} from "./operations/AddNode";
import {NumNode} from "./values/NumNode";
import {TextNode} from "./values/TextNode";
import {CombineNode} from "./operations/CombineNode";
import {HeaderNode} from "./misc/HeaderNode";
import {NumVarNode} from "./variables/NumVarNode";
import {ButtonNode} from "./controlFlow/ButtoNode";
import {SetVarNode} from "./variables/SetVarNode";
import {WaitNode} from "./controlFlow/WaitNode";
import {TriggerNode} from "./controlFlow/TriggerNode";
import {EventNode} from "./controlFlow/EventNode";
import {BoolNode} from "./values/BoolNode";
import {ConditionNode} from "./controlFlow/ConditionNode";


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

    const outputComp = new OutputNode(".output-view");
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
            new AddNode(),
            new NumNode(),
            new TextNode(),
            new CombineNode(),
            new HeaderNode(),
            new NumVarNode(),
            new ButtonNode(),
            new SetVarNode(),
            new WaitNode(),
            new TriggerNode(),
            new EventNode(),
            new BoolNode(),
            new ConditionNode()
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
