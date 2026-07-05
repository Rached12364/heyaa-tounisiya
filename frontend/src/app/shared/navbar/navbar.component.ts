import { CommonModule } from "@angular/common";
import { Component, HostBinding, OnDestroy, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss"
})
export class NavbarComponent implements OnInit, OnDestroy {
  @HostBinding("class.scrolled") scrolled = false;
  ngOnInit(): void {
    if (typeof window !== "undefined") {
      this.onScroll();
      window.addEventListener("scroll", this.onScroll, { passive: true });
    }
  }
  ngOnDestroy(): void {
    if (typeof window !== "undefined") {
      window.removeEventListener("scroll", this.onScroll);
    }
  }
  private onScroll = (): void => {
    this.scrolled = window.scrollY > 30;
  };
}
