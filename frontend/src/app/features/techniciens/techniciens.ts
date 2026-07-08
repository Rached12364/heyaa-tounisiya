import { Component, OnInit, ChangeDetectorRef, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TechnicienPublicService, TechnicienPublic } from "../../core/services/technicien-public";
import { TechnicienProfileService } from "../../core/services/technicien-profile";
import { AuthService } from "../../core/services/auth";
import { TechnicienProfil } from "../technicien-profil/technicien-profil";

interface TechnicienCard {
  id: number;
  initiales: string;
  nomComplet: string;
  specialite: string;
  gouvernorat: string;
  experience: number;
  couleur: string;
}

@Component({
  selector: "app-techniciens",
  standalone: true,
  imports: [CommonModule, FormsModule, TechnicienProfil],
  templateUrl: "./techniciens.html",
  styleUrl: "./techniciens.scss"
})
export class TechniciensComponent implements OnInit {
  private authService = inject(AuthService);
  private profileService = inject(TechnicienProfileService);

  // Tab state
  activeTab: "liste" | "profil" = "liste";

  // Whether the current user is a connected technicien
  get isTechnicien(): boolean {
    const user = this.authService.currentUser();
    return !!user && user.role === "TECHNICIEN";
  }

  // List state
  searchTerm = "";
  selectedGouvernorat = "";
  selectedSpecialite = "";
  loading = true;
  errorMessage = "";

  gouvernorats = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul",
    "Zaghouan", "Bizerte", "Beja", "Jendouba", "Kef", "Siliana",
    "Sousse", "Monastir", "Mahdia", "Sfax", "Kairouan", "Kasserine",
    "Sidi Bouzid", "Gabes", "Medenine", "Tataouine", "Gafsa",
    "Tozeur", "Kebili"
  ];

  specialites = [
    "CCTV & Surveillance", "Reseaux Informatiques",
    "Electricite", "Detection Incendie", "Smart Home",
    "Fibre Optique", "Controle acces", "Photovoltaique"
  ];

  private couleurs = ["#1B3A5C", "#0D9488", "#C9A227", "#E70013"];
  techniciens: TechnicienCard[] = [];

  constructor(
    private technicienService: TechnicienPublicService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTechniciens();

    // If the user is a connected technicien, check if they already have a profile
    if (this.isTechnicien) {
      this.profileService.checkExists().subscribe({
        next: (exists) => {
          // If the technicien hasn't completed their profile yet, switch to the profile tab
          if (!exists) {
            this.activeTab = "profil";
            this.cdr.detectChanges();
          }
        },
        error: () => {
          // Silently ignore - stay on the list tab
        }
      });
    }
  }

  switchTab(tab: "liste" | "profil"): void {
    this.activeTab = tab;
  }

  private loadTechniciens(): void {
    this.technicienService.getAll().subscribe({
      next: (data: TechnicienPublic[]) => {
        try {
          if (!Array.isArray(data)) {
            throw new Error("API response is not an array. Received: " + typeof data);
          }
          this.techniciens = data.map((t, i) => this.toCard(t, i));
        } catch (err: any) {
          console.error("Error during mapping:", err);
          this.errorMessage = "Une erreur est survenue lors du traitement des données.";
        } finally {
          this.loading = false;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error("HTTP request error:", err);
        this.errorMessage = "Impossible de charger la liste des techniciens.";
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private toCard(t: TechnicienPublic, index: number): TechnicienCard {
    if (!t) throw new Error(`Technicien object at index ${index} is null or undefined`);
    const prenom = t.prenom || "";
    const nom = t.nom || "";
    const nomComplet = `${prenom} ${nom}`.trim();
    const initPrenom = prenom.charAt(0) || "";
    const initNom = nom.charAt(0) || "";
    const initiales = (initPrenom + initNom).toUpperCase();

    return {
      id: t.id,
      initiales: initiales || "?",
      nomComplet: nomComplet || "Technicien",
      specialite: t.specialite || t.metier || "Non spécifié",
      gouvernorat: t.gouvernorat || t.ville || "Non spécifié",
      experience: t.anneesExperience || 0,
      couleur: this.couleurs[index % this.couleurs.length]
    };
  }
}