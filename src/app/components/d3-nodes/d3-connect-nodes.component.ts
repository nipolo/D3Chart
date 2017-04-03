import { Component, AfterViewInit } from '@angular/core';
import * as d3 from 'd3'
import * as R from 'ramda'
import { DragBehavior } from 'd3'
import { NodeModel } from './models/node.model'
import { NodeConnection } from './models/node-connections.model'

@Component({
    selector: 'd3-connect-nodes.component',
    templateUrl: 'd3-connect-nodes.component.html'
})
export class D3ConnectNodes implements AfterViewInit {

    private _selectedNode: NodeModel;
    public _colors: d3.ScaleOrdinal<string, any>;
    private _width: number;
    private _height: number;
    private _svg: d3.Selection<any, any, any, any>;
    private _nodes: NodeModel[];
    private _nodeConnections: NodeConnection[];

    constructor() {

        let D3 = d3;
        this._nodes = [];
        this._nodeConnections = [];
        this._width = 300;
        this._height = 400;

        if (this._nodes.length == 0) {
            this.initTestData(4);
        }
    }

    ngAfterViewInit(): void {

        d3.select("body")
            .on("touchstart", () => { d3.event.preventDefault(); })
            .on("touchmove", () => { d3.event.preventDefault(); })

        this._svg = d3.select(".nodesContainer")
            .append("svg")
            .attr('width', this._width)
            .attr('height', this._height);

        this.drawContainer();
    }

    initTestData(numberOfPoints: number): void {
        this._colors = this._colors || d3.scaleOrdinal(d3.schemeCategory10);
        let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

        let data = d3.range(numberOfPoints)
            .map((i) => {
                return new NodeModel({ x: Math.random() * this._width, y: Math.random() * this._height },
                    10,
                    alphabet[i]);
            });

        this._nodes = data;
    }

    drawContainer(): void {
        // draw nodes
        this._svg.selectAll("circle")
            .data(this._nodes, (x: NodeModel) => { return x.label })
            .enter().append("circle")
            .attr("transform", (d) => {
                return `translate(${d.center.x}, ${d.center.y})`;
            })
            .attr("r", (d) => { return d.size; })
            .style("fill", (d, i) => {
                return this._colors(i.toString());
            })
            .on("click", this.nodeOnClick);

        // draw connections
        // this._svg.selectAll("line")
        //     .data(this._nodeConnections, (x: any) => { return x; })
        //     .enter()
        //     .append("line")
        //     .attr("x1", (connection)=>connection.parentNode.center.x)
        //     .attr("y1", (connection)=>connection.parentNode.center.y)
        //     .attr("x2", (connection)=>connection.childNode.center.x)
        //     .attr("y2", (connection)=>connection.childNode.center.y);
    }

    nodeOnClick(d: NodeModel, i: any, el: any) {
        if (d3.event.defaultPrevented) return; // dragged

        // animation
        this._colors = this._colors || d3.scaleOrdinal(d3.schemeCategory10);
        d3.selectAll(el)
            .data([d], (x: any) => x.label)
            .transition()
            .style("fill", "black")
            .attr("r", (x: NodeModel) => 2 * x.size)
            .transition()
            .attr("r", (x: NodeModel) => x.size)
            .style("fill", (el1, i1) => {
                return this._colors(i.toString());
            });

        // add new Node to _selectedNode or add new NodeConnection
        this.addRemoveNode(d);

        this.drawContainer();
    }

    addRemoveNode(node: NodeModel): void {
        if (this._selectedNode == null) {
            this._selectedNode = node;
        }
        else {
            if (R.contains(new NodeConnection(this._selectedNode, node), this._nodeConnections)
                || R.contains(new NodeConnection(node, this._selectedNode), this._nodeConnections)) {
                this._nodeConnections = [...R.without([new NodeConnection(this._selectedNode, node)], this._nodeConnections)];
            }
            else {
                this._nodeConnections.push(new NodeConnection(this._selectedNode, node));
            }
        }
    }

}

