import { Injectable, Component, OnInit, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';



@Injectable()
export class UpdateBuyerEmailService{
    private apiUrl = 'http://localhost:8099/transaction/updateBuyerEmail?';
    private headers = new Headers({'Content-type': 'application/json'});

    constructor(private http:Http
       
    ){ }

    realUrl(email:string, transactionId:string){
        var url =`${this.apiUrl}buyerEmail=${email}&transactionId=${transactionId}`;
        return url;
    }

    updateBuyerEmail(email:string, transactionId:string){
        return this.http.get(this.realUrl(email,transactionId))
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