import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthServices } from '../services/auth/auth-services';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authServices = inject(AuthServices);
  const platformId = inject(PLATFORM_ID);

  const allowedRoles = route.data['requiredRoles'] as string[];
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  return authServices.checkLogin().pipe(
    map((res) => {
      const userRole = res.Role || res.role;

      if (allowedRoles && allowedRoles.includes(userRole)) {
        return true;
      }

      console.warn('Lỗi phân quyền: Role của bạn là "' + userRole + '" nhưng trang này yêu cầu: ' + allowedRoles.join(', '));
      router.navigate(['/auth/login']);
      return false;
    }),
    catchError((err) => {
      console.error('Lỗi gọi API checkLogin (Có thể token sai, hoặc API bị lỗi 401/404):', err);
      router.navigate(['/auth/login']);
      return of(false);
    })
  );
};
