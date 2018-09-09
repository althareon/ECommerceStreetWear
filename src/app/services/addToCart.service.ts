import { Injectable, Component, OnInit, Inject } from '@angular/core';
import { User } from "../model/user";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AddToCartService{
    private apiUrl = 'http://localhost:8099/user/updateCart?';
    private headers = new Headers({'Content-type': 'application/json'});

    constructor(private http:Http
       
    ){ }

    realUrl(email:String, transactionId: String, productImage:String, productName: String, productSize:String,productBrand: String, productCategory: String, productPrice: Number, productQuantity: Number){
        productQuantity = 1;
        var url =`${this.apiUrl}email=${email}&transactionId=${transactionId}&productImage=${productImage}&productName=${productName}&productSize=${productSize}&productBrand=${productBrand}&productCategory=${productCategory}&productPrice=${productPrice}&productQuantity=${productQuantity}`;
        return url;
    }

    addToCart(email:String, transactionId: String, productImage:String, productName: String, productSize:String,productBrand: String, productCategory: String, productPrice: Number, productQuantity: Number){
        return this.http.get(this.realUrl(email,transactionId,productImage,productName,productSize,productBrand, productCategory,productPrice,productQuantity))
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