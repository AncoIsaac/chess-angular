import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../components/auth/auth.service';

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
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();      
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({ 
      next: (res) => {
        console.log('res', res.data.id)
        localStorage.setItem('user', res.data.id);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log('err', err);
        this.errorMessage = err.error?.error || 'Error al iniciar sesión';
      },
    });
  }
}
