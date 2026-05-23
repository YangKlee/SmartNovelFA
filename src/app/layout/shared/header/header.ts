import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthServices } from '../../../services/auth/auth-services';
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { BehaviorSubject } from "rxjs"
import { User } from '../../../models/user/user.model';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [CommonModule, MatButtonModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  public user$ = new BehaviorSubject<User | null>(null);
  constructor(private authServices: AuthServices, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.authServices.loadInfoUserLogined()?.subscribe(
        e => {
          this.user$.next(e);
        }
      )
    }

  }
  doLogout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("token");
      this.user$.next(null); // Cập nhật lại giao diện ngay lập tức

    }
    this.router.navigate(['/auth/login']); // đá về login
  }

  logibBtn() {
    this.router.navigate(['/auth/login']); // đá về login
  }
}
