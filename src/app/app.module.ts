import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { D3SimpleDynamicRendering } from './components/d3-examples/D3SimpleDynamicRendering'
import { SimpleRenderData } from './components/d3-examples/simple-render-data.component'
import { D3ConnectNodes } from './components/d3-nodes/d3-connect-nodes.component'
import { appRouting } from './app.routes'

@NgModule({
    declarations: [
        AppComponent,
        D3SimpleDynamicRendering,
        SimpleRenderData,
        D3ConnectNodes
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        appRouting
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
