import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl +'/products'
  constructor(private http: HttpClient) { }

  getProducts(): Observable<HttpResponse<Product[]>> {

    return this.http.request<Product[]>('GET',`${this.apiUrl}`,{observe: 'response'});
  }

  addProduct(product: Product ): Observable<HttpResponse<Product>> {
    return this.http.request('POST',`${this.apiUrl}/product/add`,{body: product, observe: 'response'});
  }

  getProductById(id:number): Observable<HttpResponse<Product>> {
    return this.http.request('GET',`${this.apiUrl}/product/${id}`,{observe: 'response'});
  }


  updateProduct(product: Product ): Observable<HttpResponse<Product>> {
    return this.http.request('PATCH',`${this.apiUrl}/product/edit/${product.id}`,{body: product, observe: 'response'});
  }
}
