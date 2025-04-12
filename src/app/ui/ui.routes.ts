import { Routes } from '@angular/router';
import { LayoutComponent } from '@ui/layout/layout.component';
import { ProductComponent } from '@ui/pages/product/product.component';
import { ProductsComponent } from '@ui/pages/products/products.component';

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
  {
    path: '**',
    redirectTo: '',
  },
];

export default uiRoutes;
