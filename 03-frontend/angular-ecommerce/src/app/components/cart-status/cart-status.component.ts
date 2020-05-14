import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice : number = 0;
  totalQuantity : number = 0;

  constructor(private cartService : CartService) { }

  ngOnInit() {
    // u initu se subscribuje na pracenje publisha
    this.cartService.totalPrice.subscribe(data => this.totalPrice=data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity=data);
    // ubuduce stalno prati promene ove dve vrednost
    // sta sa unsubscribe ( trebalo bi u onDestroy componente )
  }

}
