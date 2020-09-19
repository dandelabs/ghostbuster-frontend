import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: 'orders',
        loadChildren: './order/order.module#OrderModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        loadChildren: './users/users.module#UsersModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'account',
        loadChildren: './account/account.module#AccountModule',
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'orders/list/incoming',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
