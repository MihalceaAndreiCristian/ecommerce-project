import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {getAuthToken} from "../util/utils";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let handleNextStep: Observable<HttpEvent<any>>;
    if (req.url.includes("/login")) {
      handleNextStep = next.handle(req);
    } else {
      const token = getAuthToken();
      console.log(token);
      if (token) {
        const cloned = req.clone({
          setHeaders: {
            'Authorization': token,
            'Content-Type': 'application/json',
          }
        });
        handleNextStep = next.handle(cloned);
      } else {
        handleNextStep = next.handle(req);
      }
    }
    return handleNextStep
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            alert('Sesiunea a expirat! Veți fi delogat.'); // Notificare pentru user
            this.router.navigate(['/login']); // Redirecționează spre pagina de login
          }
          return throwError(() => error);
        })
      );

  }
}
