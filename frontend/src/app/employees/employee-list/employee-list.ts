import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.scss']
})
export class EmployeeList implements OnInit {
  private employeeService = inject(EmployeeService);
  private router = inject(Router);

  employees: any[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe((res: any) => {
      const result = res?.data?.employees;

      if (result?.success) {
        this.employees = result.employees || [];
      } else {
        this.error = result?.message || 'Failed to load employees';
      }

      this.loading = false;
    });
  }

  viewEmployee(id: string) {
    this.router.navigate(['/employees', id]);
  }

  editEmployee(id: string) {
    this.router.navigate(['/employees', id, 'edit']);
  }

  addEmployee() {
    this.router.navigate(['/employees/new']);
  }
}
