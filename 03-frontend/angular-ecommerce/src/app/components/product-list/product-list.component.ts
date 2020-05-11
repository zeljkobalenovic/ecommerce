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

  products : Product [];
  currentCategoryId : number;
  searchMode : boolean;
  
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
    // sad zovi metodu servisa koja nalazi produkte po keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data=> {
        this.products=data;
      }
    );

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
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => this.products=data        
    );

  }

}

