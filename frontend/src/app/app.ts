import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { LanguageService } from "./core/services/language.service";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styleUrl: "./app.scss"
})
export class App implements OnInit {
  constructor(private languageService: LanguageService) {}
  ngOnInit(): void {
    this.languageService.init();
  }
}
