import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styles: `
    :host {
      display: block;
    }

    .hero-section {
      position: relative;
      min-height: 760px;
      overflow: hidden;
      background: #0f172a;
      margin-top: 0;
    }

    .hero-slide {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 0.6s ease;
      pointer-events: none;
    }

    .hero-slide.active {
      opacity: 1;
      pointer-events: auto;
    }

    .hero-slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.55);
    }

    .hero-content {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 16px;
      padding: 120px 7vw;
      color: #fff;
      max-width: 780px;
      z-index: 1;
    }

    .eyebrow {
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-size: 0.95rem;
      font-weight: 700;
      color: #c9a227;
      margin: 0;
    }

    .hero-content h1 {
      margin: 0;
      font-size: clamp(2rem, 4vw, 3.4rem);
      font-weight: 800;
      line-height: 1.15;
    }

    .hero-subtitle {
      margin: 0;
      font-size: 1.05rem;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.9);
      max-width: 620px;
    }

    .hero-actions {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
      margin-top: 8px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 20px;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 700;
    }

    .btn-primary {
      background: #c9a227;
      color: #fff;
    }

    .btn-secondary {
      background: transparent;
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.7);
    }

    .hero-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      border: none;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: rgba(255,255,255,0.22);
      color: #fff;
      font-size: 1.7rem;
      cursor: pointer;
    }

    .hero-arrow--left { left: 20px; }
    .hero-arrow--right { right: 20px; }

    .hero-dots {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 2;
    }

    .hero-dots button {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: none;
      background: rgba(255,255,255,0.6);
      cursor: pointer;
      padding: 0;
    }

    .hero-dots button.active {
      background: #c9a227;
    }

    .services-section {
      background: #ffffff;
      padding: 60px 24px;
    }

    .services-section h2 {
      text-align: center;
      color: #1b3a5c;
      margin: 0 0 24px;
      font-size: 2rem;
      font-weight: 800;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 16px;
      max-width: 1320px;
      margin: 0 auto;
    }

    .service-card {
      border-radius: 18px;
      padding: 24px 20px;
      color: #ffffff;
      min-height: 220px;
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
    }

    .service-card__icon {
      font-size: 2rem;
      margin-bottom: 12px;
    }

    .service-card h3 {
      margin: 0 0 8px;
      font-size: 1.05rem;
      font-weight: 800;
    }

    .service-card p {
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.92);
    }

    .service-card.navy { background: #1b3a5c; }
    .service-card.teal { background: #0d9488; }
    .service-card.gold { background: #c9a227; }
    .service-card.red { background: #e70013; }

    .stats-section {
      background: #1b3a5c;
      padding: 36px 24px;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 16px;
      max-width: 1320px;
      margin: 0 auto;
    }

    .stat-block {
      text-align: center;
      color: #ffffff;
      padding: 12px 8px;
    }

    .stat-block__value {
      font-size: 2rem;
      font-weight: 800;
      color: #c9a227;
      margin-bottom: 6px;
    }

    .stat-block__label {
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .site-footer {
      background: #1b3a5c;
      color: #fff;
      padding: 60px 24px 20px;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 24px;
      max-width: 1320px;
      margin: 0 auto;
    }

    .footer-col {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .footer-col strong,
    .footer-col h4 {
      color: #fff;
      margin: 0 0 8px;
      font-weight: 800;
    }

    .footer-col h4 {
      color: #c9a227;
      font-size: 1rem;
    }

    .footer-col p,
    .footer-col a {
      color: #f5f7fb;
      text-decoration: none;
      font-size: 0.95rem;
      line-height: 1.6;
      margin: 0;
    }

    .footer-col a:hover {
      color: #c9a227;
    }

    .footer-col--brand p {
      color: #b7c0cc;
      font-size: 0.9rem;
    }

    .footer-socials {
      display: flex;
      gap: 10px;
      margin-top: 4px;
    }

    .footer-socials a {
      color: #c9a227;
      font-weight: 700;
    }

    .footer-bottom {
      margin-top: 28px;
      padding-top: 16px;
      border-top: 1px solid rgba(255,255,255,0.15);
      text-align: center;
      color: #cfd8e3;
      font-size: 13px;
    }

    @media (max-width: 1100px) {
      .cards-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .stats-section {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 760px) {
      .cards-grid,
      .stats-section,
      .footer-grid {
        grid-template-columns: 1fr;
      }
    }
  `
})
export class HomeComponent implements OnInit, OnDestroy {
  private autoSlide: any;
  public readonly slides: Array<{ image: string; alt: string }> = [
    { image: 'hero.jpg', alt: 'Travail électrique et technicien' },
    { image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600', alt: 'Panneaux solaires' },
    { image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600', alt: 'Installation fibre optique' }
  ];

  public currentSlide = 0;
  private autoplayTimer: number | null = null;

  ngOnInit(): void {
    this.autoSlide = setInterval(() => this.nextSlide(), 5000);
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    clearInterval(this.autoSlide);
    if (this.autoplayTimer !== null && typeof window !== 'undefined') {
      window.clearInterval(this.autoplayTimer);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.restartAutoPlay();
  }

  private startAutoPlay(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (this.autoplayTimer !== null) {
      window.clearInterval(this.autoplayTimer);
    }

    this.autoplayTimer = window.setInterval(() => this.nextSlide(), 4000);
  }

  private restartAutoPlay(): void {
    this.startAutoPlay();
  }
}




