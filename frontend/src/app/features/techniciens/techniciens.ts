import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TechnicienPublicService, TechnicienPublic } from "../../core/services/technicien-public";
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
  imports: [CommonModule, FormsModule],
  templateUrl: "./techniciens.html",
  styleUrl: "./techniciens.scss"
})
export class TechniciensComponent implements OnInit {
  searchTerm = "";
  selectedGouvernorat = "";
  selectedSpecialite = "";
  loading = true;
  errorMessage = "";
  gouvernorats = ["Tunis","Ariana","Ben Arous","Manouba","Nabeul",
    "Zaghouan","Bizerte","Beja","Jendouba","Kef","Siliana",
    "Sousse","Monastir","Mahdia","Sfax","Kairouan","Kasserine",
    "Sidi Bouzid","Gabes","Medenine","Tataouine","Gafsa",
    "Tozeur","Kebili"];
  specialites = ["CCTV & Surveillance","Reseaux Informatiques",
    "Electricite","Detection Incendie","Smart Home",
    "Fibre Optique","Controle acces","Photovoltaique"];
  private couleurs = ["#1B3A5C", "#0D9488", "#C9A227", "#E70013"];
  techniciens: TechnicienCard[] = [];
  constructor(private technicienService: TechnicienPublicService) {}
  ngOnInit(): void {
    this.technicienService.getAll().subscribe({
      next: (data: TechnicienPublic[]) => {
        this.techniciens = data.map((t, i) => this.toCard(t, i));
        this.loading = false;
      },
      error: () => {
        this.errorMessage = "Impossible de charger la liste des techniciens.";
        this.loading = false;
      }
    });
  }
  private toCard(t: TechnicienPublic, index: number): TechnicienCard {
    const nomComplet = `${t.prenom ?? ""} ${t.nom ?? ""}`.trim();
    const initiales = ((t.prenom?.[0] ?? "") + (t.nom?.[0] ?? "")).toUpperCase();
    return {
      id: t.id,
      initiales: initiales || "?",
      nomComplet: nomComplet || "Technicien",
      specialite: t.specialite ?? t.metier ?? "Non specifie",
      gouvernorat: t.gouvernorat ?? t.ville ?? "Non specifie",
      experience: t.anneesExperience ?? 0,
      couleur: this.couleurs[index % this.couleurs.length]
    };
  }
}