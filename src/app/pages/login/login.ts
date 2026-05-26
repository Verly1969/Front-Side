import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    // Initialisation du formulaire avec validation
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(8)]
      ]
    });
  }

  // Vérifier si un champ est invalid et touché
  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control?.invalid && control?.touched);
  }

  // Afficher / cacher le mot de passe
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Soumission du formulaire
  onSubmit(): void {
    if(this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    // simulation d'une connexion
    setTimeout(() => {
      this.isLoading = false;

      if(email === 'admin@test.com' && password === 'password123')
      {
        this.router.navigate(['/dashboard']);
      }
      else
      {
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    }, 1000);
  }

}
