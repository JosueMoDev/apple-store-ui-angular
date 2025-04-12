import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apollo = inject(Apollo);
  // TODO: Should type forms data and return of methods

  createUser(form: any) {
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
    return this.apollo
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
      );
  }

  login(form: any) {
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
    return this.apollo.query({
      query: Login,
      variables: {
        loginInput: form,
      },
    });
  }

  logout() {}

  tokenValidation() {}
}
