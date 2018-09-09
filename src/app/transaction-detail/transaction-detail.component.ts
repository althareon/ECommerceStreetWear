import { Component, OnInit, Inject } from '@angular/core';
import { Transaction } from "../model/transaction";
import { GetTransactionDetailService } from "../services/getTransactionDetail.service";
import { SellerConfirmService } from '../services/sellerConfirm.service';
import { SellerRejectService } from '../services/sellerReject.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, ErrorStateMatcher } from '@angular/material';
import { InputTrackingNumberToAdminService } from '../services/inputTrackingNumberToAdmin.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DeleteSellTransactionService } from '../services/deleteSellTransaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

  transaction : Transaction;
  promise: Promise<any>;

  deleteStatus:boolean = false;
  status:boolean = false;
  status2: boolean = false;
  status3: boolean = false;
  constructor(
    public dialog: MatDialog,
    private getTransactionDetailService : GetTransactionDetailService,
    private router :Router
    
  ) { }

  ngOnInit() {
    this.getTransactionDetail();
    
  }



  getTransactionDetail(){
    var transactionId = sessionStorage.getItem("transactionId");
    var sellerEmail = sessionStorage.getItem("email");


    this.promise = this.getTransactionDetailService.getTransactionDetail(transactionId).map(
      (trans: Transaction) => {
        this.transaction = trans;

        if(sellerEmail == trans[0].sellerEmail && trans[0].overallStatus == "pending"){
          this.deleteStatus = true;
        }else{
          this.deleteStatus = false;
        }


        if(sellerEmail == trans[0].sellerEmail && trans[0].overallStatus == "need sell confirmation"){
          this.status = true;
          this.status2 = false;
          this.status3 = false;
        }
        else if(sellerEmail == trans[0].sellerEmail && trans[0].overallStatus == "waiting for tracking number"){
          this.status = false;
          this.status2 = true;
          this.status3 = false;
        }else if( sellerEmail == trans[0].sellerEmail && trans[0].overallStatus == "refund process"){
          this.status = false;
          this.status2 = false;
          this.status3 = false;
        }else if(sellerEmail == trans[0].sellerEmail && trans[0].overallStatus == "waiting for verification process"){
          this.status = false;
          this.status2 = false;
          this.status3 = true;
        }
      }
    ).toPromise();
  }

  confirmSellDialog(){
    let dialogRef = this.dialog.open(ConfirmSellerDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTransactionDetail();

    });
  }

  inputTrackingNumToAdminDialog(){
    let dialogRef = this.dialog.open(InputTrackingNumberToAdminDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTransactionDetail();

    });
  }

  deleteTransactionDialog(){
    let dialogRef = this.dialog.open(DeleteTransactionDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      

    });
  }

  


}


@Component({
  templateUrl: './z_confirmSell.dialog.html',
  styleUrls: ['./z_confirmSell.dialog.css']
})
export class ConfirmSellerDialog implements OnInit {

  promise:Promise<any>;
  transactionConfirm: Transaction;
  constructor(
    public dialogRef: MatDialogRef<ConfirmSellerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sellerConfirmService: SellerConfirmService,
    private sellerRejectService: SellerRejectService,
    public dialog: MatDialog) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }

  sellerConfirm(){
    var transactionId = sessionStorage.getItem("transactionId");

    this.promise = this.sellerConfirmService.sellerConfirm(transactionId).map(
      (trans: Transaction) => {
        this.transactionConfirm = trans;
        
      }
    ).toPromise();
    this.dialogRef.close();
    this.successDialog();
  }

  sellerReject(){
    var transactionId = sessionStorage.getItem("transactionId");

    this.promise = this.sellerRejectService.sellerReject(transactionId).map(
      (trans: Transaction) => {
        this.transactionConfirm = trans;
      }
    ).toPromise();
    
    this.dialogRef.close();
    this.successDialog();
  }

  successDialog(){
    let dialogRef = this.dialog.open(SuccessConfirmSellerDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {

     

    });
  }

}


@Component({
  templateUrl: './z_success.dialog.html',
  styleUrls: ['./z_success.dialog.css']
})
export class SuccessConfirmSellerDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SuccessConfirmSellerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }

  

}


@Component({
  templateUrl: './z_inputTrackingNumToAdmin.dialog.html',
  styleUrls: ['./z_inputTrackingNumToAdmin.dialog.css']
})
export class InputTrackingNumberToAdminDialog implements OnInit {

  promise: Promise<any>;
  trackNum: Transaction;
  constructor(
    public dialogRef: MatDialogRef<InputTrackingNumberToAdminDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private inputTrackingNumToAdminService: InputTrackingNumberToAdminService,
    public dialog: MatDialog) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }

  inputTrackingNum(trackNum:string, deliveryCourier:string){
    var transactionId = sessionStorage.getItem("transactionId");

    this.promise = this.inputTrackingNumToAdminService.inputTrackingNumberToAdmin(transactionId,trackNum,deliveryCourier).map(
      (trans: Transaction) => {
        this.trackNum = trans;
      }
    ).toPromise();
    
    this.dialogRef.close();
    this.successDialog();
  }

  successDialog(){
    let dialogRef = this.dialog.open(SuccessConfirmSellerDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {

     

    });
  }

  DeliveryCourierFormControl = new FormControl('', [
    Validators.required
  ]);
  
  TrackingNumberFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

}








@Component({
  templateUrl: './z_deleteTransaction.dialog.html',
  styleUrls: ['./z_deleteTransaction.dialog.css']
})
export class DeleteTransactionDialog implements OnInit {

  promise: Promise<any>;
  deleteTrans: Transaction;
  constructor(
    public dialogRef: MatDialogRef<InputTrackingNumberToAdminDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deleteTransactionService: DeleteSellTransactionService,
    public dialog: MatDialog,
    private router : Router) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }

  deleteTransactionServ(){
    var transactionId = sessionStorage.getItem("transactionId");

    this.promise = this.deleteTransactionService.deleteSellTransaction(transactionId).map(
      (delTrans: Transaction) => {
        this.deleteTrans = delTrans;
      }
    ).toPromise();
    
    this.dialogRef.close();
    this.successDialog();
  }

  successDialog(){
    let dialogRef = this.dialog.open(SuccessConfirmSellerDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {

      this.router.navigate(['../home/profile/sellTransaction']);

    });
  }



}



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}