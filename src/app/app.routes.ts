import { Routes } from '@angular/router';
import { Dashboard } from './layout/dashboard/dashboard';
import { ProductoPresentacion } from './layout/producto-presentacion/producto-presentacion';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: 'producto',
        component: ProductoPresentacion
    }



    // {
    //     path: '',
    //     component: LayoutPrincipal,
    //     children: [

    //         // Redireccionamiento
    //         {
    //             path: '',
    //             redirectTo: 'dashboard',
    //             pathMatch: 'full'
    //         },
    //         {
    //             path: 'dasboard',
    //             component: Dashboard
    //         },
    //         {
    //            path: 'producto',
    //            component: ProductoPresentacion 
    //         }
    //     ]
    // },
    // {
    //     path: '**',
    //     redirectTo: 'dashboard'
    // }
];