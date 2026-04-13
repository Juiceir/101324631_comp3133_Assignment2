import { Routes } from '@angular/router';

import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';

import { EmployeeList } from './employees/employee-list/employee-list';
import { EmployeeDetail } from './employees/employee-detail/employee-detail';
import { EmployeeForm } from './employees/employee-form/employee-form';

import { AuthGuard } from './auth/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  { path: 'employees', component: EmployeeList, canActivate: [AuthGuard] },
  { path: 'employees/new', component: EmployeeForm, canActivate: [AuthGuard] },
  { path: 'employees/:id', component: EmployeeDetail, canActivate: [AuthGuard] },
  { path: 'employees/:id/edit', component: EmployeeForm, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
