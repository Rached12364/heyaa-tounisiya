import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
export type AppLang = "fr" | "en" | "ar";
@Injectable({ providedIn: "root" })
export class LanguageService {
  private readonly STORAGE_KEY = "heyaa_lang";
  private readonly rtlLangs: AppLang[] = ["ar"];
  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {}
  init(): void {
    const saved = (localStorage.getItem(this.STORAGE_KEY) as AppLang) || "fr";
    this.setLanguage(saved);
  }
  setLanguage(lang: AppLang): void {
    this.translate.use(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
    const isRtl = this.rtlLangs.includes(lang);
    this.document.documentElement.lang = lang;
    this.document.documentElement.dir = isRtl ? "rtl" : "ltr";
    this.document.body.classList.toggle("rtl", isRtl);
  }
  get currentLang(): AppLang {
    return (this.translate.currentLang() as AppLang) || "fr";
  }
  isActive(lang: AppLang): boolean {
    return this.currentLang === lang;
  }
}
