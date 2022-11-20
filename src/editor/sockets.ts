import Rete, {Socket as RSocket} from "rete";


class SocketType {
    readonly name: string;
    readonly refSocket: RSocket;
    readonly valSocket: RSocket;

    constructor(name: string) {
        this.name = name;
        this.refSocket = new RSocket(name + " ref");
        this.valSocket = new RSocket(name + " val");
    }
}

const typeSocket = new RSocket("type");

class SocketTypeMap {
    private types: Map<string, SocketType>;
    constructor() {
        this.types = new Map();
    }

    add(typeName:string) {
        if (!(typeName in this.types.keys()))
            this.types.set(typeName, new SocketType(typeName));
    }

    get(typeName:string) {
        return this.types.get(typeName);
    }
}

const types = new SocketTypeMap();

types.add("text")
types.add("number")
types.add("boolean")

const actSocket = new Rete.Socket("act");

const string = new Rete.Socket("String");

types.get("number")!.valSocket.combineWith(string);


export {string, SocketType, types, actSocket, typeSocket};
