import { Component, AfterViewInit } from '@angular/core';
import * as d3 from 'd3'
import * as R from 'ramda'
import { ScaleLinear, ScaleTime } from 'd3'

@Component({
    selector: 'simple-render-data.component',
    templateUrl: 'simple-render-data.component.html',
    styleUrls: ['styles/simple-render-data.component.component.css']
})
export class SimpleRenderData implements AfterViewInit {

    private linearScale: d3.ScaleLinear<number, number>;
    private timeScale: ScaleTime<number, number>;
    private extent: any;

    constructor() {

    }

    ngAfterViewInit(): void {
        //this.testSelectDomEl();

        this.testTransitions();
    }
    //#region d3 functions
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

    responsivefy(svg: d3.Selection<any, any, any, any>): void {
        let container = d3.select(svg.node().parentNode);
        let width = parseInt(svg.style('width'));
        let height = parseInt(svg.style('height'));
        let aspect = width / height;

        let resize = () => {
            let targetWidth = width;
            svg.attr("width", targetWidth);
            svg.attr("height", Math.round(targetWidth / aspect));
        };

        svg.attr("viewBox", `0 0 ${width*1.5} ${height*1.5}`)
            .attr("preserveAspectRatio", "xMinYMid")
            .call(resize);

        d3.select(window).on("resize." + container.attr("id"), resize);
    }

    testPlot(): void {
        let margin = { top: 10, right: 20, bottom: 30, left: 30 };
        let width = 400 - margin.left - margin.right;
        let height = 565 - margin.top - margin.bottom;

        let svg = d3.select('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', width + margin.top + margin.bottom)
            .call(this.responsivefy)
            .append('g')
            .attr('transform', `translate (${margin.left}, ${margin.top})`);

        d3.json('app/components/d3-examples/data/dataCountry.json', (data: [{ country: any, population: any, expectancy: any, cost: any, code: any }]) => {
            let yScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.expectancy))
                .range([height, 0])
                .nice();
            let yAxis = d3.axisLeft(yScale);
            svg.call(yAxis);

            let xScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.cost))
                .range([0, width]);
            let xAxis = d3.axisBottom(xScale).ticks(5);
            svg
                .append('g')
                    .attr('transform',  `translate(0, ${height})`)
                .call(xAxis);

            let rScale = d3.scaleSqrt()
                .domain([0, d3.max(data, d => d.population)])
                .range([0, 40]);
            svg.selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d.cost))
                .attr('cy', d => xScale(d.expectancy))
                .attr('r', d => rScale(d.population))
                .style('fill', 'steelblue');
        });



    }

    testTransitions() : void {
        d3.select("#block")
            .transition()
            .duration(500)
            .style('width', "400px")
            .style('height', "600px")
    }
    //#endregion
}
