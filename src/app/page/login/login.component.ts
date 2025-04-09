import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../components/auth/auth.service';
import { Router } from '@angular/router';
import { ErrorI } from '../../interface/login/errorResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorMessage: string = '';
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return 
    } 

    const { email, password } = this.loginForm.value;

    this.authService.login({email, password}).subscribe({
      next: (res) => {
        console.log(res);
        // this.router.navigate(['/home']);
      },
      error: (err: ErrorI) => {
        console.log('err', err)
        this.errorMessage = err.message;
      }
    })
  }
}
