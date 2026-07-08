import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

export interface TechnicienFicheRHRequest {
  nomParent?: string;
  gsmParent?: string;
  gsmBinome?: string;
  facebook?: string;
  tiktok?: string;
  instagram?: string;
  niveauScolaire?: string;
  permisConduireRh?: boolean;
  permisDateLivraison?: string;
  typeContrat?: string;
  numeroCnss?: string;
  numeroD17?: string;
  numeroBanquePoste?: string;
  dateEmbauche?: string;
  experienceSocietesPeriode?: string;
  salaireDepart?: number;
  nombreJoursConge?: number;
  gsmSociete?: string;
  groupeSanguin?: string;
  poidsKg?: number;
  hauteurCm?: number;
  pointureChaussure?: number;
  tailleVetements?: string;
  maladiesChroniques?: string;
  allergies?: string;
  operationsSubies?: string;
  enceinte?: boolean;
  tatouage?: boolean;
  observationsRh?: string;
}

export interface TechnicienFicheRHDocuments {
  extraitNaissanceDocument?: File | null;
  permisDocument?: File | null;
  signatureDocument?: File | null;
}

@Injectable({ providedIn: "root" })
export class TechnicienFicheRHService {
  private readonly apiUrl = `${environment.apiUrl}/admin/technicien-fiche-rh`;

  constructor(private http: HttpClient) {}

  getByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  saveOrUpdate(userId: number, data: TechnicienFicheRHRequest, documents: TechnicienFicheRHDocuments): Observable<any> {
    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));
    
    if (documents.extraitNaissanceDocument) {
      formData.append("extraitNaissanceDocument", documents.extraitNaissanceDocument);
    }
    if (documents.permisDocument) {
      formData.append("permisDocument", documents.permisDocument);
    }
    if (documents.signatureDocument) {
      formData.append("signatureDocument", documents.signatureDocument);
    }
    
    return this.http.put(`${this.apiUrl}/${userId}`, formData);
  }
}
