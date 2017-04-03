import { INodeModel } from './i-node.model'

export interface INodeConnection{
    parentNode: INodeModel;
    childNode: INodeModel;
}