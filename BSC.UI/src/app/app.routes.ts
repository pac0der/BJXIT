import { Routes } from '@angular/router';
import { authGuard, redirectIfLoggedIn } from './services/auth.guard';
import { UserRole } from './models/user-role.enum';

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [redirectIfLoggedIn],
        loadComponent: () =>
            import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'user',
        canActivate: [authGuard],
        data: { role: [UserRole.Admin] },
        loadComponent: () =>
            import('./user/user.component').then(m => m.UserComponent)
    },
    {
        path: 'product',
        canActivate: [authGuard],
        data: { role: [UserRole.Admin, UserRole.Staff] },
        loadComponent: () =>
            import('./product/product.component').then(m => m.ProductComponent)
    },
    {
        path: 'order',
        canActivate: [authGuard],
        data: { role: [UserRole.Admin, UserRole.Seller] },
        loadComponent: () =>
            import('./order/order.component').then(m => m.OrderComponent)
    },
    {
        path: '**',
        redirectTo: 'login'
    },
];
