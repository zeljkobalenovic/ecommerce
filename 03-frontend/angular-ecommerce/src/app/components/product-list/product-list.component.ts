import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product [];
  
  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.listProducts();
  }

  listProducts() {
    let product1 = new Product();
    this.productService.getProductList().subscribe(
      data => this.products=data        
    );
  }

}

