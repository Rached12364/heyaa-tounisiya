import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
export interface TechnicienPublic {
  id: number;
  nom: string;
  prenom: string;
  metier: string | null;
  specialite: string | null;
  ville: string | null;
  gouvernorat: string | null;
  anneesExperience: number | null;
}
@Injectable({ providedIn: "root" })
export class TechnicienPublicService {
  private readonly apiUrl = `${environment.apiUrl}/techniciens`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<TechnicienPublic[]> {
    return this.http.get<TechnicienPublic[]>(this.apiUrl);
  }
  count(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}