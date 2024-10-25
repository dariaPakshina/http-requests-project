import {HttpInterceptorFn} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({headers: req.headers.append('Auth', 'xyz')});
  return next(modifiedReq);
};
