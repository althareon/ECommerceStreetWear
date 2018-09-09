import { Component, OnInit } from '@angular/core';
import { Transaction } from "../model/transaction";
import { GetAllSellTransactionService } from "../services/getAllSellTransaction.service";
import { GetAllBuyTransactionService } from "../services/getAllBuyTransaction.service";
import { GetAllSellTransWithoutBuyerService } from "../services/getAllSellTransWithoutBuyer.service";
import { GetAllSellTransWIBuyerSellerService } from "../services/getAllSellTransWIBuyer.service";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  sellTransaksi: Transaction[];
  buyTransaksi: Transaction[];
  p: number = 1;
  collection1: any[] = this.buyTransaksi;
  collection2: any[] = this.sellTransaksi; 
  id1:any = 1;


  constructor(
    
    
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
 
    setTimeout(() => {
        this.spinner.hide();
    }, 500);
    
    this.changeBold(this.id1);
  }

 
  changeBold(id){
    if(this.id1 != id){
      document.getElementById(this.id1).style.fontWeight = "normal";
    }
    document.getElementById(id).style.fontWeight = "bold";
    
    this.id1 = id;
  }

 

  

}
