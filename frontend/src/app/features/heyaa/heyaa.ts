import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

interface BureauMember {
  initials: string;
  name: string;
  role: string;
  color: string;
}

interface LegalDoc {
  title: string;
  description: string;
  fileName: string;
  date: string;
}

interface Partner {
  initials: string;
  name: string;
}

@Component({
  selector: 'app-heyaa',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './heyaa.html',
  styleUrl: './heyaa.scss'
})
export class Heyaa {

  // ===== Mission / Vision =====
  mission =
    "Fédérer, représenter et accompagner les techniciens tunisiens spécialisés en électricité, " +
    "énergie renouvelable et activités annexes, en garantissant le respect des normes de sécurité, " +
    "la reconnaissance de la profession et le développement continu des compétences.";

  vision =
    "Faire de la Heyaa Tounisiya la référence nationale de la certification technique dans le secteur " +
    "de l'électricité et des énergies renouvelables, au service d'une transition énergétique fiable et durable.";

  // ===== Histoire =====
  timeline: TimelineItem[] = [
    {
      year: '2018',
      title: 'Fondation de la Heyaa',
      description: "Création de l'association par un groupe de techniciens et ingénieurs autour d'une charte commune de qualité et de sécurité."
    },
    {
      year: '2019',
      title: 'Premier congrès national',
      description: "Réunion des premiers adhérents à Tunis et adoption des statuts fondateurs de la Heyaa."
    },
    {
      year: '2020',
      title: 'Reconnaissance officielle',
      description: "Obtention de l'agrément auprès des autorités compétentes et structuration en bureau exécutif régional."
    },
    {
      year: '2022',
      title: 'Partenariats sectoriels',
      description: "Signature de conventions avec des acteurs du secteur de l'énergie renouvelable et des entreprises de sécurité."
    },
    {
      year: '2024',
      title: 'Lancement de la plateforme numérique',
      description: "Mise en ligne de l'annuaire national des techniciens et entreprises certifiés."
    },
    {
      year: '2026',
      title: 'Extension nationale',
      description: "Présence active dans les 24 gouvernorats et plus de 500 techniciens certifiés."
    }
  ];

  // ===== Valeurs =====
  valeurs: ValueItem[] = [
    {
      icon: '🛡️',
      title: 'Intégrité',
      description: "Une pratique professionnelle honnête, transparente et conforme aux normes en vigueur."
    },
    {
      icon: '⚡',
      title: 'Excellence technique',
      description: "Un engagement constant pour la formation continue et la maîtrise des dernières technologies."
    },
    {
      icon: '🤝',
      title: 'Solidarité',
      description: "Un réseau de techniciens qui s'entraident et partagent leur savoir-faire."
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: "L'adoption des énergies renouvelables et des outils numériques au service du métier."
    },
    {
      icon: '🇹🇳',
      title: 'Engagement citoyen',
      description: "Une contribution active à la sécurité des personnes et des biens sur tout le territoire."
    }
  ];

  // ===== Objectifs statutaires =====
  objectifs: string[] = [
    "Représenter les techniciens en électricité, énergie renouvelable et activités annexes auprès des institutions publiques et privées.",
    "Promouvoir la formation continue et la certification des compétences techniques.",
    "Défendre les intérêts moraux et matériels des adhérents de l'association.",
    "Contribuer à l'élaboration de normes de sécurité et de qualité dans le secteur.",
    "Favoriser les échanges d'expérience entre techniciens et entreprises du secteur.",
    "Encourager le développement des énergies renouvelables et de la transition énergétique en Tunisie."
  ];

  // ===== Bureau exécutif =====
  bureau: BureauMember[] = [
    { initials: 'MB', name: 'Mohamed Ben Salah', role: 'Président', color: '#1B3A5C' },
    { initials: 'SK', name: 'Sami Karray', role: 'Vice-Président', color: '#0D9488' },
    { initials: 'AH', name: 'Amira Haddad', role: 'Secrétaire Générale', color: '#C9A227' },
    { initials: 'RT', name: 'Riadh Trabelsi', role: 'Trésorier', color: '#1B3A5C' },
    { initials: 'NJ', name: 'Nadia Jlassi', role: 'Chargée des Partenariats', color: '#0D9488' },
    { initials: 'FM', name: 'Fares Mejri', role: 'Chargé de la Formation', color: '#C9A227' }
  ];

  // ===== Textes juridiques =====
  documentsLegaux: LegalDoc[] = [
    {
      title: "Statuts de l'association",
      description: "Document fondateur définissant l'objet, l'organisation et le fonctionnement de la Heyaa Tounisiya.",
      fileName: 'statuts-heyaa-tounisiya.pdf',
      date: '2018'
    },
    {
      title: "Récépissé d'agrément",
      description: "Attestation officielle de reconnaissance de l'association par les autorités compétentes.",
      fileName: 'agrement-officiel.pdf',
      date: '2020'
    },
    {
      title: "Règlement intérieur",
      description: "Règles internes régissant l'adhésion, les cotisations et le fonctionnement du bureau exécutif.",
      fileName: 'reglement-interieur.pdf',
      date: '2021'
    },
    {
      title: "Charte de déontologie",
      description: "Engagement des adhérents envers les normes de sécurité, de qualité et d'éthique professionnelle.",
      fileName: 'charte-deontologie.pdf',
      date: '2022'
    }
  ];

  // ===== Partenaires =====
  partenaires: Partner[] = [
    { initials: 'ANME', name: "Agence Nationale pour la Maîtrise de l'Énergie" },
    { initials: 'UTICA', name: "Union Tunisienne de l'Industrie, du Commerce et de l'Artisanat" },
    { initials: 'MIN', name: "Ministère de l'Industrie et des Mines" },
    { initials: 'STEG', name: "Société Tunisienne de l'Électricité et du Gaz" },
    { initials: 'MSD', name: 'Mondial Security Distribution' },
    { initials: 'CCI', name: 'Chambre de Commerce et d\'Industrie' }
  ];

  // ===== Stats (repris de la home) =====
  stats = [
    { value: '500+', label: 'Techniciens certifiés' },
    { value: '150+', label: 'Entreprises partenaires' },
    { value: '24', label: 'Gouvernorats couverts' },
    { value: '1000+', label: 'Interventions réalisées' }
  ];

  downloadDocument(doc: LegalDoc): void {
    // TODO: brancher sur l'endpoint backend de téléchargement (ex: /api/documents/:fileName)
    console.log('Téléchargement demandé :', doc.fileName);
  }
}

