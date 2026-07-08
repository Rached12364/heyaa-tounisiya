import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

interface JuridiqueSection {
  id: string;
  titleAr: string;
  titleFr: string;
  contentAr: string[];
  isOpen: boolean;
}

@Component({
  selector: "app-juridique",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./juridique.component.html",
  styleUrl: "./juridique.component.scss"
})
export class JuridiqueComponent {
  sections: JuridiqueSection[] = [
    {
      id: "objectifs",
      titleAr: "الأهداف",
      titleFr: "Objectifs",
      isOpen: true,
      contentAr: [
        "الدفاع عن حقوق المهنيين",
        "تنظيم القطاع",
        "رفع مستوى التكوين",
        "توفير المعدات بأسعار منخفضة",
        "خلق فرص عمل",
        "تنفيذ المشاريع الكبرى باسم التعاونية"
      ]
    },
    {
      id: "adhesion",
      titleAr: "شروط الانخراط",
      titleFr: "Conditions d'adhésion",
      isOpen: false,
      contentAr: [
        "المهن المعنية: كهربائي، شركة كهرباء، مختص في الطاقة الشمسية، مختص كاميرات مراقبة، مختص إنذار ضد السرقة، مختص منازل ذكية، تقني صيانة كهربائية، طالب متخرج حديثاً.",
        "الوثائق والشروط المطلوبة:",
        "- نسخة من بطاقة التعريف الوطنية",
        "- سجل تجاري (إن وجد)",
        "- شهادة تكوين أو خبرة",
        "- الالتزام بالقانون الداخلي",
        "- دفع معلوم الانخراط"
      ]
    },
    {
      id: "structure",
      titleAr: "الهيكل الإداري",
      titleFr: "Structure administrative",
      isOpen: false,
      contentAr: [
        "أمين المال",
        "لجان متخصصة:",
        "- لجنة التكوين",
        "- لجنة المشاريع",
        "- لجنة السلامة",
        "- لجنة الشراءات",
        "- لجنة فض النزاعات",
        "- لجنة الإعلام والتكنولوجيا"
      ]
    },
    {
      id: "financement",
      titleAr: "التمويل",
      titleFr: "Financement",
      isOpen: false,
      contentAr: [
        "مصادر التمويل:",
        "- معلوم الانخراط",
        "- نسبة بسيطة من المشاريع"
      ]
    },
    {
      id: "services",
      titleAr: "الخدمات",
      titleFr: "Services",
      isOpen: false,
      contentAr: [
        "بطاقة مهنية لكل عضو",
        "منصة إلكترونية",
        "تطبيق جوال",
        "عقود نموذجية",
        "تأمين جماعي",
        "شراء جماعي للمعدات",
        "تكوينات وشهادات",
        "بنك معلومات للأسعار"
      ]
    },
    {
      id: "reglement",
      titleAr: "النظام الداخلي",
      titleFr: "Règlement intérieur",
      isOpen: false,
      contentAr: [
        "يشمل النظام الداخلي:",
        "- حقوق الأعضاء",
        "- واجبات الأعضاء",
        "- العقوبات"
      ]
    }
  ];

  toggleSection(section: JuridiqueSection) {
    // Optionally close others
    // this.sections.forEach(s => { if(s.id !== section.id) s.isOpen = false; });
    section.isOpen = !section.isOpen;
  }
}
