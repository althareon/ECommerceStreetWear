import { Component, OnInit } from '@angular/core';
import { Transaction } from '../model/transaction';
import { GetAllSellTransactionService } from '../services/getAllSellTransaction.service';
import { GetHistorySellTransactionService } from "../services/getHistorySellTransaction.service";
import { NgxSpinnerComponent, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-sell-transaction',
  templateUrl: './sell-transaction.component.html',
  styleUrls: ['./sell-transaction.component.css']
})
export class SellTransactionComponent implements OnInit {

  order: string = 'overallStatus';
  sellTransaksi: Transaction[];
  historySellTransaksi: Transaction[];
  buyTransaksi: Transaction[];
  sortedData;
  p: number = 1;
  q: number = 1;
  collection1: any[] = this.buyTransaksi;
  collection2: any[] = this.sellTransaksi; 
  constructor(
    private getAllSellTransactionService:GetAllSellTransactionService,
    private getHistorySellTransactionService : GetHistorySellTransactionService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    this.spinner.show();
 
    setTimeout(() => {
        this.spinner.hide();
    }, 500);

    this.getAllSellTransaction();
    this.getHistorySellTransaction();
 
  }

  getAllSellTransaction(){
    var email = sessionStorage.getItem('email');
    

    var serv = this.getAllSellTransactionService.getAllSellTransaction(email);

    serv.subscribe(
      (showSellTrans: Transaction[]) => this.sellTransaksi = showSellTrans
    );
  }

  getHistorySellTransaction(){
    var email = sessionStorage.getItem('email');
    

    var serv = this.getHistorySellTransactionService.getHistorySellTransaction(email);

    serv.subscribe(
      (historySell: Transaction[]) => this.historySellTransaksi = historySell
    );
  }

  transDetail(transactionId: string){
    sessionStorage.setItem("transactionId", transactionId);
    this.router.navigate(['/home/profile/transactionDetail']);
  }

  sortData(sort: Sort) {
    const data = this.sellTransaksi;
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'item': return this.compare(a.id, b.id, isAsc);
        case 'status': return this.compare(a.overallStatus, b.overallStatus, isAsc);
        case 'price': return this.compare(+a.productPrice, +b.productPrice, isAsc);
        case 'size': return this.compare(+a.productSize, +b.productSize, isAsc);
        default: return 0;
      }
    });
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
