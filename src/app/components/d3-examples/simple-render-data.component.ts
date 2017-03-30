import { Component, AfterViewInit } from '@angular/core';
import * as d3 from 'd3'
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
        this.testSelectDomEl();
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

    testExtend(): void {
        d3.json('app/components/d3-examples/data/data.json', (data) => {
            this.extent = d3.extent(data, (d: any) => {
                return d.age;
            });

            console.log(this.extent)

            let scale = d3.scaleLinear()
                .domain(this.extent)
                .range([0, 600]);
            console.log(scale(37));
        });

    }

    testSelectDomEl(): void {
        let svg = d3.select("svg");
        svg.append('span')
            .html('test');
    }
}