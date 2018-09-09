import { Injectable, Component, OnInit, Inject } from '@angular/core';
import { User } from "../model/user";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class GetAllSellTransWithoutBuyerService{
    private apiUrl = 'http://localhost:8099/transaction/getSellTransactionWithoutBuyer?';
    private headers = new Headers({'Content-type': 'application/json'});

    constructor(private http:Http
       
    ){ }

    realUrl(email : String){
        var url =`${this.apiUrl}sellerEmail=${email}`;
        return url;
    }

    getAllSellTransWithoutBuyer(email:String){
        return this.http.get(this.realUrl(email))
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