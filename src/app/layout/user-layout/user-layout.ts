import { Component } from '@angular/core';
import { Header } from "../shared/header/header";
import { RouterLink, RouterOutlet } from "@angular/router";
import { FooterComponent } from "../shared/footer/footer";

@Component({
  selector: 'app-user-layout',
  imports: [Header, RouterOutlet,RouterLink, FooterComponent],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css',
})
export class UserLayout {

}
