import { Injectable, Component, OnInit, Inject } from '@angular/core';
import { User } from "../model/user";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class GetTransactionByProductAndSellerService{
    private apiUrl = 'http://localhost:8099/transaction/getTransactionByProductNameWOSeller?';
    private headers = new Headers({'Content-type': 'application/json'});

    constructor(private http:Http
       
    ){ }

    realUrl(productName : String, sellerEmail:String){
        var url =`${this.apiUrl}productName=${productName}&sellerEmail=${sellerEmail}`;
        return url;
    }

    getTransactionByProductAndSeller(productName:String, sellerEmail:String){
        return this.http.get(this.realUrl(productName,sellerEmail))
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