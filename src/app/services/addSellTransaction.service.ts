import { Injectable, Component, OnInit, Inject } from '@angular/core';
import { User } from "../model/user";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AddSellTransactionService{
    private apiUrl = 'http://localhost:8099/transaction/sellTransaction?';
    private headers = new Headers({'Content-type': 'application/json'});

    constructor(private http:Http
       
    ){ }

    realUrl(sellerEmail:String, productImage: String, productName:String, 
        productBrand: String, productCategory: String, productSize: String, productPrice: Number){

        var url =`${this.apiUrl}sellerEmail=${sellerEmail}&productImage=${productImage}&productName=${productName}&productBrand=${productBrand}&productCategory=${productCategory}&productSize=${productSize}&productPrice=${productPrice}`;
        return url;
    }

    addSellTransaction(sellerEmail:String, productImage: String, productName:String, 
        productBrand: String, productCategory: String, productSize: String, productPrice: Number){
        return this.http.get(this.realUrl(sellerEmail,productImage,productName,productBrand,productCategory,productSize,productPrice))
        .map((res:Response) =>( 
            console.log(res),
            res.json()
        ) 
    ).catch(this.handleError)


    }

    private handleError(err){
        let errMessage: string;
       
       if(err instanceof Response){
        let body = err.json() || '';
        let error = body.error || JSON.stringify(body);
        errMessage = `${err.status} - ${err.statusText} || '' } ${error}`;
       }else{
           errMessage = err.message ? err.message : err.toString();
       }

           return Observable.throw(errMessage);
    }
}