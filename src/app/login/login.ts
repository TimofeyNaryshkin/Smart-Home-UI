import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-service';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly router = inject(Router);
  private readonly apiService = inject(ApiService);
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    const { username: userName, password } = this.loginForm.value;
    if (userName && password) {
      this.apiService.login({ userName, password }).subscribe((response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
