import { Component } from '@angular/core';
import { Header } from "../shared/header/header";
import { RouterLink, RouterOutlet } from "@angular/router";
import { FooterComponent } from "../shared/footer/footer";
import { PageControlHelper } from '../../component/common/page-control-helper/page-control-helper';

@Component({
  selector: 'app-user-layout',
  imports: [Header, RouterOutlet,RouterLink, FooterComponent, PageControlHelper],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css',
})
export class UserLayout {

}
