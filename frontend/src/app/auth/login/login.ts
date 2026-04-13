import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../auth';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ]
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  error = '';

  form = this.fb.group({
    usernameOrEmail: ['', Validators.required],
    password: ['', Validators.required]
  });


  submit() {
    console.log("ROUTER:", this.router);

    if (this.form.invalid) return;

    const { usernameOrEmail, password } = this.form.value;

    this.auth.login(usernameOrEmail!, password!).subscribe({
      next: (res: any) => {
        console.log("LOGIN RESPONSE RAW:", res);

        const loginResult = res?.data?.login;

        if (loginResult?.success) {
          localStorage.setItem('auth_token', 'loggedin');
          this.router.navigate(['/employees']);
        } else {
          this.error = loginResult?.message || 'Login failed';
        }
      },
      error: (err) => {
        console.error("LOGIN ERROR", err);
        this.error = err.message || 'Login failed';
      }
    });
  }
}
