import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.html',
  styleUrl: './login-callback.css'
})
export class LoginCallback implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        localStorage.setItem('token', token);
        // Đăng nhập thành công -> về trang chủ
        this.router.navigate(['/']);
      } else {
        // Lỗi -> về trang đăng nhập
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
