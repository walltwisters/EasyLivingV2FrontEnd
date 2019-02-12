import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService, ProductService, CategoryService, StoreService } from './_services';
import { MenuComponent } from './_components/menu';
import { HomeComponent } from './_components/home';
import { LoginComponent } from './_components/login';
import { ProductComponent, ProductListComponent } from './_components/product';
import { UserComponent, RegisterComponent } from './_components/user';
import {StoreComponent } from './_components/store';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ProductComponent,
        MenuComponent,
        UserComponent,
        ProductListComponent,
        StoreComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        ProductService,
        CategoryService,
        StoreService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
