import {NodeEditor} from "rete";
import {EventsTypes as EventsTypesCore} from "rete/types/core/events";
import {EventsTypes} from "rete/types/events";

export class MyEditor extends NodeEditor{
    override trigger(name: any, params?: any): any {
        //console.log('Triggered: ', name, params);
        return super.trigger(name, params);
    }
}