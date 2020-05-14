import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems : CartItem[] = [];
  totalPrice : Subject<number> = new Subject<number>();
  totalQuantity : Subject<number> = new Subject<number>();

  constructor() { }

  addToCart( cartItem : CartItem) {
    // ako proizvod postoji u korpi povecaj quantity za 1 , ako ne dodaj novi proizvod
    let itemFounded : boolean = false ;   
    
    // ako je korpa prazna svakako dodajemo item , ako ne ispitujemo dali postoji taj proizvod 
    if (this.cartItems.length > 0) {
      /*
      for (let item of this.cartItems) {
        if ( item.id === cartItem.id) {
          // ako ga nadje povecava quantity za 1 , oznaci da je nadjen true i izdje iz petlje
          itemFounded = true;
          item.quantity++;
          break;
        }        
      }
      drugi nacin sa ugradjenom funkcijom find za nizove - pronalazi ulemenat niza po kriterijumu 
      ako ga nadje vraca elemenat , ako ne vraca undefined 
      */ 
      let itemFind : CartItem = this.cartItems.find(item => (item.id === cartItem.id));
      if (itemFind) {
        itemFind.quantity++;
        itemFounded=true;
      }   
    }    
    // ako nije nadjen ili je niz prazan doda ga u niz
    if (!itemFounded) {
      this.cartItems.push(cartItem);
    }
    // na kraju izracunaj nove totale
    this.computeCartTotals()     
  }

  computeCartTotals() {
    let totalPriceValue : number = 0;
    let totalQuantityValue : number = 0;
    for (let item of this.cartItems) {
      totalPriceValue += item.quantity*item.unitPrice;
      totalQuantityValue += item.quantity;
    }
    // kad ih izracunam publish
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    // loguj na consolu
    this.logCartData(totalPriceValue,totalQuantityValue);
  }
  logCartData(totalPriceValue:number , totalQuantityValue:number) {
    console.log("Cart data :");
    for (let item of this.cartItems) {
      let subtotal : number = item.quantity*item.unitPrice;
      console.log(`Name : ${item.name} -> Quantity : ${item.quantity} -> Price : ${item.unitPrice} -> Subtotal : ${subtotal}`);
    }
    console.log(`TotalQuantity :${totalQuantityValue} TotalPrice :${totalPriceValue.toFixed(2)}`);
    console.log("------------------");
  }
}
