import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { BehaviorSubject, forkJoin } from "rxjs";
import { Router, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { AuthServices } from '../../../services/auth/auth-services';
import { MenuNavServices } from '../../../services/menu-nav/menu-nav-services';

import { User } from '../../../models/user/user.model';
import { MenuNav } from '../../../models/menu-nav/menu-nav.model';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  public user$ = new BehaviorSubject<User | null>(null);

  // menu thanh navbar
  menus: MenuNav[] = [];

  // menu role đặc biệt
  roleMenus: MenuNav[] = [];

  constructor(
    private authServices: AuthServices,
    private menuNavServices: MenuNavServices,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {

      // navbar luôn load role 4
      this.loadPublicMenu();

      this.authServices.loadInfoUserLogined()?.subscribe(user => {

        this.user$.next(user);

    if (user?.roleId) {
      this.loadRoleMenu(user.roleId);
    }

      });
    }
  }

  // MENU THANH NAVBAR
  loadPublicMenu() {

    this.menuNavServices.getMenuByRole("4")
      .subscribe(res => {

        this.menus = res;

      });
  }

  // MENU ROLE
  loadRoleMenu(roleId: string) {

    // admin
    if (roleId == "1") {

      forkJoin({
        m3: this.menuNavServices.getMenuByRole("3"),
        m2: this.menuNavServices.getMenuByRole("2"),
        m1: this.menuNavServices.getMenuByRole("1")
      }).subscribe(({ m3, m2, m1 }) => {

        this.roleMenus = [
          ...m3,
          ...m2,
          ...m1
        ];

      });

    }

    // moderator
    else if (roleId == "2") {

      this.menuNavServices.getMenuByRole("2")
        .subscribe(res => {

          this.roleMenus = res;

        });

    }

    // author
    else if (roleId == "3") {

      this.menuNavServices.getMenuByRole("3")
        .subscribe(res => {

          this.roleMenus = res;

        });

    }

    else {
      this.roleMenus = [];
    }
  }

  doLogout() {

    if (isPlatformBrowser(this.platformId)) {

      localStorage.removeItem("token");

      this.user$.next(null);

      this.roleMenus = [];
    }

    this.router.navigate(['/auth/login']);
  }

  logibBtn() {
    this.router.navigate(['/auth/login']);
  }
}