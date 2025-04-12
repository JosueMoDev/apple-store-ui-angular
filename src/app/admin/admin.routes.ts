import { Routes } from '@angular/router';
import { ProductComponent } from '@admin/pages/product/product.component';
import { ProductsComponent } from '@admin/pages/products/products.component';
import { LayoutComponent } from '@admin/layout/layout.component';

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
