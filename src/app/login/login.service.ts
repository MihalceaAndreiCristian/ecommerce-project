import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Login} from "../models/login";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  doLogin(body: Login): Observable<HttpResponse<Object>> {
    return this.http.post(`${this.apiUrl}/login`, body, {observe: 'response'});
  }


}
