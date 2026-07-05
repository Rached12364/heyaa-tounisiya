import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
@Component({
  selector: "app-techniciens",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./techniciens.html",
  styleUrl: "./techniciens.scss"
})
export class TechniciensComponent {
  searchTerm = "";
  selectedGouvernorat = "";
  selectedSpecialite = "";
  gouvernorats = ["Tunis","Ariana","Ben Arous","Manouba","Nabeul",
    "Zaghouan","Bizerte","Beja","Jendouba","Kef","Siliana",
    "Sousse","Monastir","Mahdia","Sfax","Kairouan","Kasserine",
    "Sidi Bouzid","Gabes","Medenine","Tataouine","Gafsa",
    "Tozeur","Kebili"];
  specialites = ["CCTV & Surveillance","Reseaux Informatiques",
    "Electricite","Detection Incendie","Smart Home",
    "Fibre Optique","Controle acces","Photovoltaique"];
  techniciens = [
    { initiales:"MK", nom:"Mohamed Karim",
      specialite:"CCTV & Surveillance",
      gouvernorat:"Nabeul", experience:5,
      verifie:true, couleur:"#1B3A5C" },
    { initiales:"AB", nom:"Ahmed Ben Ali",
      specialite:"Reseaux Informatiques",
      gouvernorat:"Tunis", experience:8,
      verifie:true, couleur:"#0D9488" },
    { initiales:"SR", nom:"Sami Romdhane",
      specialite:"Electricite",
      gouvernorat:"Sousse", experience:3,
      verifie:true, couleur:"#C9A227" },
    { initiales:"YB", nom:"Youssef Bchir",
      specialite:"Smart Home",
      gouvernorat:"Sfax", experience:6,
      verifie:false, couleur:"#1B3A5C" },
    { initiales:"HT", nom:"Hamza Trabelsi",
      specialite:"Fibre Optique",
      gouvernorat:"Ariana", experience:4,
      verifie:true, couleur:"#0D9488" },
    { initiales:"WM", nom:"Walid Mansouri",
      specialite:"Detection Incendie",
      gouvernorat:"Bizerte", experience:7,
      verifie:true, couleur:"#E70013" },
  ];
}
