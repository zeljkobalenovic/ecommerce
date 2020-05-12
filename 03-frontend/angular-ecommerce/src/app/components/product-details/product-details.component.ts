import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  // produkt dolazi sa apija asinhrono , ako ga ne definisemo (ovde kao prazan product) html ce prvo imati 
  // undefined product , sve dok nestigne sa apija pravi ( bice brzo pa korisnik nista neprimecuje ), ali
  // browswer baca gresku - zato ga treba definisati ( ili safe operator u html ? ako je null ili undefined 
  // nikom nista nebaca gresku product?.imageUrl npr ). Ovo resenje jednostavnije. 
  product:Product=new Product();

  constructor(private productService : ProductService ,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(()=> {
      this.handleProductDetails()
    });
  }

  handleProductDetails() {
    // prikupi iz rute id producta - ona konverzija string -> number
    const theProductId : number = +this.route.snapshot.paramMap.get('id');
    // zovi metodu servisa koja vraca tog producta
    this.productService.getProduct(theProductId).subscribe(
      data=>this.product=data
    );
  }

}
