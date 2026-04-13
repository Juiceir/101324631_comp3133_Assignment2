import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class EmployeeForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);

  isEdit = false;
  employeeId: string | null = null;
  error = '';

  form = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    gender: [''],
    designation: ['', Validators.required],
    department: ['', Validators.required],
    salary: ['', Validators.required],
    date_of_joining: ['', Validators.required],
    employee_photo: ['']
  });

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.employeeId;

    if (this.isEdit) {
      this.employeeService.get(this.employeeId!).subscribe((res: any) => {
        const result = res?.data?.employeeById;
        if (result?.success) {
          this.form.patchValue(result.employee);
        }
      });
    }
  }

  submit() {
    if (this.form.invalid) return;

    const input = this.form.value;

    if (this.isEdit) {
      this.employeeService.updateEmployee(this.employeeId!, input).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    } else {
      this.employeeService.addEmployee(input).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}
