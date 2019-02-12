import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_components/home';
import { LoginComponent } from './_components/login';
import { AuthGuard } from './_guards';
import { ProductComponent, ProductListComponent } from './_components/product';
import { UserComponent, RegisterComponent } from './_components/user';
import { StoreComponent } from './_components/store';

const appRoutes: Routes = [
    { 
        path: '', 
        component: HomeComponent, 
        canActivate: [AuthGuard], 
        children: [
            { path: 'user', component: UserComponent } ,
            { path: 'user/new', component: RegisterComponent },
            { path: 'product', component: ProductListComponent },
            { path: 'product/new', component: ProductComponent},
            { path: 'product/:id', component: ProductComponent},
            { path: 'store', component: StoreComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);