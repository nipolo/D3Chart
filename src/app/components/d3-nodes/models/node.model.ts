import { INodeModel } from './i-node.model'

export class NodeModel implements INodeModel {

    constructor(private _center: { x: number, y: number },
        private _size: number,
        private _label: string) {
    }

    get center(): { x: number, y: number } {
        return this._center;
    }
    set center(val: { x: number, y: number }) {
        this._center.x = val.x;
        this._center.y = val.y;
    }
    get size(): number {
        return this._size;
    }
    set size(val: number) {
        this._size = val;
    }
    get label(): string {
        return this._label;
    }
    set label(val: string) {
        this._label = val;
    }
}