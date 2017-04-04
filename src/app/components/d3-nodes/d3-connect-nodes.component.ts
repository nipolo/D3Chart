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

    shuffleCoordinates() {
        for (let nodeModel of this._nodes) {
            nodeModel.center.x = Math.random() * this._width;
            nodeModel.center.y = Math.random() * this._height;
        }

        this.drawContainer();
    }


    drawContainer(): void {
        let svgWithCircles = this._svg.selectAll("circle")
            .data(this._nodes, (x: NodeModel) => { return x.label });

        let lines = this._svg.selectAll("line")
            .data(this._nodeConnections, (x: any) => {
                // console.log(x);
                return x.key;
            });
        this.updateSVG(svgWithCircles, lines);

        this.enterSVG(svgWithCircles, lines);
    }

    updateSVG(svgWithCircles: d3.Selection<any, any, any, any>,
        lines: d3.Selection<any, any, any, any>) {
        // update circles
        svgWithCircles
            .attr("transform", (d) => {
                return `translate(${d.center.x}, ${d.center.y})`;
            })
            .attr("r", (d) => { return d.size; })
            .style("fill", (d, i) => {
                return this._colors(i.toString());
            })
            .on("click", (x, y, z) => this.nodeOnClick(x, y, z));
        // update text
        this._svg.selectAll("text")
            .data(this._nodes, (x: NodeModel) => { return x.label })
            .attr("transform", (d) => {
                return `translate(${d.center.x + d.size}, ${d.center.y})`;
            })

        // draw connections
        lines
            .attr("x1", (connection: NodeConnection) => {
                return this.getNodeMode(connection.parentNodeKey).center.x;
            })
            .attr("y1", (connection) => {
                return this.getNodeMode(connection.parentNodeKey).center.y;
            })
            .attr("x2", (connection) => this.getNodeMode(connection.childNodeKey).center.x)
            .attr("y2", (connection) => this.getNodeMode(connection.childNodeKey).center.y)
            .style("stroke-width", "2")
            .style("stroke", "red");

        lines.exit().remove();
    }

    enterSVG(svgWithCircles: d3.Selection<any, any, any, any>,
        lines: d3.Selection<any, any, any, any>) {
        // draw nodes (circles)
        svgWithCircles.enter().append("circle")
            .attr("transform", (d) => {
                return `translate(${d.center.x}, ${d.center.y})`;
            })
            .attr("r", (d) => { return d.size; })
            .style("fill", (d, i) => {
                return this._colors(i.toString());
            })
            .on("click", (x, y, z) => this.nodeOnClick(x, y, z));

        // draw text labels
        svgWithCircles.enter().append("text")
            .attr("transform", (d) => {
                return `translate(${d.center.x + d.size}, ${d.center.y})`;
            })
            .text((d) => d.label);

        // draw connections
        lines.enter()
            .append("line")
            .attr("x1", (connection: NodeConnection) => {
                return this.getNodeMode(connection.parentNodeKey).center.x;
            })
            .attr("y1", (connection) => {
                return this.getNodeMode(connection.parentNodeKey).center.y;
            })
            .attr("x2", (connection) => this.getNodeMode(connection.childNodeKey).center.x)
            .attr("y2", (connection) => this.getNodeMode(connection.childNodeKey).center.y)
            .style("stroke-width", "2")
            .style("stroke", "red");

        lines.exit().remove();
    }
    getNodeMode(key: string): NodeModel {
        let res = R.find((x) => x.label == key, this._nodes);
        return res;
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
        if (this._selectedNode == node) {
            return;
        }

        if (this._selectedNode == null) {
            this._selectedNode = node;
        }
        else {
            if (R.contains(new NodeConnection(this._selectedNode.label, node.label), this._nodeConnections)
                || R.contains(new NodeConnection(node.label, this._selectedNode.label), this._nodeConnections)) {
                this._nodeConnections = [...R.without([new NodeConnection(this._selectedNode.label, node.label), new NodeConnection(node.label, this._selectedNode.label)], this._nodeConnections)];
            }
            else {
                this._nodeConnections.push(new NodeConnection(this._selectedNode.label, node.label));
            }
            this._selectedNode = null;
        }

        for (let connection of this._nodeConnections) {
            console.log("parent node: " + this.getNodeMode(connection.parentNodeKey).label + ", child node: " + this.getNodeMode(connection.childNodeKey).label);
        }
    }

}

