import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './shared/components/main/main.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ESKDClassElementComponent } from './shared/components/main/eskdclass-element/eskdclass-element.component';
import { MyfilterPipe } from './shared/pipes/myfilter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewerModule } from 'ng2-adsk-forge-viewer';
import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoginComponent } from './shared/components/login/login.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { HTTPInterceptor } from './shared/http-interceptors/http-interceptor';
import { RegisterComponent } from './shared/components/register/register.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileMainComponent } from './shared/components/profile/profile-main/profile-main.component';
import { AddClassComponent } from './shared/components/profile/add-class/add-class.component';
import { TreeviewComponent } from './shared/components/main/treeview/treeview.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon'




@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    ESKDClassElementComponent,
    MyfilterPipe,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    AlertComponent,
    ProfileMainComponent,
    AddClassComponent,
    TreeviewComponent
    
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
    MatPaginatorModule,
    MatTabsModule,
    FontAwesomeModule ,
    MatTreeModule,
    MatIconModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
