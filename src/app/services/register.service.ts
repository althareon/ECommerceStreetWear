import { Injectable, Component, OnInit, Inject } from '@angular/core';
import { User } from "../model/user";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class RegisterService{
    private apiUrl = 'http://localhost:8099/user/register?';
    private headers = new Headers({'Content-type': 'application/json'});
    
    constructor(private http:Http,
        public dialog: MatDialog
       
    ){ }

    realUrl(name:String, email : String, password : String, phoneNumber:String, birthDate: Date){
        var url =`${this.apiUrl}name=${name}&email=${email}&password=${password}&phoneNumber=${phoneNumber}&birthDate=${birthDate}`;
        return url;
    }

    regisService(name:String, email : String, password : String, phoneNumber:String, birthDate: Date){
        return this.http
        .get(this.realUrl(name,email,password,phoneNumber,birthDate))
        .map((res:Response) =>( 
            console.log(res),
            res.json()
            
        )     
    )
        
        .catch((error:any) =>{
            if (error.status < 400 ||  error.status === 500) {
                this.registerFailed();
                return Observable.throw(new Error(error.status));
            }
        })
 
        
    }

    // public handleError(err){
    //     console.log("err");
        
    //     let errMessage: string;
         
    //    if(err instanceof Response){
    //     let body = err.json() || '';
    //     let error = body.error || JSON.stringify(body);
    //     errMessage = `${err.status} - ${err.statusText} || '' } ${error}`;
    //    }else{
    //        errMessage = err.message ? err.message : err.toString();
    //    }

    //        return Observable.throw(errMessage);
    // }

    registerFailed(){
        let dialogRef = this.dialog.open(RegisterFailedDialog, {
            width: '400px',
        });
    }


}

@Component({
    templateUrl: '../home/z_registerFailed.dialog.html',
    styleUrls: ['../home/z_registerFailed.dialog.css']
  })
  export class RegisterFailedDialog implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<RegisterFailedDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    ngOnInit() {
      
    }
  
  }