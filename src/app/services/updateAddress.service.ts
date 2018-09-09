import { Injectable, Component, OnInit, Inject } from '@angular/core';
import { User } from "../model/user";
import { Cart } from "../model/cart";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';



@Injectable()
export class UpdateAddressService{
    private apiUrl = 'http://localhost:8099/user/updateAddress?';
    private headers = new Headers({'Content-type': 'application/json'});

    constructor(private http:Http
       
    ){ }

    realUrl(email:string, city:string, postalCode:string, addressDetail:string){
        var url =`${this.apiUrl}email=${email}&city=${city}&postalCode=${postalCode}&addressDetail=${addressDetail}`;
        return url;
    }

    updateAddress(email:string, city:string, postalCode:string, addressDetail:string){
        return this.http.get(this.realUrl(email,city,postalCode,addressDetail))
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