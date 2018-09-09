import { Injectable, Component, OnInit, Inject } from '@angular/core';
import { User } from "../model/user";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class GetAllProductService{
    private apiUrl = 'http://localhost:8099/product/getAllProduct';
    private headers = new Headers({'Content-type': 'application/json'});

    constructor(private http:Http
       
    ){ }

    realUrl(){
        var url =`${this.apiUrl}`;
        return url;
    }

    getAllProduct(){
        return this.http.get(this.realUrl())
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