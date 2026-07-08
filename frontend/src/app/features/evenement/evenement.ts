import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

export interface Evenement {
  id: number;
  titre: string;
  date: string;
  lieu: string;
  description: string;
  imageUrl: string;
}


export const EVENEMENTS_MOCK: Evenement[] = [
    {
      id: 1,
      titre: "SALON INTERNATIONAL DE LA SECURITE ELECTRONIQUE – TUNIS 2026",
      date: "15 - 17 Mars 2026",
      lieu: "Parc des Expositions du Kram, Tunis",
      description: "Le plus grand salon dédié à la sécurité électronique en Afrique du Nord. CCTV, contrôle d'accès, détection incendie et smart building.",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop"
    },
    {
      id: 2,
      titre: "JOURNEE TECHNIQUE FIBRE OPTIQUE – SOUSSE",
      date: "22 Avril 2026",
      lieu: "Hôtel Mövenpick, Sousse",
      description: "Formation et démonstrations sur les dernières techniques de soudure et certification de fibre optique FTTH/FTTX.",
      imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=450&fit=crop"
    },
    {
      id: 3,
      titre: "FORUM NATIONAL DES TECHNICIENS – SFAX 2026",
      date: "10 - 11 Mai 2026",
      lieu: "Centre de Conférences de Sfax",
      description: "Rencontres professionnelles entre techniciens, entreprises et formateurs. Ateliers pratiques et networking.",
      imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=450&fit=crop"
    },
    {
      id: 4,
      titre: "WORKSHOP SMART HOME & DOMOTIQUE – ARIANA",
      date: "5 Juin 2026",
      lieu: "Technopôle El Ghazala, Ariana",
      description: "Atelier pratique sur l'installation et la configuration de systèmes domotiques KNX, Zigbee et Z-Wave.",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=450&fit=crop"
    },
    {
      id: 5,
      titre: "CONFERENCE CYBERSECURITE & RESEAUX – TUNIS",
      date: "20 - 21 Septembre 2026",
      lieu: "Hôtel Laico, Tunis",
      description: "Conférence annuelle sur la cybersécurité, les infrastructures réseau et les nouvelles menaces numériques en Tunisie.",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop"
    },
    {
      id: 6,
      titre: "SALON DE L'EMPLOI TECHNIQUE – MONASTIR",
      date: "8 Novembre 2026",
      lieu: "Palais des Congrès, Monastir",
      description: "Salon de recrutement dédié aux métiers techniques : électricité, réseaux, sécurité électronique et maintenance industrielle.",
      imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=450&fit=crop"
    }
  ];

@Component({
  selector: "app-evenement",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./evenement.html",
  styleUrl: "./evenement.scss"
})
export class EvenementComponent {
  evenements = EVENEMENTS_MOCK;
}
