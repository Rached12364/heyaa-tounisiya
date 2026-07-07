import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";
import { AuthService } from "../../core/services/auth";
@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: "./login.html",
  styleUrl: "./login.scss"
})
export class Login {
  form: FormGroup;
  loading = signal(false);
  errorMessage = signal<string | null>(null);
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }
  get f() {
    return this.form.controls;
  }
  onSubmit(): void {
    this.errorMessage.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(["/"]);
      },
      error: (err) => {
        this.loading.set(false);
        if (err.status === 401) {
          this.errorMessage.set("Email ou mot de passe incorrect.");
        } else {
          this.errorMessage.set("Une erreur est survenue. Réessayez plus tard.");
        }
      }
    });
  }
}