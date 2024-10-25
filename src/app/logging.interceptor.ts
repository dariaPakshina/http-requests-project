import {HttpInterceptorFn, HttpEventType} from '@angular/common/http';
import {tap} from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Outgoing request');
  console.log(req.url);

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log('Incoming response');
        console.log(event.body);
      }
    })
  );
};
