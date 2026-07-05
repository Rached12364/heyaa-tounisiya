import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
@Component({
  selector: "app-entreprise-detail",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./entreprise-detail.component.html",
  styleUrl: "./entreprise-detail.component.scss"
})
export class EntrepriseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  entreprise: any = null;
  nomSlug = "";
  ngOnInit() {
    this.nomSlug = this.route.snapshot.paramMap.get("nom") || "";
  }
}
