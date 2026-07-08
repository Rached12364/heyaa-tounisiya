import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Evenement, EVENEMENTS_MOCK } from "../evenement/evenement";

@Component({
  selector: "app-evenement-detail",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./evenement-detail.component.html",
  styleUrl: "./evenement-detail.component.scss"
})
export class EvenementDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  evenement: Evenement | undefined;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get("id");
      if (idParam) {
        const id = parseInt(idParam, 10);
        this.evenement = EVENEMENTS_MOCK.find(e => e.id === id);
      }
    });
  }
}
