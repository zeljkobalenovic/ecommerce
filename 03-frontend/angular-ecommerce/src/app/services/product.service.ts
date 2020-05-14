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

  // product list po category id BEZ paginacije
  getProductList(categoryId : number) : Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
    return this.getProducts(searchUrl);
  }

  // product list po category id SA paginacije
  getProductListPaginate(categoryId : number, thePage:number , thePageSize:number) : Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${thePage}&size=${thePageSize}`;
    // vracamo ceo objekat listu produkata + pagination podatke
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  searchProducts(keyword: string) : Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`
    return this.getProducts(searchUrl);
  }

  // search products SA paginacijom
  searchProductsPaginate(keyword: string, thePage:number , thePageSize:number) : Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${thePage}&size=${thePageSize}`;
    // vracamo ceo objekat listu produkata + pagination podatke
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  // ova metoda za listu producata po categoryid ( ili categoryid=1 default kad ga nema), i po keyword
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(data => data._embedded.products));
  }

  getProductCategories() : Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(data => data._embedded.productCategory)
    );
  }

  getProduct(theProductId: number) : Observable<Product> {
    // za razliku od kolekcija pojedinacni domen objekti nisu wrapovani u spring data rest pa nema pretvaranja
    return this.httpClient.get<Product>(`${this.baseUrl}/${theProductId}`)
  }
  
  
}




// zbog data rest (backend json products je upakovan u _embeded pa nemoze direktno iz response bodyja)
interface GetResponseProducts {
  _embedded : {
    products : Product[];
  } ,
  // dodajemo i objekat paginacije koji takodje stize sa spring data rest (treba za paginaciju)
  page : {
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}

// zbog data rest (backend json products je upakovan u _embeded pa nemoze direktno iz response bodyja)
interface GetResponseProductCategory {
  _embedded : {
    productCategory : ProductCategory[];
  }
}
