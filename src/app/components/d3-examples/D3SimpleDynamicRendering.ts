import { Component } from '@angular/core';
import * as d3 from 'd3'

@Component({
    selector: 'd3-simple-dynamic-rendering',
    templateUrl: 'd3-simple-dynamic-rendering.component.html'
})
export class D3SimpleDynamicRendering {
    private _group: d3.Selection<any, any, any, any>;
}

 