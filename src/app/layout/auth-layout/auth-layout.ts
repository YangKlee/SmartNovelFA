import { Component } from '@angular/core';
import { Login } from "../../component/auth/login/login";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-auth-layout',
  imports: [Login, RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {

}
