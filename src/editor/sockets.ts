import Rete, {Socket, Socket as RSocket} from "rete";


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

const anyTypeSocket = new SocketType("any");

class SocketTypeMap {
    private types: Map<string, SocketType>;
    constructor() {
        this.types = new Map();
    }

    add(typeName:string) {
        if (!(typeName in this.types.keys())) {
            const socket = new SocketType(typeName)
            this.types.set(typeName,socket);
            socket.refSocket.combineWith(anyTypeSocket.refSocket);
            socket.valSocket.combineWith(anyTypeSocket.valSocket);
        }
    }

    getRefByVal(socket: Socket):Socket{
        return this.get(socket.name.replace(" val",""))!.refSocket;
    }
    getValByRef(socket: Socket):Socket{
        return this.get(socket.name.replace(" ref",""))!.valSocket;
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


types.get("number")!.valSocket.combineWith(types.get("text")!.valSocket);


export {SocketType, types, actSocket, typeSocket, anyTypeSocket};
