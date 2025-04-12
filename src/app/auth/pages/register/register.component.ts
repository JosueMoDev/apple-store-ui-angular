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
import { catchError, of, Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

const REGISTER_USER = gql`
  mutation RegisterUser($registerUserInput: CreateUserInput!) {
    registerUser(registerUserInput: $registerUserInput) {
      role
      lastName
      picture
      isActive
      firstName
      email
      id
      emailVerified
    }
  }
`;

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzCardModule,
    NzCheckboxModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private querySubscription!: Subscription;
  private fb = inject(NonNullableFormBuilder);
  private readonly apollo = inject(Apollo);

  registerForm = this.fb.group({
    firstName: this.fb.control('', [Validators.required]),
    lastName: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  });

  submitForm(): void {
    if (this.registerForm.valid) {
      const form = this.registerForm.value;
      this.querySubscription = this.apollo
        .mutate({
          mutation: REGISTER_USER,
          variables: {
            registerUserInput: form,
          },
        })
        .pipe(
          catchError((error) => {
            console.error('Error en la mutación:', error);
            return of({ data: null });
          })
        )
        .subscribe(({ data }) => {
          if (data) {
            console.log('Usuario registrado:', data);
          } else {
            console.log('No se pudo registrar el usuario');
          }
        });
    } else {
      Object.values(this.registerForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnDestroy() {
    this.querySubscription?.unsubscribe();
  }
}
