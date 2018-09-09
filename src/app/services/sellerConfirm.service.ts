import { Injectable, Component, OnInit, Inject } from '@angular/core';
import { User } from "../model/user";
import { Cart } from "../model/cart";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';



@Injectable()
export class SellerConfirmService{
    private apiUrl = 'http://localhost:8099/transaction/sellerConfirm?';
    private headers = new Headers({'Content-type': 'application/json'});

    constructor(private http:Http
       
    ){ }

    realUrl(id:string){
        var url =`${this.apiUrl}transactionId=${id}`;
        return url;
    }

    sellerConfirm(id:string){
        return this.http.get(this.realUrl(id))
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