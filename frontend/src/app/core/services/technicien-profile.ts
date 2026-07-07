import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment";
export interface TechnicienProfileData {
  // Informations personnelles
  cin: string;
  dateNaissance: string;
  sexe: string;
  adresse: string;
  ville: string;
  gouvernorat: string;
  telephoneSecondaire: string;
  // Informations professionnelles
  matricule: string;
  metier: string;
  specialite: string;
  niveauEtudes: string;
  diplome: string;
  etablissement: string;
  anneeObtention: number | null;
  anneesExperience: number | null;
  entrepriseActuelle: string;
  statutProfessionnel: string;
  // Compétences
  competenceCctv: boolean;
  competenceControleAcces: boolean;
  competenceReseaux: boolean;
  competenceFibreOptique: boolean;
  competenceElectricite: boolean;
  competenceDomotique: boolean;
  competenceMaintenanceInformatique: boolean;
  competenceAlarmesIntrusion: boolean;
  competenceDetectionIncendie: boolean;
  autresCompetences: string;
  // Sécurité électronique / CCTV
  travailleSecuriteElectronique: boolean;
  experienceCamerasIp: boolean;
  experienceNvrDvr: boolean;
  marquesMaitrisees: string;
  configurationReseau: boolean;
  pointageBiometrique: boolean;
  interphonieIp: boolean;
  soudureFibreOptique: boolean;
  certifications: string;
  // Permis et mobilité
  permisConduire: boolean;
  categoriePermis: string;
  vehiculePersonnel: boolean;
  disponibleDeplacement: boolean;
  zonesIntervention: string;
  // Disponibilité
  disponibleImmediatement: boolean;
  typeDisponibilite: string;
  salaireSouhaite: number | null;
  // Bancaire
  banque: string;
  rib: string;
  // Observations
  commentaires: string;
}
export interface TechnicienDocuments {
  cinDocument?: File | null;
  cvDocument?: File | null;
  diplomeDocument?: File | null;
  attestationTravail?: File | null;
  photoIdentite?: File | null;
  casierJudiciaire?: File | null;
}
@Injectable({ providedIn: "root" })
export class TechnicienProfileService {
  private readonly apiUrl = `${environment.apiUrl}/technicien/profil`;
  hasProfile = signal(false);
  constructor(private http: HttpClient) {}
  checkExists(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/me/exists`).pipe(
      tap((exists) => this.hasProfile.set(exists))
    );
  }
  getMyProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }
  saveProfile(data: TechnicienProfileData, documents: TechnicienDocuments): Observable<any> {
    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));
    if (documents.cinDocument) formData.append("cinDocument", documents.cinDocument);
    if (documents.cvDocument) formData.append("cvDocument", documents.cvDocument);
    if (documents.diplomeDocument) formData.append("diplomeDocument", documents.diplomeDocument);
    if (documents.attestationTravail) formData.append("attestationTravail", documents.attestationTravail);
    if (documents.photoIdentite) formData.append("photoIdentite", documents.photoIdentite);
    if (documents.casierJudiciaire) formData.append("casierJudiciaire", documents.casierJudiciaire);
    return this.http.post(this.apiUrl, formData).pipe(
      tap(() => this.hasProfile.set(true))
    );
  }
  getDocumentUrl(type: "CIN" | "CV" | "DIPLOME" | "ATTESTATION" | "PHOTO" | "CASIER"): string {
    return `${this.apiUrl}/me/documents/${type}`;
  }
}