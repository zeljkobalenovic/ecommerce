import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient : HttpClient) { }

  /* ovako isto moze stavis povretni tip na any - cistije preko interfejsa
  getProductList() : Observable<Product[]> {
    return this.httpClient.get<any>(this.baseUrl).pipe(
      map(data => data._embedded.products)
    );
  }*/

  getProductList() : Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(data => data._embedded.products)
    );
  }
}

// zbog data rest (backend json products je upakovan u _embeded pa nemoze direktno iz response bodyja)
interface GetResponse {
  _embedded : {
    products : Product[];
  }
}
