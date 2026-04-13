import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private apollo: Apollo) { }

  private GET_EMPLOYEES = gql`
    query {
      employees {
        success
        message
        employees {
          id
          first_name
          last_name
          email
          designation
          department
          salary
          date_of_joining
          gender
          employee_photo
        }
      }
    }
  `;

  private GET_EMPLOYEE = gql`
    query EmployeeById($id: ID!) {
      employeeById(id: $id) {
        success
        message
        employee {
          id
          first_name
          last_name
          email
          designation
          department
          salary
          date_of_joining
          gender
          employee_photo
        }
      }
    }
  `;

  private ADD_EMPLOYEE = gql`
    mutation AddEmployee($input: EmployeeInput!) {
      addEmployee(input: $input) {
        success
        message
        employee {
          id
        }
      }
    }
  `;

  private UPDATE_EMPLOYEE = gql`
    mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
      updateEmployee(id: $id, input: $input) {
        success
        message
        employee {
          id
        }
      }
    }
  `;

  private DELETE_EMPLOYEE = gql`
    mutation DeleteEmployee($id: ID!) {
      deleteEmployee(id: $id) {
        success
        message
      }
    }
  `;

  getEmployees() {
    return this.apollo.watchQuery({
      query: this.GET_EMPLOYEES
    }).valueChanges;
  }

  get(id: string) {
    return this.apollo.watchQuery({
      query: this.GET_EMPLOYEE,
      variables: { id }
    }).valueChanges;
  }

  addEmployee(input: any) {
    return this.apollo.mutate({
      mutation: this.ADD_EMPLOYEE,
      variables: { input }
    });
  }

  updateEmployee(id: string, input: any) {
    return this.apollo.mutate({
      mutation: this.UPDATE_EMPLOYEE,
      variables: { id, input }
    });
  }

  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: this.DELETE_EMPLOYEE,
      variables: { id }
    });
  }
}
