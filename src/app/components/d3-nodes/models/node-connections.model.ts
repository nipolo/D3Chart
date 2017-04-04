import { INodeConnection } from './i-node-connections.model'
import { INodeModel } from './i-node.model'

export class NodeConnection implements INodeConnection {
    constructor(private _parentNodeKey: string, private _childNodeKey: string) {

    }

    get key(): string {
        return this._parentNodeKey + '_' + this._childNodeKey;
    }
    public get parentNodeKey(): string {
        return this._parentNodeKey;
    }
    public set parentNodeKey(val: string) {
        this._parentNodeKey = val;
    }
    public get childNodeKey(): string {
        return this._childNodeKey;
    }
    public set childNodeKey(val: string) {
        this._childNodeKey = val;
    }
} 