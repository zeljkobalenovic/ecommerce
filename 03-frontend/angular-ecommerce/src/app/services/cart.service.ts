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
    this.computeCartTotals();     
  }

  decrementQuantity(cartItem: CartItem) {
    // svakako ga ima u nizu - znaci nadje se item po item.id i promeni mu se quantity-- 
    let itemIndex : number = this.cartItems.findIndex((item) => item.id === cartItem.id);
    // kad ga nadje imam index elementa niza 
    // ako je kolicina veca od 1 smanjujem za 1
    if (this.cartItems[itemIndex].quantity > 1) {
      this.cartItems[itemIndex].quantity--;
    } else {
     // ako je kolicina 1 izbacujem taj element niza ( posle smanjenja kolicina 0)  
      this.cartItems.splice(itemIndex,1);
    } 
    // na kraju izracunaj ponovo totale
    this.computeCartTotals();
  }

  removeItem(cartItem: CartItem) {
    // isto kao kod decrement quantity samo sto odmah eliminisem ceo item
    let itemIndex : number = this.cartItems.findIndex((item) => item.id === cartItem.id);
    // sad odmah taj izbacijem 
    this.cartItems.splice(itemIndex,1);
    // i ponovo racunam totale
    this.computeCartTotals();
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
