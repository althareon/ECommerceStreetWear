import { Component, OnInit, ViewChild, Inject, HostListener, style } from '@angular/core';


import { GetTransactionByProductService } from "../services/getTransactionByProduct.service";
import { GetProductByNameService } from "../services/getProductByName.service";
import { AddToCartService } from "../services/addToCart.service";
import { GetTransactionByProductAndSellerService } from "../services/getTransactionByProductAndSeller.service";
import { GetActiveTransactionByProductNSellerService } from "../services/getActiveTransactionByProduct.service";
import { AddSellTransactionService } from "../services/addSellTransaction.service";


import { Transaction } from '../model/transaction';
import { Product } from '../model/product';
import { Cart } from "../model/cart";
import { MatIconRegistry, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { FormControl, Validators } from '@angular/forms';
import {Sort} from '@angular/material';
import { MyErrorStateMatcher } from '../home';
import { User } from '../model/user';
import { LoginService } from '../services/login.service';

import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

const numberMask = createNumberMask({
  prefix: '',
  suffix: '' 
})
@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

@HostListener('window:unload', ['$event'])
export class ProductDetailComponent implements OnInit {

  flag:boolean = false;
  transaksis: Transaction[];
  product : Product[];
  
  ownTransaksis: Transaction[];
  
  sortedData;
  p: number = 1;
  q: number = 1;
  collection: any[] = this.transaksis; 

  constructor(
    public dialog: MatDialog,
    private getTransactionByProductService : GetTransactionByProductService,
    private getProductByNameService: GetProductByNameService,
    private getTransactionByProductAndSellerService : GetTransactionByProductAndSellerService,
    private getActiveTransactionByProductNSellerService: GetActiveTransactionByProductNSellerService,
    private spinner: NgxSpinnerService
  ) {
    
  }


  
  ngOnInit() {

    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 500);
    

    var productName = sessionStorage.getItem("productName");
    var productImage= sessionStorage.getItem("productImage");
    var productBrand = sessionStorage.getItem("productBrand");
    var productCategory = sessionStorage.getItem("productCategory");

    this.getProductByName();
    

    if(sessionStorage.getItem("email") == null){
      this.getTransactionByProduct();
      this.flag = false;
    }else{
      this.getTransactionByProductAndSeller();
      this.getActiveTransBySellerWOBuyer();
      this.flag = true;
    }

    

  }

  unloadHandler(event) {
    window.sessionStorage.clear();
  }

  loginDialog(): void {
    let dialogRef = this.dialog.open(LoginDialogOverview2, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if(sessionStorage.getItem("loginFlag") === "true"){
        
        window.location.reload();
      }

    });
  }


  cartDialog() : void{
    let dialogRef = this.dialog.open(AddToCartConfirmationDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  updateRekAddressDialog() : void{
    let dialogRef = this.dialog.open(UpdateRekAddressDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  confirmDialog(transactionId: string, productImage: string, productName: string, productSize: string,productPrice: number): void {
    sessionStorage.setItem("transactionId",transactionId);
    sessionStorage.setItem("productImage",productImage);
    sessionStorage.setItem("productName",productName);
    sessionStorage.setItem("productSize",productSize);
    sessionStorage.setItem("productPrice", String(productPrice));

    if(sessionStorage.getItem("email") == null){
      this.loginDialog();
    }
    else{
      this.cartDialog();  
    }
  }

  sellDialog(){
    var category = sessionStorage.getItem("productCategory");
    console.log(category);

    if(sessionStorage.getItem("addressDetail") == null || sessionStorage.getItem("namaBank") == null){
      this.updateRekAddressDialog();
    }
    else{
      if(category === "Sneakers"){
        let dialogRef = this.dialog.open(AddSellTransactionDialog, {
          width: '550px',
        });
        dialogRef.afterClosed().subscribe(result => {
          this.getActiveTransBySellerWOBuyer();
        });
      }
      else{
        let dialogRef = this.dialog.open(AddSellTransactionDialog, {
          width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
          this.getActiveTransBySellerWOBuyer();
        });
      }
    }
    
    

   
  }

  getTransactionByProduct(){
    var productName = sessionStorage.getItem("productName");
  

    var serv = this.getTransactionByProductService.getTransactionByProduct(productName);

    serv.subscribe(
      (prTransaksi:Transaction[]) => this.transaksis = prTransaksi
    )
  }

  getTransactionByProductAndSeller(){
    var productName = sessionStorage.getItem("productName");
    

    var email = sessionStorage.getItem("email");

    var serv = this.getTransactionByProductAndSellerService.getTransactionByProductAndSeller(productName, email);

    serv.subscribe(
      (prTransaksi:Transaction[]) => this.transaksis = prTransaksi
    )
  }
  getProductByName(){
    var productName = sessionStorage.getItem("productName");
    

    var serv = this.getProductByNameService.getProductByName(productName);

    serv.subscribe(
      (productDetail:Product[]) => this.product = productDetail
    )
  }

  getActiveTransBySellerWOBuyer(){
    var email = sessionStorage.getItem("email");
    var productName = sessionStorage.getItem("productName");
   
    var serv = this.getActiveTransactionByProductNSellerService.getActiveTransactionByProductAndSeller(email,productName);

    serv.subscribe(
      (prTransaksi:Transaction[]) => this.ownTransaksis = prTransaksi
    )
  }

  sortData(sort: Sort) {
    const data = this.transaksis;
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'date': return this.compare(a.localDateTime, b.localDateTime, isAsc);
        case 'size': return this.compare(a.productSize, b.productSize, isAsc);
        case 'price': return this.compare(+a.productPrice, +b.productPrice, isAsc);
        default: return 0;
      }
    });
  }


    compare(a, b, isAsc) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }



}

@Component({
  templateUrl: './z_addToCartConfirmation.dialog.html',
  styleUrls: ['./z_addToCartConfirmation.dialog.css']
})
export class AddToCartConfirmationDialog implements OnInit {


  carts : Cart[];
  promise: Promise<any>;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddToCartConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private addToCartService: AddToCartService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }

  addToCart(){

    
    var productQuantity = 1;
    var email = sessionStorage.getItem("email");
    var transactionId = sessionStorage.getItem("transactionId");
    var productImage = sessionStorage.getItem("productImage");
    var productName = sessionStorage.getItem("productName");
    var productSize = sessionStorage.getItem("productSize");
    var productBrand = sessionStorage.getItem("productBrand");
    var productCategory = sessionStorage.getItem("productCategory");
    var productPrice = Number(sessionStorage.getItem("productPrice"));

    this.promise = this.addToCartService.addToCart(email,transactionId,productImage,productName,productSize,productBrand, productCategory,productPrice, productQuantity).map(
      (addCart : Cart[]) => this.carts = addCart
    ).toPromise();

   this.successDialog();

  }

  successDialog(){
    this.dialogRef.close();
        let dialogRef = this.dialog.open(AddToCartSuccessDialog, {
          width: '400px',
      });
  }
}


@Component({
  templateUrl: './z_addToCartSuccess.dialog.html',
  styleUrls: ['./z_addToCartSuccess.dialog.css']
})
export class AddToCartSuccessDialog implements OnInit {

  constructor(
   
    public dialogRef: MatDialogRef<AddToCartSuccessDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }

}



@Component({
  templateUrl: './z_addSellTransaction.dialog.html',
  styleUrls: ['./z_addSellTransaction.dialog.css']
})
export class AddSellTransactionDialog implements OnInit {


  sellTrans : Transaction[];
  promise: Promise<any>;
  flag: boolean = false;
  id1:any = 5;
  id2:string = "XXS";
  flagSize: boolean = false;
  public mask = numberMask;
  constructor(
   
    public dialogRef: MatDialogRef<AddSellTransactionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
   private addSellTransactionService : AddSellTransactionService,
   public dialog: MatDialog,
   ) { }


   
  onNoClick(): void {
    this.dialogRef.close();
    
  }
  ngOnInit() {
    

    var category = sessionStorage.getItem("productCategory");
    console.log(category);
    if(category === "Sneakers"){
      this.flag = true;
      this.size(5);
    }
    else{
      this.flag = false;
      this.size('XXS');
    }

    
  }

  size(id){
    var category = sessionStorage.getItem("productCategory");

    if(category === "Sneakers"){
      sessionStorage.setItem("productSize", "US "+id);

      if(this.id1 != id){
        document.getElementById(this.id1).style.border = "solid black 1.5px";
      }
      document.getElementById(id).style.border = "solid #8a2be2 1.5px";
      
      this.id1 = id;
    }else{
      
      sessionStorage.setItem("productSize", id);
      if(this.id2 != id){
        document.getElementById(this.id2).style.border = "solid black 1.5px";
      }
      document.getElementById(id).style.border = "solid #8a2be2 1.5px";
      
      this.id2 = id;
    }
    
    

  }

  addSellTransaction(productPrice : Number){

    var email = sessionStorage.getItem("email");
    var productBrand = sessionStorage.getItem("productBrand");
    var productCategory = sessionStorage.getItem("productCategory");
    var productImage = sessionStorage.getItem("productImage");
    var productName = sessionStorage.getItem("productName");
    var productSize = sessionStorage.getItem("productSize");

    this.promise = this.addSellTransactionService.addSellTransaction(email,productImage,productName,productBrand, productCategory,productSize, productPrice).map(
      (sTrans : Transaction[]) => this.sellTrans = sTrans
    ).toPromise();

   
    this.sellSuccessDialog();
  }

  sellSuccessDialog(){
    this.dialogRef.close();
        let dialogRef = this.dialog.open(SellTransactionSuccessDialog, {
          width: '400px',
      });
  }



  PrSizeFormControl = new FormControl('', [
    Validators.required
  ]);
  PrPriceFormControl = new FormControl('', [
    Validators.required
  ]);
}

@Component({
  templateUrl: './z_addSellTransactionSuccess.dialog.html',
  styleUrls: ['./z_addSellTransactionSuccess.dialog.css']
})
export class SellTransactionSuccessDialog implements OnInit {

  constructor(
   
    public dialogRef: MatDialogRef<SellTransactionSuccessDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }

}


@Component({
  templateUrl: './z_login.dialog.html',
  styleUrls: ['./z_login.dialog.css']
})
export class LoginDialogOverview2 implements OnInit {


  promise: Promise<any>;
  
  
  users: User;
  user: User[];
  constructor(
    public dialogRef: MatDialogRef<LoginSuccessDialog2>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loginService : LoginService,
    public dialog: MatDialog
  
  ) { }

  
  ngOnInit() {
   

   
  }

  successDialog(){
    this.dialogRef.close();
        let dialogRef = this.dialog.open(LoginSuccessDialog2, {
          width: '400px',
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  Login(email:string, password:string){
 
        
      

       this.promise = this.loginService.showLogin(email,password).map((userLogin : User) => {

       
          this.users = userLogin;
          
          console.log("works");
          // console.log(userLogin);
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          sessionStorage.setItem('email', JSON.stringify(email));
          sessionStorage.setItem('password', JSON.stringify(password)); 
          
          
          console.log("id: " + userLogin.id);
          sessionStorage.setItem("id", userLogin.id);
          sessionStorage.setItem("name", userLogin.name);
          sessionStorage.setItem("email", userLogin.email);
          sessionStorage.setItem("password", userLogin.password);
          sessionStorage.setItem("phoneNumber", userLogin.phoneNumber);
          sessionStorage.setItem("birthDate", userLogin.birthDate);
          sessionStorage.setItem("loginFlag",JSON.stringify(true));
          
          
          this.successDialog();

          sessionStorage.setItem("namaBank", userLogin.rekening.namaBank);
          sessionStorage.setItem("noRekening", userLogin.rekening.noRekening);
          sessionStorage.setItem("namaRekening", userLogin.rekening.namaRekening);
          sessionStorage.setItem("addressDetail", userLogin.address.addressDetail);
          sessionStorage.setItem("city", userLogin.address.city);
          sessionStorage.setItem("postalCode", userLogin.address.postalCode);
          
        },
        err => {
          console.log("error occured");

          
        }
      ).toPromise();
        
  
     
    console.log("TESTING");
  }

 

  LoginEmailFormControl = new FormControl('', [
    Validators.required
  ]);
  LoginPasswordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  

}




@Component({
  templateUrl: './z_loginSuccess.dialog.html',
  styleUrls: ['./z_loginSuccess.dialog.css']
})
export class LoginSuccessDialog2 implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginSuccessDialog2>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }

}

@Component({
  templateUrl: './z_updateRekAddress.dialog.html',
  styleUrls: ['./z_updateRekAddress.dialog.css']
})
export class UpdateRekAddressDialog implements OnInit {

  constructor(
   
    public dialogRef: MatDialogRef<UpdateRekAddressDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private router : Router) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.router.navigate(['../home/profile']);
  }

}