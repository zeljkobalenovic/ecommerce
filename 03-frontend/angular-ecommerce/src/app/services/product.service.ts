import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient : HttpClient) { }

  /* ovako isto moze stavis povretni tip na any - cistije preko interfejsa
  getProductList() : Observable<Product[]> {
    return this.httpClient.get<any>(this.baseUrl).pipe(
      map(data => data._embedded.products)
    );
  }*/

  getProductList(categoryId : number) : Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
    return this.getProducts(searchUrl);
  }

  searchProducts(keyword: string) : Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(data => data._embedded.products));
  }

  getProductCategories() : Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(data => data._embedded.productCategory)
    );
  }

  
  
}




// zbog data rest (backend json products je upakovan u _embeded pa nemoze direktno iz response bodyja)
interface GetResponseProducts {
  _embedded : {
    products : Product[];
  }
}

// zbog data rest (backend json products je upakovan u _embeded pa nemoze direktno iz response bodyja)
interface GetResponseProductCategory {
  _embedded : {
    productCategory : ProductCategory[];
  }
}
