import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './shared/components/main/main.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ESKDClassElementComponent } from './eskdclass-element/eskdclass-element.component';
import { MyfilterPipe } from './shared/pipes/myfilter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewerModule } from 'ng2-adsk-forge-viewer';
import { HttpClientModule }   from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FooterComponent } from './shared/components/footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    ESKDClassElementComponent,
    MyfilterPipe,
    FooterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ViewerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
