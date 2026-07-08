import { Routes } from "@angular/router";
import { HomeComponent } from "./features/home/home.component";
import { TechniciensComponent } from "./features/techniciens/techniciens";
import { EntreprisesComponent } from "./features/entreprises/entreprises";
import { EntrepriseDetailComponent } from "./features/entreprise-detail/entreprise-detail.component";
import { ContactComponent } from "./features/contact/contact.component";
import { Heyaa } from "./features/heyaa/heyaa";
import { Login } from "./features/login/login";
import { Register } from "./features/register/register";
import { EvenementComponent } from "./features/evenement/evenement";
import { EvenementDetailComponent } from "./features/evenement-detail/evenement-detail.component";
import { JuridiqueComponent } from "./features/juridique/juridique.component";
import { TechnicienFicheRhFormComponent } from "./features/admin/technicien-fiche-rh/technicien-fiche-rh-form.component";
import { authGuard } from "./core/guards/auth-guard";
import { roleGuard } from "./core/guards/role-guard";
export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "techniciens", component: TechniciensComponent },
  { path: "entreprises", component: EntreprisesComponent },
  { path: "entreprises/:nom", component: EntrepriseDetailComponent },
  { path: "contact", component: ContactComponent },
  { path: "heyaa", component: Heyaa },
  { path: "login", component: Login },
  { path: "register", component: Register },
  { path: "evenement", component: EvenementComponent },
  { path: "evenement/:id", component: EvenementDetailComponent },
  { path: "juridique", component: JuridiqueComponent },
  { 
    path: "admin/technicien-fiche-rh/:userId", 
    component: TechnicienFicheRhFormComponent,
    canActivate: [authGuard, roleGuard(['ADMIN'])]
  },
  { path: "**", redirectTo: "" }
];