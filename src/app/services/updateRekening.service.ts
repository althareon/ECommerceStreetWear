import { Injectable, Component, OnInit, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';



@Injectable()
export class UpdateRekeningService{
    private apiUrl = 'http://localhost:8099/user/updateRekening?';
    private headers = new Headers({'Content-type': 'application/json'});

    constructor(private http:Http
       
    ){ }

    realUrl(email:string, namaBank:string, noRekening:string, namaRekening:string){
        var url =`${this.apiUrl}email=${email}&namaBank=${namaBank}&noRekening=${noRekening}&namaRekening=${namaRekening}`;
        return url;
    }

    updateRekening(email:string, namaBank:string, noRekening:string, namaRekening:string){
        return this.http.get(this.realUrl(email,namaBank,noRekening,namaRekening))
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