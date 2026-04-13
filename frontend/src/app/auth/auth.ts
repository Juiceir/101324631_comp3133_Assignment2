import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Auth {
  private tokenKey = 'auth_token';

  constructor(private apollo: Apollo) { }

  private LOGIN_MUTATION = gql`
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        success
        message
        user {
          id
          username
          email
        }
      }
    }
  `;

  private SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      success
      message
      user {
        id
        username
        email
      }
    }
  }
`;

  login(usernameOrEmail: string, password: string) {
    return this.apollo.mutate<any>({
      mutation: this.LOGIN_MUTATION,
      variables: {
        input: {
          usernameOrEmail,
          password
        }
      }
    });
  }

  signup(username: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: this.SIGNUP_MUTATION,
      variables: {
        input: {
          username,
          email,
          password
        }
      }
    });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  get token() {
    return localStorage.getItem(this.tokenKey);
  }

  get isAuthenticated() {
    return !!this.token;
  }
}
