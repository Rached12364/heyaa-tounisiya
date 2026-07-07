import { Component, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TechnicienProfileService, TechnicienDocuments } from "../../core/services/technicien-profile";

interface StepDef {
  label: string;
  icon: string;
}

@Component({
  selector: "app-technicien-profil",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./technicien-profil.html",
  styleUrl: "./technicien-profil.scss"
})
export class TechnicienProfil {

  steps: StepDef[] = [
    { label: "Personnel", icon: "👤" },
    { label: "Professionnel", icon: "💼" },
    { label: "Compétences", icon: "🛠️" },
    { label: "Permis & Mobilité", icon: "🚗" },
    { label: "Documents", icon: "📄" },
    { label: "Finalisation", icon: "✅" }
  ];

  currentStep = signal(0);
  progressPercent = computed(() => ((this.currentStep() + 1) / this.steps.length) * 100);

  loading = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  form: FormGroup;

  // Fichiers sélectionnés (stockés séparément du FormGroup)
  files = signal<TechnicienDocuments>({});
  fileNames = signal<Record<string, string>>({});

  niveauxEtudes = [
    { value: "SANS_DIPLOME", label: "Sans diplôme" },
    { value: "BAC", label: "Baccalauréat" },
    { value: "BTS_BTP", label: "BTS / BTP" },
    { value: "LICENCE", label: "Licence" },
    { value: "INGENIEUR", label: "Ingénieur" },
    { value: "MASTER", label: "Master" },
    { value: "AUTRE", label: "Autre" }
  ];

  metiers = [
    { value: "ELECTRICIEN", label: "Électricien" },
    { value: "RESEAU", label: "Réseau" },
    { value: "CCTV", label: "CCTV" },
    { value: "FIBRE", label: "Fibre optique" },
    { value: "CLIMATISATION", label: "Climatisation" },
    { value: "MULTI_METIER", label: "Multi-métier" }
  ];

  statutsProfessionnels = [
    { value: "FREELANCE", label: "Freelance" },
    { value: "EMPLOYE", label: "Employé" },
    { value: "SOCIETE", label: "Société" }
  ];

  categoriesPermis = [
    { value: "A", label: "A (moto)" },
    { value: "B", label: "B (voiture)" },
    { value: "C", label: "C (poids lourd)" },
    { value: "D", label: "D (transport en commun)" },
    { value: "AUCUN", label: "Aucun" }
  ];

  typesDisponibilite = [
    { value: "TEMPS_PLEIN", label: "Temps plein" },
    { value: "TEMPS_PARTIEL", label: "Temps partiel" }
  ];

  gouvernorats = [
    "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba",
    "Kairouan", "Kasserine", "Kébili", "Kef", "Mahdia", "Manouba", "Médenine",
    "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse",
    "Tataouine", "Tozeur", "Tunis", "Zaghouan"
  ];

  constructor(
    private fb: FormBuilder,
    private profileService: TechnicienProfileService,
    private router: Router
  ) {
    this.form = this.fb.group({
      // Personnel
      cin: ["", [Validators.required, Validators.pattern(/^\d{8}$/)]],
      dateNaissance: ["", Validators.required],
      sexe: ["", Validators.required],
      adresse: ["", Validators.required],
      ville: [""],
      gouvernorat: ["", Validators.required],
      telephoneSecondaire: [""],

      // Professionnel
      matricule: [""],
      metier: ["", Validators.required],
      specialite: [""],
      niveauEtudes: [""],
      diplome: [""],
      etablissement: [""],
      anneeObtention: [null],
      anneesExperience: [null, [Validators.min(0)]],
      entrepriseActuelle: [""],
      statutProfessionnel: [""],

      // Compétences
      competenceCctv: [false],
      competenceControleAcces: [false],
      competenceReseaux: [false],
      competenceFibreOptique: [false],
      competenceElectricite: [false],
      competenceDomotique: [false],
      competenceMaintenanceInformatique: [false],
      competenceAlarmesIntrusion: [false],
      competenceDetectionIncendie: [false],
      autresCompetences: [""],

      // Sécurité électronique (CCTV)
      travailleSecuriteElectronique: [false],
      experienceCamerasIp: [false],
      experienceNvrDvr: [false],
      marquesMaitrisees: [""],
      configurationReseau: [false],
      pointageBiometrique: [false],
      interphonieIp: [false],
      soudureFibreOptique: [false],
      certifications: [""],

      // Permis et mobilité
      permisConduire: [false],
      categoriePermis: [""],
      vehiculePersonnel: [false],
      disponibleDeplacement: [false],
      zonesIntervention: [""],

      // Disponibilité
      disponibleImmediatement: [false],
      typeDisponibilite: [""],
      salaireSouhaite: [null],

      // Bancaire
      banque: [""],
      rib: [""],

      // Observations
      commentaires: [""]
    });
  }

  get f() {
    return this.form.controls;
  }

  get isLastStep(): boolean {
    return this.currentStep() === this.steps.length - 1;
  }

  get isCctvWorker(): boolean {
    return this.f["travailleSecuriteElectronique"].value === true;
  }

  get hasPermis(): boolean {
    return this.f["permisConduire"].value === true;
  }

  goToStep(index: number): void {
    if (index >= 0 && index < this.steps.length) {
      this.currentStep.set(index);
    }
  }

  nextStep(): void {
    // Validation minimale sur l'étape "Personnel" (étape 0) avant d'avancer
    if (this.currentStep() === 0) {
      const requiredFields = ["cin", "dateNaissance", "sexe", "adresse", "gouvernorat"];
      const invalid = requiredFields.some((field) => this.f[field].invalid);
      if (invalid) {
        requiredFields.forEach((field) => this.f[field].markAsTouched());
        return;
      }
    }
    if (this.currentStep() === 1 && this.f["metier"].invalid) {
      this.f["metier"].markAsTouched();
      return;
    }

    if (!this.isLastStep) {
      this.currentStep.update((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  previousStep(): void {
    if (this.currentStep() > 0) {
      this.currentStep.update((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  onFileSelected(event: Event, key: keyof TechnicienDocuments): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.files.update((current) => ({ ...current, [key]: file }));

    if (file) {
      this.fileNames.update((names) => ({ ...names, [key]: file.name }));
    }
  }

  onSubmit(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage.set("Merci de vérifier les champs obligatoires (CIN, date de naissance, sexe, adresse, gouvernorat, métier).");
      return;
    }

    this.loading.set(true);

    this.profileService.saveProfile(this.form.value, this.files()).subscribe({
      next: () => {
        this.loading.set(false);
        this.successMessage.set("Votre profil technicien a été enregistré avec succès !");
        setTimeout(() => this.router.navigate(["/"]), 1800);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(
          err.error?.error || "Une erreur est survenue lors de l'enregistrement. Réessayez plus tard."
        );
      }
    });
  }
}
