import { Routes } from "@angular/router";
import { HomeComponent } from "./features/home/home.component";
import { TechniciensComponent } from "./features/techniciens/techniciens";
import { EntreprisesComponent } from "./features/entreprises/entreprises";
import { EntrepriseDetailComponent } from "./features/entreprise-detail/entreprise-detail.component";
export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "techniciens", component: TechniciensComponent },
  { path: "entreprises", component: EntreprisesComponent },
  { path: "entreprises/:nom", component: EntrepriseDetailComponent },
  { path: "**", redirectTo: "" }
];
