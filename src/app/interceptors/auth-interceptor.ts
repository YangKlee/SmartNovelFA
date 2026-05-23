import {
  HttpInterceptorFn
} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // check browser
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null;

  // có token thì gắn
  if (token) {

    req = req.clone({

      setHeaders: {
        Authorization: `Bearer ${token}`
      }

    });

  }

  return next(req);
};