import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup : FormGroup;
  totalQuantity : number = 0;
  totalPrice : number = 0;

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit() { 
    this.checkoutFormGroup = this.formBuilder.group({
      customer : this.formBuilder.group({
        firstName : [''],
        lastName : [''],
        email : ['']
      }),
      shippingAddress : this.formBuilder.group({
        state : [''],
        city : [''],
        country : [''],
        street : [''],
        zipCode : ['']
      }),
      billingAddress : this.formBuilder.group({
        state : [''],
        city : [''],
        country : [''],
        street : [''],
        zipCode : ['']
      }),
      creditCard : this.formBuilder.group({
        cardType : [''],
        nameOnCard : [''],
        cardNumber : [''],
        securityCode : [''],
        expirationMonth : [''],
        expirationYear : ['']
      }),
    });
  }

  onSubmit() {
    console.log("Handling submit button click :");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("Email is :" + this.checkoutFormGroup.get('customer').value.email );
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked ) {
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }
    
}
