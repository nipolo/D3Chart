import { INodeConnection } from './i-node-connections.model'
import { INodeModel } from './i-node.model'

export class NodeConnection implements INodeConnection {
    constructor(private _parentNode: INodeModel, private _childNode: INodeModel) {

    }

    public get parentNode(): INodeModel {
        return this._parentNode;
    }
    public set parentNode(val: INodeModel) {
        this._parentNode = val;
    }
    public get childNode(): INodeModel {
        return this._childNode;
    }
    public set childNode(val: INodeModel) {
        this._childNode = val;
    }
} 