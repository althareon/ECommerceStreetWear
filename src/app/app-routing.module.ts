import { NgModule } from '@angular/core';

import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from "./home";
import { ProfileComponent } from "./profile";
import { ProductComponent } from "./product/product.component";
import { ProductDetailComponent } from "./product-detail";
import { CartComponent } from "./cart";
import { OrderComponent } from "./order";
import { BuyTransactionComponent } from "./buy-transaction";
import { SellTransactionComponent } from "./sell-transaction";
import { EditProfileComponent } from "./edit-profile";
import { TransactionDetailComponent } from "./transaction-detail";
import { OrderDetailComponent } from "./order-detail";
import { AboutComponent } from './about';

export const routes: Routes = [
  { path:'', redirectTo:'home', pathMatch:'full' },
  { path: 'home', component : HomeComponent,
  children:[
    { path: '', component: ProductComponent },
    { path: 'about', component: AboutComponent},
    { path: 'profile', component: ProfileComponent,
      children:[
        {path:'', component: EditProfileComponent},
        {path:'buyTransaction', component:BuyTransactionComponent},
        {path:'sellTransaction', component:SellTransactionComponent},
        {path:'transactionDetail', component: TransactionDetailComponent}

      ] },
    { path: 'productDetail', component: ProductDetailComponent },
    { path: 'cart', component: CartComponent },
    { path: 'order', component: OrderComponent},
    { path: 'order/orderDetail', component : OrderDetailComponent}
    
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [ 
  HomeComponent,
  ProfileComponent,
  ProductComponent,
  CartComponent,
  ProductDetailComponent,
  OrderComponent,
  EditProfileComponent,
  BuyTransactionComponent,
  SellTransactionComponent,
  TransactionDetailComponent,
  OrderDetailComponent,
  AboutComponent
];
