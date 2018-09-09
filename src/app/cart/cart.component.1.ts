import { Component, OnInit, Inject } from '@angular/core';
import { MatIconRegistry, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { GetUserDetailService } from "../services/getUserDetail.service";
import { DeleteFromCartService } from "../services/deleteFromCart.service";
import { Cart } from "../model/cart";
import { User } from "../model/user";
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CheckOutService } from '../services/checkOut.service';
import { Checkout } from '../model/checkout';
import { UpdateBuyerEmailService } from '../services/updateBuyerEmail.service';
import { UpdateCheckoutIdService } from '../services/updateCheckOutId.service';
import { GetTransactionDetailService } from '../services/getTransactionDetail.service';
import { Transaction } from '../model/transaction';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  carts: Cart[];
  users: User;
  promise: Promise<any>;
  promise2: Promise<any>;
  count: number = 0;

  countTrans: number = 0;

  total: number = 0;
  shippingFee : number = 20000;
  grandTotal:number = 0;
  checkTrans : Transaction;
  flag : boolean = false;
  flagTrans: boolean = false;
  flagCheckout : boolean = false;
  constructor(public dialog: MatDialog,
  public getUserDetailService : GetUserDetailService,
  public deleteFromCartService : DeleteFromCartService,
  private spinner: NgxSpinnerService,
  public getTransactionById : GetTransactionDetailService,
private router : Router) { 
    
  }

  ngOnInit() {

    this.getCart();

    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 500);
  }

  deleteFromCartDialog(transactionId:string) : void{
    sessionStorage.setItem("transactionId", transactionId);
    let dialogRef = this.dialog.open(DeleteFromCartConfirmationDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.count = 0;
      this.total = 0;
      this.grandTotal = 0;
      this.getCart();
    });
  }


  updateRekAddressDialog() : void{
    let dialogRef = this.dialog.open(UpdateRekAddressDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  chkOut(){
    if(sessionStorage.getItem("addressDetail") == null || sessionStorage.getItem("namaBank") == null){
      this.updateRekAddressDialog();
    }else{
      this.checkoutConfirmationDialog();
    }
  }

  checkoutConfirmationDialog() : void{

    sessionStorage.setItem("grandTotal", JSON.stringify(this.grandTotal));
    var grandTotal = JSON.parse(sessionStorage.getItem("grandTotal"));
    console.log(grandTotal);

    let dialogRef = this.dialog.open(CheckoutConfirmationDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.count = 0;
      this.total = 0;
      this.grandTotal = 0;
      this.getCart();
      
    });
  }
  


  checkTransCount(data){
    this.countTrans = 0;
    this.countTrans += data.length;
    console.log(this.countTrans);

    if(this.countTrans == 0){
      sessionStorage.setItem("transError", "error");
    }
  }


  checkTransaction(id:string){
    this.promise2 = this.getTransactionById.getTransactionDetail(id).map((checkT: Transaction) => {
      this.checkTrans = checkT;
      
      this.checkTransCount(checkT);

      if(sessionStorage.getItem("transError") == "error"){
        this.flagTrans = true;
        this.flagCheckout = true;

      }else if(sessionStorage.getItem("transError") == "not error"){
        this.flagTrans = false;
        this.flagCheckout = false;
      }

      
    },
    err => {
        console.log("error occured");

          
    }).toPromise();
  }

  getCart(){
    sessionStorage.setItem("transError", "not error");
    var email = sessionStorage.getItem('email');
    this.promise = this.getUserDetailService.getUserDetail(email).map((userCart: User) => {
      this.users = userCart
      // console.log("price: ", userCart.cart);


      

      if(userCart.cart == null || JSON.stringify(userCart.cart) == "[]"){
        this.flag = true;
        this.flagCheckout = true;
      }else if(userCart.cart != null){
        this.flag = false;
        this.flagCheckout = false;
        this.addCount(userCart);

        for(var i = 0;i<this.count ; i++){
          this.total += userCart.cart[i].productPrice
        }
        this.grandTotal += this.total + this.shippingFee;

        for(var i = 0;i<this.count ; i++){
          this.checkTransaction(userCart.cart[i].transactionId);
          
          console.log(this.flagTrans);
          if(this.flagTrans == true){
            break;
          }
        }

        
      }

      

      

    },
    err => {
        console.log("error occured");

          
    }).toPromise();
   
   
  }

  addCount(data){
    this.count += data.cart.length;

    
    console.log(this.count);
    sessionStorage.setItem("count", JSON.stringify(this.count));
  }

  

}


@Component({
  templateUrl: './z_deleteConfirmation.dialog.html',
  styleUrls: ['./z_deleteConfirmation.dialog.css']
})
export class DeleteFromCartConfirmationDialog implements OnInit {

  users: User;
  carts : Cart[];
  promise: Promise<any>;
  constructor(
    public router: Router, 
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteFromCartConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deleteFromCartService: DeleteFromCartService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }

  deleteFromCart(){
    var transactionId = sessionStorage.getItem('transactionId');
    var email = sessionStorage.getItem('email');
    this.promise = this.deleteFromCartService.deleteFromCart(email,transactionId).map((userCart: User) => {
      this.users = userCart
    },
    err => {
        console.log("error occured");

          
    }).toPromise();

    this.successDialog();
  }

  successDialog(){
    this.dialogRef.close();
        let dialogRef = this.dialog.open(SuccessDialog, {
          width: '400px',
      });

     
  }
}


@Component({
  templateUrl: './z_success.dialog.html',
  styleUrls: ['./z_success.dialog.css']
})
export class SuccessDialog implements OnInit {

  constructor(
   
    public dialogRef: MatDialogRef<SuccessDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }

}

@Component({
  templateUrl: './z_checkoutConfirmation.dialog.html',
  styleUrls: ['./z_checkoutConfirmation.dialog.css']
})
export class CheckoutConfirmationDialog implements OnInit {


  promise: Promise<any>;
  promise2: Promise<any>;
  checkout: Checkout;
  checkTrans: Transaction;
  flag:boolean = false;
  
  constructor(
   
    public dialogRef: MatDialogRef<CheckoutConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public checkOutServ: CheckOutService,
    public updateBuyerEmail: UpdateBuyerEmailService,
    public updateCheckOutId: UpdateCheckoutIdService,
    public dialog: MatDialog,
    private router: Router
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }

 

  checkOut(){
    var grandTotal = JSON.parse(sessionStorage.getItem("grandTotal"));
    var count = JSON.parse(sessionStorage.getItem("count"));
    var email = sessionStorage.getItem("email");

    this.promise = this.checkOutServ.checkOutServ(email,grandTotal).map((chkout: Checkout) => {
      this.checkout = chkout;
    
     
    

      var transactionId = chkout.transactionId[0].transactionId;
      var chkoutId = chkout.id;

      console.log(chkout.id);
      
      sessionStorage.setItem("chkoutId",chkout.id);
      sessionStorage.setItem("date", JSON.stringify(chkout.localDateTime));
      sessionStorage.setItem("grandTotal", JSON.stringify(grandTotal));
      sessionStorage.setItem("paymentStatus", chkout.paymentStatus);
      sessionStorage.setItem("overallStatus", chkout.statusPhase2);
      
      sessionStorage.setItem("buyerReceivedStatus", JSON.stringify(chkout.buyerReceivedStatus));

      // console.log(chkout.buyerReceivedStatus);

      for(let i = 0;i< count ;i++){
        let trxId = transactionId.split(",");
        this.updateBuyerEmailServ(trxId[i]);
        this.updateCheckOutIdServ(trxId[i], chkoutId);
      }
    },
    err => {
        console.log("error occured");

          
    }).toPromise();
     
    this.successDialog();
    
  }


  updateBuyerEmailServ(transactionId:string){
  
    var email = sessionStorage.getItem("email");
    this.promise = this.updateBuyerEmail.updateBuyerEmail(email,transactionId).map((chkout: Checkout) => {
      
    },
    err => {
        console.log("error occured");

          
    }).toPromise();
  }

  updateCheckOutIdServ(transactionId:string, checkOutId: string){
    this.promise = this.updateCheckOutId.updateCheckoutId(transactionId,checkOutId).map((chkout: Checkout) => {
      
    },
    err => {
        console.log("error occured");

          
    }).toPromise();
  }

  successDialog(){
    this.dialogRef.close();
        let dialogRef = this.dialog.open(SuccessDialog, {
          width: '400px',
      });

      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['/home/order/orderDetail']);
        
      });  
      
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