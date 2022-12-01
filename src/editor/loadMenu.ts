import {Nodes} from "rete/types/core/data";
import {Node as RNode} from "rete";
import {IOs} from "rete/types/engine/component";
import {clearBoard, editor} from "./index";
import { save as saveDialog , open as openDialog} from '@tauri-apps/api/dialog';

import { writeTextFile, readTextFile} from '@tauri-apps/api/fs';

const save: any = {
    "id": "demo@0.1.0", "nodes": {
        "14": {
            "id": 14,
            "data": {},
            "inputs": {"in": {"connections": [{"node": 15, "output": "val", "data": {}}]}},
            "outputs": {},
            "position": [475.704839080989, -67.21715615165667],
            "name": "Anzeige"
        },
        "15": {
            "id": 15,
            "data": {"init": 1},
            "inputs": {"init": {"connections": []}},
            "outputs": {
                "type": {"connections": []},
                "ref": {"connections": [{"node": 17, "input": "ref", "data": {}}]},
                "val": {
                    "connections": [{"node": 19, "input": "num", "data": {}}, {
                        "node": 20,
                        "input": "num",
                        "data": {}
                    }, {"node": 14, "input": "in", "data": {}}]
                }
            },
            "position": [-296.13244996723756, -192.81906941216266],
            "name": "Variable:\nZahl"
        },
        "16": {
            "id": 16,
            "data": {"bool": false},
            "inputs": {},
            "outputs": {"bool": {"connections": [{"node": 18, "input": "bool", "data": {}}]}},
            "position": [87.00270014444396, 49.81343543681821],
            "name": "Wahrheitswert"
        },
        "17": {
            "id": 17,
            "data": {},
            "inputs": {
                "ref": {"connections": [{"node": 15, "output": "ref", "data": {}}]},
                "val": {"connections": [{"node": 18, "output": "res", "data": {}}]},
                "act": {"connections": [{"node": 25, "output": "res", "data": {}}]}
            },
            "outputs": {"act": {"connections": []}},
            "position": [801.587425854445, -191.34663947969932],
            "name": "Setze Variable"
        },
        "18": {
            "id": 18,
            "data": {},
            "inputs": {
                "bool": {"connections": [{"node": 16, "output": "bool", "data": {}}]},
                "if": {"connections": [{"node": 19, "output": "num", "data": {}}]},
                "else": {"connections": [{"node": 20, "output": "num", "data": {}}]}
            },
            "outputs": {"res": {"connections": [{"node": 17, "input": "val", "data": {}}]}},
            "position": [463.3349592855515, 155.716431618088],
            "name": "Bedingung"
        },
        "19": {
            "id": 19,
            "data": {"num2": 1},
            "inputs": {
                "num": {"connections": [{"node": 15, "output": "val", "data": {}}]},
                "num2": {"connections": []}
            },
            "outputs": {"num": {"connections": [{"node": 18, "input": "if", "data": {}}]}},
            "position": [93.07408603372114, 222.43367702103302],
            "name": "Addiere"
        },
        "20": {
            "id": 20,
            "data": {"num2": -1},
            "inputs": {
                "num": {"connections": [{"node": 15, "output": "val", "data": {}}]},
                "num2": {"connections": []}
            },
            "outputs": {"num": {"connections": [{"node": 18, "input": "else", "data": {}}]}},
            "position": [86.66979646391361, 472.41367906726475],
            "name": "Addiere"
        },
        "21": {
            "id": 21,
            "data": {},
            "inputs": {},
            "outputs": {
                "actRef": {"connections": [{"node": 23, "input": "actRef", "data": {}}]},
                "act": {
                    "connections": [{"node": 25, "input": "if", "data": {}}, {
                        "node": 22,
                        "input": "act",
                        "data": {}
                    }]
                }
            },
            "position": [202.98477439531933, -837.9360977894372],
            "name": "Ereigniss"
        },
        "22": {
            "id": 22,
            "data": {"val": 3},
            "inputs": {"val": {"connections": []}, "act": {"connections": [{"node": 21, "output": "act", "data": {}}]}},
            "outputs": {"act": {"connections": [{"node": 23, "input": "act", "data": {}}]}},
            "position": [761.4111930880648, -727.0837792118829],
            "name": "Warten"
        },
        "23": {
            "id": 23,
            "data": {},
            "inputs": {
                "actRef": {"connections": [{"node": 21, "output": "actRef", "data": {}}]},
                "act": {
                    "connections": [{"node": 22, "output": "act", "data": {}}, {
                        "node": 24,
                        "output": "act",
                        "data": {}
                    }]
                }
            },
            "outputs": {},
            "position": [1341.105416979991, -841.0902379918624],
            "name": "Auslöser"
        },
        "24": {
            "id": 24,
            "data": {},
            "inputs": {},
            "outputs": {"act": {"connections": [{"node": 23, "input": "act", "data": {}}]}},
            "position": [1072.8360171208794, -654.9653428776915],
            "name": "Drücker"
        },
        "25": {
            "id": 25,
            "data": {},
            "inputs": {
                "bool": {"connections": [{"node": 26, "output": "bool", "data": {}}]},
                "if": {"connections": [{"node": 21, "output": "act", "data": {}}]},
                "else": {"connections": []}
            },
            "outputs": {"res": {"connections": [{"node": 17, "input": "act", "data": {}}]}},
            "position": [527.3702224344131, -502.231731391048],
            "name": "Bedingung"
        },
        "26": {
            "id": 26,
            "data": {"bool": false},
            "inputs": {},
            "outputs": {"bool": {"connections": [{"node": 25, "input": "bool", "data": {}}]}},
            "position": [151.64642561674276, -520.2168585287731],
            "name": "Wahrheitswert"
        }
    }
};

export async function saveBoard() {
    const filePath = await saveDialog({
        filters: [{
          name: 'Speicherstand',
          extensions: ['json']
        }]
    });
    if(filePath)
        writeTextFile(filePath, JSON.stringify(editor))
}

export async function importBoard() {
    let filePath = await openDialog({
        filters: [{
          name: 'Speicherstand',
          extensions: ['json']
        }]
    });
    if(filePath){
        let json:string = "";
        json = await readTextFile(filePath as string);
        json = JSON.parse(json)
        if (json)
            load(json);
    }
}

export async function load(save: any) {
    clearBoard();

    await editor.fromJSON(save);
    for (const node of Object.values(<Nodes>save.nodes)) {
        if (editor.nodes.find((n: RNode) => n.id == node.id)) {
            const nodeComp = editor.nodes.find((n: RNode) => n.id == node.id);
            if (nodeComp.worker) {
                nodeComp.worker(node, <IOs>[], <IOs>[]);
            }
        }
    }
}


export function loadExample() {
    load(save);
}