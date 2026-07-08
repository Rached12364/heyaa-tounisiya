import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TechnicienFicheRHService, TechnicienFicheRHDocuments } from "../../../core/services/technicien-fiche-rh";

@Component({
  selector: "app-technicien-fiche-rh-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./technicien-fiche-rh-form.component.html",
  styleUrl: "./technicien-fiche-rh-form.component.scss"
})
export class TechnicienFicheRhFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private ficheService = inject(TechnicienFicheRHService);
  private route = inject(ActivatedRoute);

  userId!: number;
  ficheForm!: FormGroup;
  loading = false;
  saving = false;
  successMessage = "";
  errorMessage = "";

  documents: TechnicienFicheRHDocuments = {
    extraitNaissanceDocument: null,
    permisDocument: null,
    signatureDocument: null
  };

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get("userId"));
    this.initForm();
    if (this.userId) {
      this.loadFiche();
    }
  }

  initForm() {
    this.ficheForm = this.fb.group({
      // Contacts famille
      nomParent: [""],
      gsmParent: [""],
      gsmBinome: [""],
      // Reseaux sociaux
      facebook: [""],
      tiktok: [""],
      instagram: [""],
      // Scolarite / permis
      niveauScolaire: [""],
      permisConduireRh: [false],
      permisDateLivraison: [""],
      // Contrat / administratif
      typeContrat: [""],
      numeroCnss: [""],
      numeroD17: [""],
      numeroBanquePoste: [""],
      dateEmbauche: [""],
      experienceSocietesPeriode: [""],
      salaireDepart: [null],
      nombreJoursConge: [null],
      gsmSociete: [""],
      // Donnees medicales / physiques
      groupeSanguin: [""],
      poidsKg: [null],
      hauteurCm: [null],
      pointureChaussure: [null],
      tailleVetements: [""],
      maladiesChroniques: [""],
      allergies: [""],
      operationsSubies: [""],
      enceinte: [false],
      tatouage: [false],
      // Observations
      observationsRh: [""]
    });
  }

  loadFiche() {
    this.loading = true;
    this.ficheService.getByUserId(this.userId).subscribe({
      next: (data) => {
        this.ficheForm.patchValue(data);
        this.loading = false;
      },
      error: (err) => {
        console.error("Erreur de chargement", err);
        // Ne bloque pas, car la fiche n'existe peut-etre pas encore
        this.loading = false;
      }
    });
  }

  onFileChange(event: any, docType: keyof TechnicienFicheRHDocuments) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.documents[docType] = file;
    }
  }

  onSubmit() {
    if (this.ficheForm.invalid) {
      return;
    }
    
    this.saving = true;
    this.errorMessage = "";
    this.successMessage = "";

    const formData = this.ficheForm.value;

    this.ficheService.saveOrUpdate(this.userId, formData, this.documents).subscribe({
      next: (res) => {
        this.saving = false;
        this.successMessage = "Fiche RH enregistrée avec succès.";
        window.scrollTo(0, 0);
      },
      error: (err) => {
        this.saving = false;
        this.errorMessage = "Une erreur s'est produite lors de l'enregistrement.";
        console.error("Erreur save fiche RH", err);
        window.scrollTo(0, 0);
      }
    });
  }
}
