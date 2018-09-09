import { Component, OnInit, Inject } from '@angular/core';
import { GetTransactionByCheckoutIdService } from '../services/getTransactionByCheckoutId.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Transaction } from '../model/transaction';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { InputPaymentConfirmationService } from '../services/inputPaymentConfirmation.service';
import { Checkout } from '../model/checkout';
import { ConfirmReceivedProductService } from '../services/confirmReceivedProduct.service';
import { UpdateOverallStatusService } from '../services/updateOverallStatus.service';
import { GetCheckOutByIdService } from '../services/getCheckOutById.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  checkoutId: string;
  date:Date;
  grandTotal: Number;
  paymentStatus: string;
  overallStatus: string;
  trackNumToBuyer: string;
  deliveryCourier: string;
  buyerReceivedStatus: string;

  count:number = 0;
  transaction: Transaction;
  promise: Promise<any>;
  flagStatus: boolean = false;
  trackNumToBuyerCompleteFlag: boolean = false;
  receivedStatusFlag : boolean = false;

  constructor(
    private getTransactionByCheckoutIdService: GetTransactionByCheckoutIdService,
    private spinner: NgxSpinnerService,
    private router : Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.setData();
    this.checkStatus();
    this.getTransactionByCheckoutId();
    this.checkTrackNum();
    this.checkReceivedStatus();
    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 500);

  }


  addCount(data){
    this.count += data.length;
    sessionStorage.setItem("count", JSON.stringify(this.count));
  }
  getTransactionByCheckoutId(){
    var checkoutId = sessionStorage.getItem("chkoutId");
    this.promise = this.getTransactionByCheckoutIdService.getTransactionByCheckoutId(checkoutId).map((trans: Transaction) => {
      this.transaction = trans;
      this.addCount(trans);
      
    },
    err => {
        console.log("error occured");

          
    }).toPromise();
  }


  setData(){
    this.count = 0;
    this.checkoutId = sessionStorage.getItem("chkoutId");
    this.date =JSON.parse(sessionStorage.getItem("date"));
    this.grandTotal= JSON.parse(sessionStorage.getItem("grandTotal"));
    this.paymentStatus = sessionStorage.getItem("paymentStatus");
    this.overallStatus = sessionStorage.getItem("overallStatus");
    this.deliveryCourier = sessionStorage.getItem("deliveryCourier");
    this.trackNumToBuyer = sessionStorage.getItem("trackNumUsToBuyer");
    this.buyerReceivedStatus = sessionStorage.getItem("buyerReceivedStatus");
  }

  transDetail(transactionId: string){
    sessionStorage.setItem("transactionId", transactionId);
    this.router.navigate(['/home/profile/transactionDetail']);
  }

  checkStatus(){
    if(sessionStorage.getItem("paymentStatus") == "waiting for payment confirmation"){
      document.getElementById("h5").style.color = "red";
      document.getElementById("h5").style.fontWeight = "bold";
    }else if(sessionStorage.getItem("paymentStatus") == "waiting for Admin confirmation"){
      document.getElementById("h5").style.fontWeight = "bold";
      document.getElementById("h5").style.color = "orange";
      // this.flagStatus = true;
    }else if(sessionStorage.getItem("paymentStatus") == "confirmed by Admin"){
      this.flagStatus = true;
      document.getElementById("h5").style.color = "green";
      document.getElementById("h5").style.fontWeight = "bold";
    }else if(sessionStorage.getItem("paymentStatus") == "payment not found"){
      this.flagStatus = false;
      document.getElementById("h5").style.color = "red";
      document.getElementById("h5").style.fontWeight = "bold";
    }
  }

  checkTrackNum(){
    if(sessionStorage.getItem("deliveryCourier") == "null" || sessionStorage.getItem("deliveryCourier") == null){
      this.trackNumToBuyerCompleteFlag = false;
    } else if(sessionStorage.getItem("deliveryCourier") != "null"){
      this.trackNumToBuyerCompleteFlag = true;
    }
  }

  checkReceivedStatus(){
    if(sessionStorage.getItem("buyerReceivedStatus") != "null"){
      this.trackNumToBuyerCompleteFlag = false;
      this.receivedStatusFlag = true;
    } else if(sessionStorage.getItem("buyerReceivedStatus") == "null"){
      this.receivedStatusFlag = false;
    }
  }

  confirmPaymentDialog(): void {
    let dialogRef = this.dialog.open(ConfirmPaymentDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  confirmReceivedDialog(): void {
    let dialogRef = this.dialog.open(ConfirmReceivedProductDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}



@Component({
  templateUrl: './z_confirmPayment.dialog.html',
  styleUrls: ['./z_confirmPayment.dialog.css']
})
export class ConfirmPaymentDialog implements OnInit {

  promise: Promise<any>;
  updateConfirmPayment: Checkout;
  
  constructor(
    public dialogRef: MatDialogRef<ConfirmPaymentDialog>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private inputConfirmPaymentService: InputPaymentConfirmationService,
    private router : Router) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    

   
  }

  inputConfirmPayment(noRekening:string, namaRekening:string, nilaiTransfer:number){

    var checkoutId = sessionStorage.getItem("chkoutId");
    var namaBank = "BCA";
    this.promise = this.inputConfirmPaymentService.inputPaymentConfirmation(checkoutId,namaBank,noRekening,namaRekening, nilaiTransfer)
    .map((upPayment : Checkout) =>{
      this.updateConfirmPayment = upPayment;
    
      this.dialogRef.close();
      this.successDialog();

    },err => {
      console.log("error occured");
      
    }
  
    ).toPromise();

  }
  successDialog(): void {
    let dialogRef = this.dialog.open(SuccessPaymentConfirmDialog, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/home/order']);
    });
  }



  NoRekeningFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10)
  ]);
  
  NamaRekeningFormControl = new FormControl('', [
    Validators.required
  ]);
  NilaiTransferFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();
}

@Component({
  templateUrl: './z_success.dialog.html',
  styleUrls: ['./z_success.dialog.css']
})
export class SuccessPaymentConfirmDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SuccessPaymentConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }

}


@Component({
  templateUrl: './z_confirmReceivedProduct.dialog.html',
  styleUrls: ['./z_confirmReceivedProduct.dialog.css']
})
export class ConfirmReceivedProductDialog implements OnInit {

  promise: Promise<any>;
  promise2: Promise<any>;
  promise3: Promise<any>;
  receivedProduct: Checkout;
  perTransaction: Transaction;
  transactionIdTemp: string;
  chkDetail: Checkout;
  count:number = 0;

  constructor(
    public dialogRef: MatDialogRef<ConfirmReceivedProductDialog>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private confirmReceivedProductService: ConfirmReceivedProductService,
    private updateOverallStatusService: UpdateOverallStatusService,
    private getCheckoutDetailByIdService: GetCheckOutByIdService,
    private router : Router) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.count = JSON.parse(sessionStorage.getItem("count"));
    console.log(this.count);
    this.getCheckoutDetailById();
  }

 
  getCheckoutDetailById(){
    var checkoutId = sessionStorage.getItem("chkoutId");
    this.promise3 = this.getCheckoutDetailByIdService.getCheckOutById(checkoutId)
    .map((chk : Checkout) =>{
      this.chkDetail = chk;
      console.log(chk[0].transactionId[0].transactionId);
      this.transactionIdTemp = chk[0].transactionId[0].transactionId;
      
    },err => {
      console.log("error occured");
      
    }
  
    ).toPromise();
}

  updateOverallStatus(transactionId:string){
      this.promise2 = this.updateOverallStatusService.updateOverallStatus(transactionId)
      .map((trans : Transaction) =>{
        this.perTransaction = trans;
        

      },err => {
        console.log("error occured");
        
      }
    
      ).toPromise();
  }

  confirmReceivedProduct(){
    
    var checkoutId = sessionStorage.getItem("chkoutId");
    this.promise = this.confirmReceivedProductService.confirmReceivedProduct(checkoutId)
    .map((receivedProd : Checkout) =>{
      this.receivedProduct = receivedProd;
      
      var transactionId = this.transactionIdTemp;
      

      for(var i = 0; i< this.count ; i++){
        let trxId = transactionId.split(",");
        console.log(trxId[i]);
        this.updateOverallStatus(trxId[i]);
      }

    },err => {
      console.log("error occured");
      
    }
  
    ).toPromise();

    this.dialogRef.close();
    this.successDialog2();

  }
  successDialog2(): void {
    let dialogRef = this.dialog.open(SuccessReceivedDialog, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/home/order']);
    });
  }
}


@Component({
  templateUrl: './z_successPhase2.dialog.html',
  styleUrls: ['./z_successPhase2.dialog.css']
})
export class SuccessReceivedDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SuccessReceivedDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }



}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}