import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

const Login = gql`
  query Login($loginInput: LoginInput!) {
    Login(loginInput: $loginInput) {
      user {
        id
        lastName
        firstName
        email
        emailVerified
        role
        isActive
        picture
      }
    }
  }
`;
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzCardModule,
    NzCheckboxModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private querySubscription!: Subscription;
  private fb = inject(NonNullableFormBuilder);
  private readonly apollo = inject(Apollo);

  validateForm = this.fb.group({
    email: this.fb.control('jonasjosuemorales@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: this.fb.control('abcdefgH12', [Validators.required]),
    remember: this.fb.control(true),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      const form = this.validateForm.value;
      this.querySubscription = this.apollo
        .watchQuery({
          query: Login,
          variables: {
            loginInput: {
              email: form.email,
              password: form.password,
            },
          },
        })
        .valueChanges.subscribe(({ data }: any) => {
          console.log(data.Login.user);
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
