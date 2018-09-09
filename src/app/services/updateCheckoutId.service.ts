import { Injectable, Component, OnInit, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';



@Injectable()
export class UpdateCheckoutIdService{
    private apiUrl = 'http://localhost:8099/transaction/updateCheckOutId?';
    private headers = new Headers({'Content-type': 'application/json'});

    constructor(private http:Http
       
    ){ }

    realUrl(transactionId:string, checkoutId:string){
        var url =`${this.apiUrl}transactionId=${transactionId}&checkOutId=${checkoutId}`;
        return url;
    }

    updateCheckoutId(transactionId:string, checkoutId:string){
        return this.http.get(this.realUrl(transactionId,checkoutId))
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