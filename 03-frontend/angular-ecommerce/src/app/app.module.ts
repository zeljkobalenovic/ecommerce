import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';

import { RouterModule,Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';

const routes:Routes = [
    {path:"cart-detail" , component:CartDetailComponent},
    {path:"search/:keyword" , component:ProductListComponent},
    {path:"category/:id" , component:ProductListComponent},
    {path:"products/:id" , component:ProductDetailsComponent},
    {path:"category" , component:ProductListComponent},
    {path:"products" , component:ProductListComponent},
    {path:"" , redirectTo:"/products" , pathMatch:"full"},
    {path:"**" , redirectTo:"/products" , pathMatch:"full"}
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ProductService ,CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
