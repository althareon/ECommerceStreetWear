import { Injectable, Component, OnInit, Inject } from '@angular/core';
import { User } from "../model/user";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class LoginService{
    private apiUrl = 'http://localhost:8099/user/login?';
    private headers = new Headers({'Content-type': 'application/json'});
    
    constructor(private http:Http,
        public dialog: MatDialog
       
    ){ }


    realUrl(email : String, password : String){
        var url =`${this.apiUrl}email=${email}&pwd=${password}`;
        return url;
    }

    //Login
    showLogin(email:String, password: String){

        return this.http
        .get(this.realUrl(email,password))
        .map((res:Response) =>( 
            console.log(res),
            this.LoginValidation(res),
            res.json()
            
        )     
    )
        
        .catch(this.handleError)
        
        
    }


    LoginValidation(res: Response){
        console.log("TEST WORKS");
        if((<any>res)._body === ''){
            this.validateLogin(false);
            let dialogRef = this.dialog.open(LoginFailedDialog, {
                width: '400px',
              });
              
        }
        else{
            this.validateLogin(true);
           
        }
       
        
    }

    validateLogin(flag: boolean){
        sessionStorage.setItem("loginFlag",JSON.stringify(flag));
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


@Component({
    templateUrl: '../home/z_loginFailed.dialog.html',
    styleUrls: ['../home/z_loginFailed.dialog.css']
  })
  export class LoginFailedDialog implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<LoginFailedDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    ngOnInit() {
      
    }
  
  }