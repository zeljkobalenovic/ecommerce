import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product [] = [];
  previousCategoryId : number = 1;
  currentCategoryId : number = 1;
  searchMode : boolean = false;
  previousKeyword : string = null;
  // properties for pagination
  thePageNumber:number = 1;
  thePageSize:number = 5;
  theTotalElements:number =0;
  
  constructor(private productService : ProductService ,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(()=> {
      this.listProducts();
    });    
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if ( this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }    
  }


  handleSearchProducts() {
    // ima keyworda provereno pre poziva metode
    // izvuci ga - string je pa netreba pretvaranje
    const theKeyword : string = this.route.snapshot.paramMap.get('keyword');

    // sada zbog paginacije proveri dali se keyword promenio - ako jeste prikazuj prvu stranu
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber=1;
    }
    // sacuvaj novi keyword
    this.previousKeyword = theKeyword;
    // sad zovi metodu servisa koja nalazi produkte po keyword
    this.productService.searchProductsPaginate(theKeyword,
                                               this.thePageNumber-1,
                                               this.thePageSize)
                                               .subscribe(this.processResult());     

  }

  handleListProducts() {

    // ima li categoryid
    const hasCategory:boolean = this.route.snapshot.paramMap.has('id');
    // ako ima izvuci ga i pretvori u number i dodeli promenjivoj
    if (hasCategory){
      this.currentCategoryId=+this.route.snapshot.paramMap.get('id');
    } 
    // ako ga nema default ( ovde 1 )
    else {
      this.currentCategoryId=1;
    }

    // sad zovi metodu koja nalazi producte po category id
    // VAZNO !!! ( COMPONENT REUSE )
    // ako se zove isti category id angular nece praviti novu komponentu nego ce koristiti postojecu !!!
    // tj. ostace isti html fajl ( nece ga ponovo renderovati )

    // ako je nova categoryid razlicita od stare treba resetovati stranicu nazad na 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    // sacuvaj categoryid za sledecu stranicu/e
    this.previousCategoryId = this.currentCategoryId;
    // sacuvacu za proveru
    console.log(`currentCategoryId: ${this.currentCategoryId} , currentPage: ${this.thePageNumber}`)

    // sad ide poziv servisne metode sa 3 parametra
    this.productService.getProductListPaginate(this.currentCategoryId,
                                               this.thePageNumber-1,
                                               this.thePageSize )
                                               .subscribe(this.processResult());
  }
  
  processResult() {
    return data=> {
      this.products = data._embedded.products;
      this.thePageSize = data.page.size;
      this.thePageNumber = data.page.number+1;
      this.theTotalElements = data.page.totalElements;
    }
  }
  
  // kad se promeni pagesize
  updatePageSize(pageSize : number) {
      this.thePageSize=pageSize;
      // ponovo prva strana
      this.thePageNumber=1;
      // ponovo se pozove list
      this.listProducts();
  }
  

}

