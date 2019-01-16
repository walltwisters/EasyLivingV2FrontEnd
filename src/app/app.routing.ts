import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './_components/home';
import { LoginComponent } from './_components/login';
import { RegisterComponent } from './_components/register';
import { AuthGuard } from './_guards';
import { ProductComponent, ProductListComponent } from './_components/product';
import { UserComponent } from './_components/user';

const appRoutes: Routes = [
    { 
        path: '', 
        component: HomeComponent, 
        canActivate: [AuthGuard], 
        children: [
            { path: 'user', component: UserComponent } ,
            { path: 'user/new', component: RegisterComponent },
            { path: 'product', component: ProductListComponent },
            { path: 'product/new', component: ProductComponent}
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);