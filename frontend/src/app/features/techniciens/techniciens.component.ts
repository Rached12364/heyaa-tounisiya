import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Technician {
  name: string;
  initials: string;
  specialty: string;
  specialtyClass: string;
  location: string;
  experience: number;
  verified: boolean;
}

@Component({
  selector: 'app-techniciens',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="page-header">
      <div class="page-header__content">
        <p class="page-header__eyebrow">Plateforme de techniciens</p>
        <h1>Nos Techniciens</h1>
        <p class="page-header__subtitle">Trouvez un technicien certifié près de chez vous</p>
        <nav class="breadcrumb" aria-label="Fil d’Ariane">
          <a href="#">Accueil</a>
          <span>›</span>
          <span>Techniciens</span>
        </nav>
      </div>
    </section>

    <section class="filters-section">
      <div class="filter-card">
        <input type="text" placeholder="Rechercher un technicien..." />

        <select>
          <option value="">Gouvernorat</option>
          <option *ngFor="let governorate of governorates" [value]="governorate">{{ governorate }}</option>
        </select>

        <select>
          <option value="">Spécialité</option>
          <option *ngFor="let specialty of specialties" [value]="specialty">{{ specialty }}</option>
        </select>

        <button type="button">Rechercher</button>
      </div>
    </section>

    <section class="technicians-section">
      <div class="technicians-grid">
        <article class="technician-card" *ngFor="let technician of technicians">
          <div class="technician-card__avatar">{{ technician.initials }}</div>
          <div class="technician-card__body">
            <h3>{{ technician.name }}</h3>
            <span class="specialty-badge" [ngClass]="technician.specialtyClass">{{ technician.specialty }}</span>
            <p class="location">📍 {{ technician.location }}</p>
            <p class="experience">⭐ {{ technician.experience }} ans d'expérience</p>
            <p class="verified" *ngIf="technician.verified">✅ Vérifié</p>
            <button type="button">Voir le profil</button>
          </div>
        </article>
      </div>
    </section>
  `,
  styles: [
    ':host { display: block; background: #f6f8fb; color: #0f172a; font-family: "Segoe UI", Roboto, Arial, sans-serif; }',
    '.page-header { background: #1b3a5c; color: #fff; padding: 110px 24px 56px; }',
    '.page-header__content { max-width: 1200px; margin: 0 auto; }',
    '.page-header__eyebrow { text-transform: uppercase; letter-spacing: 0.18em; color: #c9a227; font-weight: 700; margin: 0 0 8px; }',
    '.page-header h1 { font-size: clamp(2rem, 3.4vw, 2.8rem); margin: 0 0 10px; }',
    '.page-header__subtitle { margin: 0 0 16px; color: rgba(255,255,255,0.9); font-size: 1.05rem; }',
    '.breadcrumb { display: flex; gap: 8px; align-items: center; color: rgba(255,255,255,0.8); }',
    '.breadcrumb a { color: #fff; text-decoration: none; font-weight: 600; }',
    '.filters-section { padding: 24px; margin-top: -24px; }',
    '.filter-card { max-width: 1200px; margin: 0 auto; background: #fff; border-radius: 18px; box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08); padding: 20px; display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 12px; align-items: center; }',
    '.filter-card input, .filter-card select { border: 1px solid #d7e0eb; border-radius: 10px; padding: 12px 14px; font-size: 0.95rem; }',
    '.filter-card button { border: none; border-radius: 10px; padding: 12px 18px; background: #1b3a5c; color: #fff; font-weight: 700; cursor: pointer; }',
    '.technicians-section { padding: 24px 24px 60px; }',
    '.technicians-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }',
    '.technician-card { background: #fff; border-radius: 18px; box-shadow: 0 10px 24px rgba(15, 23, 42, 0.07); padding: 20px; display: flex; gap: 14px; align-items: flex-start; }',
    '.technician-card__avatar { width: 54px; height: 54px; border-radius: 50%; background: #1b3a5c; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0; }',
    '.technician-card__body { display: flex; flex-direction: column; gap: 8px; }',
    '.technician-card__body h3 { margin: 0; font-size: 1.05rem; }',
    '.specialty-badge { display: inline-block; width: fit-content; padding: 6px 10px; border-radius: 999px; font-size: 0.8rem; font-weight: 700; }',
    '.specialty-badge.cctv { background: #e7f0ff; color: #1b3a5c; }',
    '.specialty-badge.reseaux { background: #e6f8f3; color: #0d9488; }',
    '.specialty-badge.electricite { background: #fff4d6; color: #b7820b; }',
    '.specialty-badge.incendie { background: #ffe6e8; color: #d92d20; }',
    '.specialty-badge.smart { background: #f1ebff; color: #6b21a8; }',
    '.specialty-badge.fibre { background: #e9f7ff; color: #0d6efd; }',
    '.location, .experience, .verified { margin: 0; color: #53627a; font-size: 0.95rem; }',
    '.technician-card button { margin-top: 6px; border: 1px solid #1b3a5c; background: transparent; color: #1b3a5c; border-radius: 999px; padding: 8px 12px; font-weight: 700; cursor: pointer; }',
    '@media (max-width: 980px) { .filter-card { grid-template-columns: 1fr 1fr; } .technicians-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }',
    '@media (max-width: 680px) { .filter-card, .technicians-grid { grid-template-columns: 1fr; } }'
  ]
})
export class TechniciensComponent {
  readonly governorates = [
    'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kébili',
    'Le Kef', 'Mahdia', 'La Manouba', 'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse',
    'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
  ];

  readonly specialties = ['CCTV', 'Réseaux', 'Électricité', 'Incendie', 'Smart Home', 'Fibre Optique'];

  readonly technicians: Technician[] = [
    { name: 'Mohamed Ben Ali', initials: 'MB', specialty: 'Électricité', specialtyClass: 'electricite', location: 'Tunis', experience: 10, verified: true },
    { name: 'Sami Trabelsi', initials: 'ST', specialty: 'CCTV', specialtyClass: 'cctv', location: 'Nabeul', experience: 8, verified: true },
    { name: 'Amel Kaabi', initials: 'AK', specialty: 'Réseaux', specialtyClass: 'reseaux', location: 'Sfax', experience: 6, verified: true },
    { name: 'Karim Jaziri', initials: 'KJ', specialty: 'Incendie', specialtyClass: 'incendie', location: 'Sousse', experience: 9, verified: true },
    { name: 'Nour Mejri', initials: 'NM', specialty: 'Smart Home', specialtyClass: 'smart', location: 'Ariana', experience: 7, verified: true },
    { name: 'Fares Haddad', initials: 'FH', specialty: 'Fibre Optique', specialtyClass: 'fibre', location: 'Bizerte', experience: 5, verified: true }
  ];
}
