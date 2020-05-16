import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  cartItems : CartItem [] = [];
  totalPrice : number = 0;
  totalQuantity : number = 0;

  constructor(private cartService : CartService) { }

  ngOnInit() {
    this.listCartItems();
  }

  listCartItems() {
    // 1 get cartitems from service
    this.cartItems=this.cartService.cartItems;
    // 2+3 subscribe for totals in service
    this.cartService.totalPrice.subscribe(data => this.totalPrice=data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity=data);
    // 4 zovi metodu servisa da izracuna totale
    this.cartService.computeCartTotals();
  }

  incrementQuantity(cartItem:CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem:CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }

  removeItem(cartItem:CartItem) {
    this.cartService.removeItem(cartItem);
  }

}
