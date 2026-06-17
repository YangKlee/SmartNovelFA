import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.html',
  styleUrl: './login-callback.css'
})
export class LoginCallback implements OnInit {
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', token);
        }
        // Đăng nhập thành công -> về trang chủ
        this.router.navigate(['/']);
      } else {
        // Lỗi -> về trang đăng nhập
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
