import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons/dist';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { routes } from './/app-routing.module';
import { DataFilterPipe, FilterPipe } from "./dataFilter";
import { DataTableModule} from "angular2-datatable";
import {NgxPaginationModule} from 'ngx-pagination';


import { HomeComponent, 
  LoginDialogOverview, 
  RegisterDialogOverview, 
  LoginSuccessDialog,
  RegisterSuccessDialog,
  TermsAndConditionDialog} from './home/home.component';
import { ProductDetailComponent, 
          AddToCartConfirmationDialog,
          AddToCartSuccessDialog,
          AddSellTransactionDialog,
        SellTransactionSuccessDialog,
      LoginDialogOverview2,
      LoginSuccessDialog2, 
      UpdateRekAddressDialog } from './product-detail/product-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductComponent } from './product/product.component';
import { CartComponent, 
  DeleteFromCartConfirmationDialog, 
  SuccessDialog,
CheckoutConfirmationDialog,
UpdateRekAddressDialog2 } from './cart/cart.component';
import { OrderComponent } from './order/order.component';

import { LoginService, LoginFailedDialog } from "./services/login.service";
import { RegisterService, RegisterFailedDialog } from "./services/register.service";
import { GetAllSellTransactionService } from "./services/getAllSellTransaction.service";
import { GetAllSellTransWithoutBuyerService } from "./services/getAllSellTransWithoutBuyer.service";
import { GetAllBuyTransactionService } from "./services/getAllBuyTransaction.service";
import { GetAllSellTransWIBuyerSellerService } from "./services/getAllSellTransWIBuyer.service";
import { GetTransactionByProductService } from "./services/getTransactionByProduct.service";
import { GetProductByNameService } from "./services/getProductByName.service";
import { GetTransactionByProductAndSellerService } from "./services/getTransactionByProductAndSeller.service";
import { AddToCartService } from "./services/addToCart.service";
import { GetActiveTransactionByProductNSellerService } from "./services/getActiveTransactionByProduct.service";
import { AddSellTransactionService } from "./services/addSellTransaction.service";
import { GetAllProductService } from "./services/getAllProduct.service";
import { GetAllProductByCategoryService } from "./services/getAllProductByCategory.service";
import { GetAllProductByBrandService } from "./services/getAllProductByBrand.service";
import { GetAllProductByNameService } from "./services/getAllProductByName.service";
import { GetCheckOutByIdService } from "./services/getCheckOutById.service";
import { GetCheckOutByEmailService } from "./services/getCheckOutByEmail.service";
import { GetUserDetailService } from "./services/getUserDetail.service";
import { UpdateAddressService } from "./services/updateAddress.service";
import { UpdateRekeningService } from "./services/updateRekening.service";
import { DeleteFromCartService } from "./services/deleteFromCart.service";
import { GetHistorySellTransactionService } from "./services/getHistorySellTransaction.service";
import { GetHistoryBuyTransactionService } from "./services/GetHistoryBuyTransaction.service";
import { GetTransactionDetailService } from "./services/getTransactionDetail.service";
import { CheckOutService } from "./services/checkOut.service";
import { UpdateBuyerEmailService } from "./services/updateBuyerEmail.service";
import { UpdateCheckoutIdService } from "./services/updateCheckOutId.service";
import { GetTransactionByCheckoutIdService } from "./services/getTransactionByCheckoutId.service";
import { InputPaymentConfirmationService } from "./services/inputPaymentConfirmation.service";
import { SellerConfirmService } from "./services/sellerConfirm.service";
import { SellerRejectService } from "./services/sellerReject.service";
import { InputTrackingNumberToAdminService } from "./services/inputTrackingNumberToAdmin.service";
import { ConfirmReceivedProductService } from "./services/confirmReceivedProduct.service";
import { UpdateOverallStatusService } from "./services/updateOverallStatus.service";
import { GetHistoryOrderByEmailService } from "./services/getHistoryOrderByEmail.service";

import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OrderModule } from 'ngx-order-pipe';
import { SellTransactionComponent } from './sell-transaction/sell-transaction.component';
import { BuyTransactionComponent } from './buy-transaction/buy-transaction.component';
import { EditProfileComponent, 
  UpdateAddressDialog, 
  SuccessProfileDialog, 
  UpdateRekeningDialog} from './edit-profile/edit-profile.component';
import { TransactionDetailComponent,
ConfirmSellerDialog,
SuccessConfirmSellerDialog,
InputTrackingNumberToAdminDialog, 
DeleteTransactionDialog} from './transaction-detail/transaction-detail.component';

import { OrderDetailComponent,
  ConfirmPaymentDialog,
SuccessPaymentConfirmDialog ,
ConfirmReceivedProductDialog,
SuccessReceivedDialog} from './order-detail/order-detail.component';
import { AboutComponent } from './about/about.component';
import { DeleteSellTransactionService } from './services/deleteSellTransaction.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LoginDialogOverview,
    RegisterDialogOverview,
    LoginSuccessDialog,
    LoginFailedDialog,
    RegisterSuccessDialog,
    RegisterFailedDialog,
    ProductComponent,
    ProductDetailComponent,
    AddToCartConfirmationDialog,
    AddToCartSuccessDialog,
    AddSellTransactionDialog,
    SellTransactionSuccessDialog,
    LoginDialogOverview2,
    LoginSuccessDialog2,
    DataFilterPipe,
    CartComponent,
    OrderComponent,
    DeleteFromCartConfirmationDialog, 
    SuccessDialog ,
    FilterPipe,
    SellTransactionComponent,
    BuyTransactionComponent,
    EditProfileComponent,
    UpdateAddressDialog,
    SuccessProfileDialog,
    UpdateRekeningDialog,
    UpdateRekAddressDialog,
    TransactionDetailComponent,
    CheckoutConfirmationDialog,
    OrderDetailComponent,
    ConfirmPaymentDialog,
    SuccessPaymentConfirmDialog,
    ConfirmSellerDialog,
    SuccessConfirmSellerDialog,
    InputTrackingNumberToAdminDialog,
    ConfirmReceivedProductDialog,
    SuccessReceivedDialog,
    UpdateRekAddressDialog2,
    TermsAndConditionDialog,
    AboutComponent,
    DeleteTransactionDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes), 
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,
    Angular2PromiseButtonModule.forRoot(),
    DataTableModule,
    NgxPaginationModule,
    TextMaskModule,
    NgxSpinnerModule,
    OrderModule
  ],
  entryComponents: [
    LoginDialogOverview, 
    RegisterDialogOverview,
    LoginSuccessDialog,
    LoginFailedDialog,
    RegisterSuccessDialog,
    RegisterFailedDialog,
    AddToCartConfirmationDialog,
    AddToCartSuccessDialog,
    AddSellTransactionDialog,
    SellTransactionSuccessDialog,
    LoginDialogOverview2,
    LoginSuccessDialog2,
    DeleteFromCartConfirmationDialog, 
    SuccessDialog ,
    UpdateAddressDialog,
    SuccessProfileDialog,
    UpdateRekeningDialog,
    UpdateRekAddressDialog,
    CheckoutConfirmationDialog,
    ConfirmPaymentDialog,
    SuccessPaymentConfirmDialog,
    ConfirmSellerDialog,
    SuccessConfirmSellerDialog,
    InputTrackingNumberToAdminDialog,
    ConfirmReceivedProductDialog,
    SuccessReceivedDialog,
    UpdateRekAddressDialog2,
    TermsAndConditionDialog,
    DeleteTransactionDialog
  ],
  providers: [
    LoginService,
    RegisterService,
    GetAllSellTransactionService,
    GetAllBuyTransactionService,
    GetAllSellTransWithoutBuyerService,
    GetAllSellTransWIBuyerSellerService,
    GetAllProductService,
    GetAllProductByCategoryService,
    GetAllProductByBrandService,
    GetTransactionByProductService,
    GetProductByNameService,
    GetTransactionByProductAndSellerService,
    GetActiveTransactionByProductNSellerService,
    AddToCartService,
    AddSellTransactionService,
    GetCheckOutByIdService,
    GetUserDetailService,
    UpdateAddressService, 
    UpdateRekeningService,
    GetCheckOutByEmailService,
    DeleteFromCartService,
    GetAllProductByNameService,
    GetHistorySellTransactionService,
    GetHistoryBuyTransactionService,
    GetTransactionDetailService,
    CheckOutService,
    UpdateBuyerEmailService,
    UpdateCheckoutIdService,
    GetTransactionByCheckoutIdService,
    InputPaymentConfirmationService,
    SellerConfirmService,
    SellerRejectService,
    InputTrackingNumberToAdminService,
    ConfirmReceivedProductService,
    UpdateOverallStatusService,
    GetHistoryOrderByEmailService,
    DeleteSellTransactionService
    
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
