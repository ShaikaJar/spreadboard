import Rete, { Socket } from "rete";

const string = new Socket("String");
const numSocket = new Rete.Socket('Number');

numSocket.combineWith(string);


export { string , numSocket};
