import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, EMPTY, Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {getAuthToken} from "../util/utils";
import {ModalService} from "../product/modal-product/modal.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private modalService:ModalService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let handleNextStep: Observable<HttpEvent<any>>;
    if (req.url.includes("/login")) {
      handleNextStep = next.handle(req);
    } else {
      const token = getAuthToken();
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
          this.modalService.closeModal();
          if (error.status === 401) {
            // alert('Sesiunea a expirat! Veți fi delogat.'); // Notificare pentru user
            this.router.navigate(['/login']); // Redirecționează spre pagina de login
          }
          if (error.status === 403) {
            console.error(error);
          }
          // return throwError(() => error);
          return EMPTY;
        })
      );

  }
}
