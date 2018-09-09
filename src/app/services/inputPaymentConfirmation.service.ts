import { Injectable, Component, OnInit, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';



@Injectable()
export class InputPaymentConfirmationService{

    private apiUrl = 'http://localhost:8099/checkout/inputPaymentConfirmation?';
    private headers = new Headers({'Content-type': 'application/json'});

    constructor(private http:Http
       
    ){ }

    realUrl(id:string,namaBank: string, noRekening:string, namaRekening: string, nilaiTransfer:number){
        var url =`${this.apiUrl}id=${id}&namaBank=${namaBank}&noRekening=${noRekening}&namaRekening=${namaRekening}&nilaiTransfer=${nilaiTransfer}`;
        return url;
    }

    inputPaymentConfirmation(id:string,namaBank: string, noRekening:string, namaRekening: string, nilaiTransfer:number){
        return this.http.get(this.realUrl(id,namaBank,noRekening,namaRekening,nilaiTransfer))
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