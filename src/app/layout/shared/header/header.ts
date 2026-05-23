import { Component, OnInit } from '@angular/core';
import { AuthServices } from '../../../services/auth/auth-services';
import { CommonModule } from "@angular/common";
import { of, BehaviorSubject } from "rxjs"
import { User } from '../../../models/user/user.model';
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  public user$ = new BehaviorSubject<User | null>(null);
  constructor(private authServices: AuthServices) { }
  ngOnInit() {
    this.authServices.loadInfoUserLogined()?.subscribe(
      e => {
        this.user$.next(e);
      }
    )
  }
}
