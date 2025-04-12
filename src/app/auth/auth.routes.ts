import { Routes } from '@angular/router';
import { LoginComponent } from '@auth/pages/login/login.component';
import { RegisterComponent } from '@auth/pages/register/register.component';
import { LayoutComponent } from '@auth/layout/layout.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];
export default authRoutes;
