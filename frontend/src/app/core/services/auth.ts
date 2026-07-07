import { Injectable, signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment";
export type UserRole = "TECHNICIEN" | "ENTREPRISE" | "ADMIN";
export interface UserResponse {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  lastLoginAt: string | null;
}
export interface AuthResponse {
  token: string;
  tokenType: string;
  user: UserResponse;
}
export interface RegisterPayload {
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}
export interface LoginPayload {
  email: string;
  password: string;
}
const TOKEN_KEY = "heyaa_token";
const USER_KEY = "heyaa_user";
@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private _currentUser = signal<UserResponse | null>(this.loadUserFromStorage());
  currentUser = this._currentUser.asReadonly();
  isLoggedIn = computed(() => this._currentUser() !== null);
  constructor(private http: HttpClient, private router: Router) {}
  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, payload).pipe(
      tap((res) => this.setSession(res))
    );
  }
  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, payload).pipe(
      tap((res) => this.setSession(res))
    );
  }
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._currentUser.set(null);
    this.router.navigate(["/"]);
  }
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
  private setSession(res: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    this._currentUser.set(res.user);
  }
  private loadUserFromStorage(): UserResponse | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserResponse;
    } catch {
      return null;
    }
  }
}