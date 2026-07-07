import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";
import { AuthService, UserRole } from "../../core/services/auth";
@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: "./register.html",
  styleUrl: "./register.scss"
})
export class Register {
  form: FormGroup;
  loading = signal(false);
  errorMessage = signal<string | null>(null);
  roles: { value: UserRole; label: string }[] = [
    { value: "TECHNICIEN", label: "Technicien" },
    { value: "ENTREPRISE", label: "Entreprise" }
  ];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nom: ["", [Validators.required]],
      prenom: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern(/^(\+216)?[2459][0-9]{7}$/)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required]],
      role: ["TECHNICIEN", [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }
  get f() {
    return this.form.controls;
  }
  private passwordsMatchValidator(group: FormGroup) {
    const password = group.get("password")?.value;
    const confirmPassword = group.get("confirmPassword")?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
  onSubmit(): void {
    this.errorMessage.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const { confirmPassword, ...payload } = this.form.value;
    this.authService.register(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(["/"]);
      },
      error: (err) => {
        this.loading.set(false);
        if (err.status === 409) {
          this.errorMessage.set(err.error?.error || "Un compte existe déjà avec ces informations.");
        } else if (err.status === 400 && err.error?.fields) {
          const firstError = Object.values(err.error.fields)[0];
          this.errorMessage.set(firstError as string);
        } else {
          this.errorMessage.set("Une erreur est survenue. Réessayez plus tard.");
        }
      }
    });
  }
}