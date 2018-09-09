import { Component, OnInit } from '@angular/core';
import { GetAllBuyTransactionService } from '../services/getAllBuyTransaction.service';
import { GetHistoryBuyTransactionService } from "../services/GetHistoryBuyTransaction.service";
import { Transaction } from '../model/transaction';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-transaction',
  templateUrl: './buy-transaction.component.html',
  styleUrls: ['./buy-transaction.component.css']
})
export class BuyTransactionComponent implements OnInit {

  historyBuyTransaksi: Transaction[];
  buyTransaksi: Transaction[];
  p: number = 1;
  collection1: any[] = this.buyTransaksi;
  collection2: any[] = this.historyBuyTransaksi; 
  constructor(private getAllBuyTransactionService:GetAllBuyTransactionService,
    private getHistoryBuyTransactionService: GetHistoryBuyTransactionService,
    private spinner:NgxSpinnerService,
  private router: Router) { }

  ngOnInit() {
    this.spinner.show();
 
    setTimeout(() => {
        this.spinner.hide();
    }, 500);
    this.getAllBuyTransaction();
    this.getHistoryBuyTransaction();
  }

  getAllBuyTransaction(){
    var email = sessionStorage.getItem('email');
    

    var serv = this.getAllBuyTransactionService.getAllBuyTransaction(email);

    serv.subscribe(
      (showBuyTrans: Transaction[]) => this.buyTransaksi = showBuyTrans
    );
  }

  getHistoryBuyTransaction(){
    var email = sessionStorage.getItem('email');
    
    var serv = this.getHistoryBuyTransactionService.getHistoryBuyTransaction(email);

    serv.subscribe(
      (historyTrans: Transaction[]) => this.historyBuyTransaksi = historyTrans
    );
  }

  transDetail(transactionId: string){
    sessionStorage.setItem("transactionId", transactionId);
    this.router.navigate(['/home/profile/transactionDetail']);
  }

}
