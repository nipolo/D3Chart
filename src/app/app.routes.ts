import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { D3SimpleDynamicRendering } from './components/d3-examples/D3SimpleDynamicRendering'
import { SimpleRenderData } from './components/d3-examples/simple-render-data.component'
import { D3ConnectNodes } from './components/d3-nodes/d3-connect-nodes.component'

const appRoutes: Routes = [
    { path: 'd3-simple-dynamic-rendering', component: D3SimpleDynamicRendering },
    { path: 'simple-render-data', component: SimpleRenderData },
    { path: 'd3-connect-nodes', component: D3ConnectNodes }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);