import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GetCheckOutByEmailService } from '../services/getCheckOutByEmail.service';
import { Checkout } from '../model/checkout';
import { DateAdapter } from '@angular/material';
import { Router } from '@angular/router';
import { GetHistoryOrderByEmailService } from '../services/getHistoryOrderByEmail.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  promise: Promise<any>;
  promise2: Promise<any>;
  checkoutList: Checkout;
  checkoutListHistory: Checkout;
  p: number = 1;
  q: number = 1;
  flag:boolean = false;
  refundFlag:boolean = false;
  count:number = 0;
 
// let trxId = transactionId.split(",");

  constructor(private spinner: NgxSpinnerService,
  private getCheckOutByEmailService : GetCheckOutByEmailService,
  private getOrderHistoryByEmailService: GetHistoryOrderByEmailService,
  private router: Router) { }

  ngOnInit() {
    this.count = 0;
    this.getCheckOutByEmail();
    this.getOrderHistory();
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

  getCheckOutByEmail(){
    var email = sessionStorage.getItem('email');
    this.promise = this.getCheckOutByEmailService.getCheckOutByEmail(email).map((chkout: Checkout) => {
      this.checkoutList = chkout;
      // this.addCount(chkout);

      // for(var i = 0 ; i<this.count ;i++){
      //   if(chkout[i].paymentToBuyer.paymentStatus == "Refunded"){
      //     this.refundFlag = true;
          
      //   }
      // }
      
    },
    err => {
        console.log("error occured");

          
    }).toPromise();
  }

  getOrderHistory(){
    var email = sessionStorage.getItem('email');
    this.promise2 = this.getOrderHistoryByEmailService.getOrderHistoryByEmail(email).map((chkoutHistory: Checkout) => {
      this.checkoutListHistory = chkoutHistory;

      
    },
    err => {
        console.log("error occured");

          
    }).toPromise();
  }

  goToOrderDetail(id: string, date:Date, grandTotal: number, paymentStatus:string, overallStatus:string, trackNumUsToBuyer:string, deliveryCourier: string, buyerReceivedStatus:string){
    sessionStorage.setItem("chkoutId", id);
    sessionStorage.setItem("date", JSON.stringify(date));
    sessionStorage.setItem("grandTotal", JSON.stringify(grandTotal));
    sessionStorage.setItem("paymentStatus", paymentStatus);
    sessionStorage.setItem("overallStatus", overallStatus);
    sessionStorage.setItem("trackNumUsToBuyer", trackNumUsToBuyer);
    sessionStorage.setItem("deliveryCourier", deliveryCourier);
    sessionStorage.setItem("buyerReceivedStatus", buyerReceivedStatus);
    this.router.navigate(['/home/order/orderDetail']);
  }

}
