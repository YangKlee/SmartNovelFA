import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from "../../models/user/user.model"
import { LoginRespone } from "../../models/auth/login-respone"
import { Login } from '../../component/auth/login/login';
import { environment } from "../../env"
@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json"
    }),
  };

  private URL_AUTH = `${environment.apiUrl}/Auth`

  private userSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.userSubject.asObservable();

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }
  public login(txtUsername: string, txtPassword: string): Observable<LoginRespone> | Observable<any> {
    return this.httpClient.post<any>(
      `${this.URL_AUTH}/Login`,
      {
        username: txtUsername,
        password: txtPassword
      },
      this.httpOptions
    );
  }
  loadInfoUserLogined(): Observable<User> {
    return this.httpClient.get<User>(`${this.URL_AUTH}/profile`);
  }

  // public saveCacheUserLogined() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.loadInfoUserLogined().subscribe(
  //       {
  //         next: (user) => {
  //           sessionStorage.setItem('userObj', JSON.stringify(user));
  //           this.userSubject.next(user);
  //         }
  //       }
  //     )
  //   }
  // }

  // getUserLogined(): Observable<User | null> {
  //   if (isPlatformBrowser(this.platformId)) {
  //     const userRaw = sessionStorage.getItem("userObj");
  //     if (userRaw == null && localStorage.getItem("token")) {
  //       //this.saveCacheUserLogined();
  //     }
  //   }
  //   return this.currentUser$;
  // }
}
