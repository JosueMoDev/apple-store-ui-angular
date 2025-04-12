import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';

export const uiRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'product/:id',
        component: ProductComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
];

export default uiRoutes;
