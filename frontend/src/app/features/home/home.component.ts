import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Stat {
  target: number;
  suffix: string;
  label: string;
  display: number;
}
interface ServiceCard {
  icon: string;
  title: string;
  text: string;
  color: string;
}
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
      height: clamp(480px, 78vh, 640px);
      overflow: hidden;
      background: #0B2038;
      margin-top: 0;
    }
    .hero-slide {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 0.9s ease;
      pointer-events: none;
    }
    .hero-slide.active {
      opacity: 1;
      pointer-events: auto;
    }
    .hero-slide__media {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      transform: scale(1.06);
      transition: transform 6s ease;
    }
    .hero-slide.active .hero-slide__media {
      transform: scale(1);
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(115deg, rgba(11, 32, 56, 0.92) 0%, rgba(11, 32, 56, 0.68) 38%, rgba(11, 32, 56, 0.3) 68%, rgba(11, 32, 56, 0.08) 100%);
    }
    .hero-sheen {
      position: absolute;
      inset: 0;
      background: linear-gradient(100deg, transparent 30%, rgba(240, 199, 94, 0.16) 45%, transparent 60%);
      background-size: 250% 250%;
      animation: sheenSweep 7s ease-in-out infinite;
      mix-blend-mode: screen;
      pointer-events: none;
    }
    @keyframes sheenSweep {
      0% { background-position: 120% -20%; opacity: 0; }
      15% { opacity: 1; }
      45% { background-position: -20% 120%; opacity: 0.6; }
      46% { opacity: 0; }
      100% { background-position: -20% 120%; opacity: 0; }
    }
    .hero-content {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 16px;
      padding: 0 7vw;
      color: #fff;
      max-width: 700px;
      z-index: 2;
    }
    .eyebrow {
      display: flex;
      align-items: center;
      gap: 10px;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      font-size: 0.85rem;
      font-weight: 700;
      color: #F0C75E;
      margin: 0;
    }
    .eyebrow::before {
      content: '';
      width: 28px;
      height: 2px;
      background: #F0C75E;
      display: inline-block;
    }
    .hero-content h1 {
      margin: 0;
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 700;
      line-height: 1.12;
      letter-spacing: -0.01em;
    }
    .hero-subtitle {
      margin: 0;
      font-size: 1.05rem;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.88);
      max-width: 560px;
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
      padding: 13px 22px;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 700;
      transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    }
    .btn-primary {
      background: linear-gradient(135deg, #C9A227, #F0C75E);
      color: #0B2038;
      box-shadow: 0 10px 24px rgba(201, 162, 39, 0.35);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 30px rgba(201, 162, 39, 0.45);
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.55);
      backdrop-filter: blur(4px);
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.16);
      border-color: #fff;
      transform: translateY(-2px);
    }
    .hero-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 3;
      border: none;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.14);
      backdrop-filter: blur(6px);
      color: #fff;
      font-size: 1.6rem;
      cursor: pointer;
      transition: background 0.2s ease, color 0.2s ease;
    }
    .hero-arrow:hover {
      background: rgba(201, 162, 39, 0.9);
      color: #0B2038;
    }
    .hero-arrow--left { left: 20px; }
    .hero-arrow--right { right: 20px; }
    .hero-dots {
      position: absolute;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 3;
    }
    .hero-dots button {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: none;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      padding: 0;
      transition: background 0.2s ease, box-shadow 0.2s ease, width 0.2s ease;
    }
    .hero-dots button.active {
      background: #F0C75E;
      width: 26px;
      border-radius: 999px;
      box-shadow: 0 0 10px rgba(240, 199, 94, 0.6);
    }
    .hero-scroll-cue {
      position: absolute;
      bottom: 26px;
      right: 32px;
      width: 22px;
      height: 36px;
      border: 2px solid rgba(255, 255, 255, 0.5);
      border-radius: 12px;
      z-index: 3;
    }
    .hero-scroll-cue span {
      position: absolute;
      top: 6px;
      left: 50%;
      width: 4px;
      height: 8px;
      background: #F0C75E;
      border-radius: 2px;
      transform: translateX(-50%);
      animation: scrollCue 1.8s ease-in-out infinite;
    }
    @keyframes scrollCue {
      0% { top: 6px; opacity: 1; }
      70% { top: 18px; opacity: 0; }
      100% { top: 18px; opacity: 0; }
    }
    .stats-section {
      position: relative;
      z-index: 3;
      margin-top: 0;
      padding: 0 24px;
    }
    .stats-card {
      max-width: 1200px;
      margin: 0 auto;
      background: #fff;
      border-radius: 20px;
      box-shadow: 0 24px 48px rgba(11, 32, 56, 0.18);
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      overflow: hidden;
    }
    .stat-block {
      text-align: center;
      padding: 32px 16px;
      border-right: 1px solid rgba(11, 32, 56, 0.08);
    }
    .stat-block:last-child { border-right: none; }
    .stat-block__value {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.1rem;
      font-weight: 700;
      color: #1B3A5C;
    }
    .stat-block__suffix { color: #C9A227; }
    .stat-block__label {
      margin-top: 6px;
      font-size: 0.9rem;
      color: #5A6B80;
      font-weight: 500;
    }
    .services-section {
      background: #F7F5EF;
      padding: 96px 24px 64px;
    }
    .section-eyebrow {
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      font-size: 0.8rem;
      font-weight: 700;
      color: #C9A227;
      margin: 0 0 8px;
    }
    .services-section h2 {
      text-align: center;
      color: #16283F;
      margin: 0 0 40px;
      font-size: 2.1rem;
      font-weight: 700;
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
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.25s ease;
    }
    .service-card.in-view {
      opacity: 1;
      transform: translateY(0);
    }
    .service-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 36px rgba(15, 23, 42, 0.22);
    }
    .service-card__icon {
      font-size: 2rem;
      margin-bottom: 12px;
      transition: transform 0.25s ease;
    }
    .service-card:hover .service-card__icon {
      transform: scale(1.15);
    }
    .service-card h3 {
      margin: 0 0 8px;
      font-size: 1.05rem;
      font-weight: 700;
    }
    .service-card p {
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.92);
    }
    .service-card.navy { background: linear-gradient(160deg, #1B3A5C, #12283F); }
    .service-card.teal { background: linear-gradient(160deg, #0D9488, #0B6E64); }
    .service-card.gold { background: linear-gradient(160deg, #C9A227, #A9841C); }
    .service-card.red { background: linear-gradient(160deg, #E63946, #B71C2B); }
    .site-footer {
      background: #0B2038;
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
      font-weight: 700;
    }
    .footer-col h4 {
      color: #C9A227;
      font-size: 1rem;
    }
    .footer-col p,
    .footer-col a {
      color: #E7EBF2;
      text-decoration: none;
      font-size: 0.95rem;
      line-height: 1.6;
      margin: 0;
      transition: color 0.2s ease;
    }
    .footer-col a:hover { color: #C9A227; }
    .footer-col--brand p {
      color: #A9B4C4;
      font-size: 0.9rem;
    }
    .footer-socials {
      display: flex;
      gap: 10px;
      margin-top: 4px;
    }
    .footer-socials a {
      color: #C9A227;
      font-weight: 700;
    }
    .footer-bottom {
      margin-top: 28px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      text-align: center;
      color: #A9B4C4;
      font-size: 13px;
    }
    @media (max-width: 1100px) {
      .cards-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .stats-card { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .stat-block:nth-child(2) { border-right: none; }
      .stat-block { border-bottom: 1px solid rgba(11, 32, 56, 0.08); }
    }
    @media (max-width: 760px) {
      .cards-grid,
      .footer-grid { grid-template-columns: 1fr; }
      .stats-card { grid-template-columns: 1fr; }
      .stat-block { border-right: none; }
      .hero-scroll-cue { display: none; }
    }
  `
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private cd: ChangeDetectorRef) {}

  @ViewChild('statsCard') statsCardRef!: ElementRef<HTMLElement>;
  @ViewChildren('cardEl') cardEls!: QueryList<ElementRef<HTMLElement>>;
  public readonly slides: Array<{ image: string; alt: string }> = [
    { image: 'hero.jpg', alt: 'Travail électrique et technicien' },
    { image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600', alt: 'Panneaux solaires' },
    { image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600', alt: 'Installation fibre optique' }
  ];
  public stats: Stat[] = [
    { target: 500, suffix: '+', label: 'Techniciens certifiés', display: 0 },
    { target: 150, suffix: '+', label: 'Entreprises partenaires', display: 0 },
    { target: 24, suffix: '', label: 'Gouvernorats couverts', display: 0 },
    { target: 1000, suffix: '+', label: 'Interventions réalisées', display: 0 }
  ];
  public serviceCards: ServiceCard[] = [
    { icon: '📷', title: 'CCTV & Surveillance', text: 'Installation et maintenance de caméras IP', color: 'navy' },
    { icon: '🌐', title: 'Réseaux Informatiques', text: 'Câblage structuré et fibre optique', color: 'teal' },
    { icon: '⚡', title: 'Électricité', text: 'Électricité bâtiment et industrielle', color: 'gold' },
    { icon: '🔥', title: 'Détection Incendie', text: 'Systèmes anti-incendie certifiés', color: 'red' },
    { icon: '🏠', title: 'Smart Home', text: 'Domotique et automatisation', color: 'navy' }
  ];
  public currentSlide = 0;
  private autoplayTimer: number | null = null;
  private statsAnimated = false;
  private statsObserver?: IntersectionObserver;
  private cardObserver?: IntersectionObserver;
  ngOnInit(): void {
    this.startAutoPlay();
  }
  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      this.stats.forEach(stat => (stat.display = stat.target));
      return;
    }
    this.statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.statsAnimated) {
          this.statsAnimated = true;
          this.stats.forEach(stat => this.countUp(stat));
          this.statsObserver?.disconnect();
        }
      });
    }, { threshold: 0.4 });
    if (this.statsCardRef) {
      this.statsObserver.observe(this.statsCardRef.nativeElement);
    }
    this.cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          this.cardObserver?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    this.cardEls.forEach(ref => this.cardObserver?.observe(ref.nativeElement));
  }
  ngOnDestroy(): void {
    if (this.autoplayTimer !== null && typeof window !== 'undefined') {
      window.clearInterval(this.autoplayTimer);
    }
    this.statsObserver?.disconnect();
    this.cardObserver?.disconnect();
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
    this.autoplayTimer = window.setInterval(() => { this.nextSlide(); this.cd.markForCheck(); }, 4000);
  }
  private restartAutoPlay(): void {
    this.startAutoPlay();
  }
  private countUp(stat: Stat): void {
    const duration = 1200;
    const start = performance.now();
    const to = stat.target;
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      stat.display = Math.round(to * eased);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        stat.display = to;
      }
    };
    requestAnimationFrame(step);
  }
}