import { Component, AfterViewInit } from '@angular/core';
import * as d3 from 'd3'
import * as R from 'ramda'
import { ScaleLinear, ScaleTime } from 'd3'

@Component({
    selector: 'simple-render-data.component',
    templateUrl: 'simple-render-data.component.html'
})
export class SimpleRenderData implements AfterViewInit {

    private linearScale: d3.ScaleLinear<number, number>;
    private timeScale: ScaleTime<number, number>;
    private extent: any;

    constructor() {

    }

    ngAfterViewInit(): void {
        //this.testSelectDomEl();

        this.testVisualizeData();
        this.testSVGCircles();
        this.testPolygon();
    }

    testLinearScale(): void {
        this.linearScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, 600]);

        console.log(this.linearScale(0));
        console.log(this.linearScale(50));
        console.log(this.linearScale(100));
    }

    testTimeScale(): void {
        this.timeScale = d3.scaleTime()
            .domain([new Date(2016, 0, 1), new Date()])
            .range([0, 100])

        console.log(this.timeScale(new Date(2016, 3, 15)));
        console.log(this.timeScale.domain());
    }

    // testExtend(): void {
    //     d3.json('app/components/d3-examples/data/data.json', (data) => {
    //         this.extent = d3.extent(data, (d: any) => {
    //             return d.age;
    //         });

    //         console.log(this.extent)

    //         let scale = d3.scaleLinear()
    //             .domain(this.extent)
    //             .range([0, 600]);
    //         console.log(scale(37));
    //     });

    // }

    testSelectDomEl(): void {
        let svg = d3.select("div.chart");
        svg.append('span')
            .html('testt');
    }

    testVisualizeData(): void {
        let scores: Array<any> =
            [
                { name: 'Alice', score: 23 },
                { name: 'David', score: 100 },
                { name: 'Emily', score: 83 },
            ];

        let data1: Array<any> =
            [
                { name: 'Alice', score: 23 },
                { name: 'Davidd', score: 100 }
            ];
            
        let update0 = d3.select('div.chart').selectAll('div')
            .data(scores, (x: any) => { console.log(x); return x ? x.name : null }).enter().append('div')
            .text((d: any) => {
                return d.name;
            })
            .style('color', 'red');

        update0 = d3.select('div.chart').selectAll('div')
        .data(data1).append('div')
            .text((d: any) => {
                return d.name;
            })
            .style('color', 'blue');
        // let update = d3.select('div.chart').selectAll('div')
        //     .data(scores, (x: any) => { console.log(x); return x ? x.name : null });

        // console.log(update);

        // let enter = update.enter()
        //     .append('div')
        //     .text((d: any) => {
        //         return d.name;
        //     })
        //     .style('color', 'red');

        // //update.exit().remove();

        // update.merge(update.exit())
        //     .style('height', '50px')
        //     .append('span')
        //     .text('asd');
        // update.exit()
        //     .append('span')
        //     .text('gggasdsa');
    }

    testSVGCircles(): void {
        d3.json('app/components/d3-examples/data/dataPoints.json', (data: [{ x: any, y: any, k: any }]) => {

            let svg = d3.select('svg');
            svg.selectAll("circle")
                .data(data, (x: any) => { console.log(x.k); return x.k; })
                .enter().append("circle")
                .attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; })
                .attr("r", 2.5);

            data.push({ "x": 5, "y": 60, "k": "asdf" });

            let data1 = [{ "x": 15, "y": 60, "k": "asdfffff" }];
            let svg1 = d3.select('svg');
            let newSvgData = svg1.selectAll("circle")
                .data(data1, (x: any) => { console.log(x.k); return x.k; });

            svg.selectAll("circle")
                .attr("r", 10);

            newSvgData.exit().remove();

            newSvgData.enter().append("circle")
                .attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; })
                .attr("r", 5);

            svg.selectAll("circle")
                .data(data, (x: any) => { console.log(x.k); return x.k; })
                .enter().append("circle")
                .attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; })
                .attr("r", 2.5);
        });
    }

    testPolygon(): void {
        let points = [
            { x: 220, y: 10 },
            { x: 300, y: 210 },
            { x: 170, y: 250 },
            { x: 123, y: 234 }
        ];

        let firstPoint: any = points.splice(0, 1)[0];
        let strPoints = R.reduce((str, el: any) => str + ' ' + el.x + ',' + el.y,
            firstPoint.x + ',' + firstPoint.y,
            points
        )

        let polygon = d3.select("svg").selectAll("polygon").data([strPoints]);

        polygon.enter()
            .append('polygon')
            .attr("points", function (d: string) { return <string>d; })
            .attr("style", "fill:lime;stroke:purple;stroke-width:1");
    }
}
