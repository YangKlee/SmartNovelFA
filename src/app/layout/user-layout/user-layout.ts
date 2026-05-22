import { Component } from '@angular/core';
import { Header } from "../shared/header/header";
import { RouterOutlet } from "@angular/router";
import { Footer } from "../shared/footer/footer";

@Component({
  selector: 'app-user-layout',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css',
})
export class UserLayout {

}
