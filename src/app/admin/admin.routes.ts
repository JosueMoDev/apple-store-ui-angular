import { Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { LayoutComponent } from './layout/layout.component';

export const adminRoutes: Routes = [
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

export default adminRoutes;
