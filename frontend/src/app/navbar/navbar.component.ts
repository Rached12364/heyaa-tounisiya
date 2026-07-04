import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnDestroy, OnInit, signal } from '@angular/core';

type Lang = 'ar' | 'fr' | 'en';

interface MenuItem {
  fr: string;
  ar: string;
  en: string;
}

interface TranslationSet {
  brand: string;
  brandSubtitle: string;
  topAddress: string;
  topEmail: string;
  topPhone: string;
  login: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCta: string;
  secondaryCta: string;
  mobileMenuLabel: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  readonly currentLang = signal<Lang>('fr');
  readonly navbarScrolled = signal(false);
  readonly currentSlide = signal(0);
  mobileMenuOpen = false;
  private autoplayTimer: number | null = null;

  readonly languages: Array<{ code: Lang; label: string }> = [
    { code: 'ar', label: 'العربية' },
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' }
  ];

  readonly menuItems: MenuItem[] = [
    { fr: 'Accueil', ar: 'الرئيسية', en: 'Home' },
    { fr: "L'Heyaa", ar: 'الهيئة', en: 'The Authority' },
    { fr: 'Techniciens', ar: 'الفنيون', en: 'Technicians' },
    { fr: 'Entreprises', ar: 'الشركات', en: 'Companies' },
    { fr: 'Services', ar: 'الخدمات', en: 'Services' },
    { fr: 'Actualités', ar: 'الأخبار', en: 'News' },
    { fr: 'Contact', ar: 'اتصل بنا', en: 'Contact' }
  ];

  readonly slides = [
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600'
  ];

  readonly translations: Record<Lang, TranslationSet> = {
    fr: {
      brand: 'الهيئة التونسية للتقنيين',
      brandSubtitle: 'Plateforme de techniciens certifiés',
      topAddress: 'Avenue 2 Mars 1934, Nabeul 8000',
      topEmail: 'contact@mondial-security.com',
      topPhone: '(216) 54 555 277',
      login: 'Connexion',
      heroEyebrow: 'Services techniques certifiés',
      heroTitle: 'Des techniciens fiables à votre service',
      heroSubtitle: 'Trouvez rapidement un technicien certifié près de chez vous',
      primaryCta: 'Trouver un Technicien',
      secondaryCta: 'Inscription Technicien',
      mobileMenuLabel: 'Menu principal'
    },
    ar: {
      brand: 'الهيئة التونسية للتقنيين',
      brandSubtitle: 'منصة فنيين معتمدين',
      topAddress: 'شارع 2 مارس 1934، نابل 8000',
      topEmail: 'contact@mondial-security.com',
      topPhone: '(216) 54 555 277',
      login: 'تسجيل الدخول',
      heroEyebrow: 'خدمات تقنية معتمدة',
      heroTitle: 'التقنيون الموثوقون في خدمتكم',
      heroSubtitle: 'ابحث بسرعة عن فني معتمد بالقرب منك',
      primaryCta: 'ابحث عن فني',
      secondaryCta: 'إنشاء حساب فني',
      mobileMenuLabel: 'القائمة الرئيسية'
    },
    en: {
      brand: 'Tunisian Technicians Authority',
      brandSubtitle: 'Certified technicians platform',
      topAddress: 'Avenue 2 Mars 1934, Nabeul 8000',
      topEmail: 'contact@mondial-security.com',
      topPhone: '(216) 54 555 277',
      login: 'Login',
      heroEyebrow: 'Certified technical services',
      heroTitle: 'Reliable technicians at your service',
      heroSubtitle: 'Find a certified technician quickly near you',
      primaryCta: 'Find a Technician',
      secondaryCta: 'Technician Registration',
      mobileMenuLabel: 'Main menu'
    }
  };

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('heyaa-lang');
      if (stored === 'ar' || stored === 'fr' || stored === 'en') {
        this.currentLang.set(stored);
      }
    }
  }

  ngOnInit(): void {
    this.syncScrollState();
    this.startAutoPlay();
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll, { passive: true });
    }
  }

  ngOnDestroy(): void {
    if (this.autoplayTimer !== null && typeof window !== 'undefined') {
      window.clearInterval(this.autoplayTimer);
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  @HostBinding('attr.dir') get dir(): 'rtl' | 'ltr' {
    return this.currentLang() === 'ar' ? 'rtl' : 'ltr';
  }

  @HostBinding('class.rtl') get isRtl(): boolean {
    return this.currentLang() === 'ar';
  }

  get t(): TranslationSet {
    return this.translations[this.currentLang()];
  }

  getMenuLabel(item: MenuItem): string {
    return item[this.currentLang()];
  }

  setLanguage(lang: Lang): void {
    this.currentLang.set(lang);
    this.mobileMenuOpen = false;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('heyaa-lang', lang);
    }
  }

  toggleMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  nextSlide(): void {
    this.currentSlide.set((this.currentSlide() + 1) % this.slides.length);
  }

  prevSlide(): void {
    this.currentSlide.set((this.currentSlide() - 1 + this.slides.length) % this.slides.length);
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
    this.startAutoPlay();
  }

  private handleScroll = (): void => {
    this.syncScrollState();
  };

  private syncScrollState(): void {
    if (typeof window !== 'undefined') {
      this.navbarScrolled.set(window.scrollY > 30);
    }
  }

  private startAutoPlay(): void {
    if (this.autoplayTimer !== null && typeof window !== 'undefined') {
      window.clearInterval(this.autoplayTimer);
    }
    if (typeof window !== 'undefined') {
      this.autoplayTimer = window.setInterval(() => this.nextSlide(), 4000);
    }
  }
}
