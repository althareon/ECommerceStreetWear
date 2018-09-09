import { Injectable, Component, OnInit, Inject } from '@angular/core';
import { User } from "../model/user";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class DeleteFromCartService{
    private apiUrl = 'http://localhost:8099/user/deleteFromCart?';
    private headers = new Headers({'Content-type': 'application/json'});

    constructor(private http:Http
       
    ){ }

    realUrl(email:String, transactionId: String){
        var url =`${this.apiUrl}email=${email}&transactionId=${transactionId}`;
        return url;
    }

    deleteFromCart(email:String, transactionId: String){
        return this.http.delete(this.realUrl(email,transactionId))
        .map((res:Response) =>( 
            console.log(res)
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