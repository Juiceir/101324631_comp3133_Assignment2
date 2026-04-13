import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './employee-detail.html',
  styleUrls: ['./employee-detail.scss']
})
export class EmployeeDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);

  employee: any;
  error = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.employeeService.get(id).subscribe((res: any) => {
        const result = res?.data?.employeeById;

        if (result?.success) {
          this.employee = result.employee;
        } else {
          this.error = result?.message || 'Failed to load employee';
        }
      });
    }
  }

  edit() {
    this.router.navigate(['/employees', this.employee.id, 'edit']);
  }
}
