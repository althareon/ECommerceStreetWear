import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators, AbstractControl, FormBuilder,FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import { LoginService } from "../services/login.service";
import { RegisterService } from "../services/register.service";

import { User } from "../model/user";
import { Product } from "../model/product";

import 'rxjs/add/operator/toPromise';
import { HostListener } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@HostListener('window:unload', ['$event'])
export class HomeComponent implements OnInit {

  flag:boolean = false;

  productFlag:boolean = false;
  name = sessionStorage.getItem("name");

  products: Product[];
  constructor(public dialog: MatDialog,
    private spinner : NgxSpinnerService
  ) { }

  
  unloadHandler(event) {
    window.sessionStorage.clear();
  }

  loginDialog(): void {
    let dialogRef = this.dialog.open(LoginDialogOverview, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if(sessionStorage.getItem("loginFlag") === "true"){
        
        window.location.reload();
      }

    });
  }

  registerDialog(): void {
    let dialogRef = this.dialog.open(RegisterDialogOverview, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }


  logOut(){
    this.flag = false;
    this.unloadHandler(event);
    window.location.reload();
  }


  

  ngOnInit() {

    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 500);
    
    console.log(JSON.stringify(sessionStorage.getItem("loginFlag")));
    var loginFlag = sessionStorage.getItem("loginFlag");
    var loginFlagFix = JSON.stringify(loginFlag);
    if(loginFlagFix == "null"){
      sessionStorage.setItem("loginFlag","false");
    }
    else if(sessionStorage.getItem("loginFlag") === "true"){
      this.flag = true;
      console.log("flag?: ", this.flag);
    }
    console.log(JSON.parse(sessionStorage.getItem("loginFlag")));   
  }

  

  
}

@Component({
  templateUrl: './z_login.dialog.html',
  styleUrls: ['./z_login.dialog.css']
})
export class LoginDialogOverview implements OnInit {


  promise: Promise<any>;
  
  
  users: User;
  user: User[];
  constructor(
    public dialogRef: MatDialogRef<LoginSuccessDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loginService : LoginService,
    public dialog: MatDialog
  
  ) { }

  
  ngOnInit() {
   

   
  }

  successDialog(){
    this.dialogRef.close();
        let dialogRef = this.dialog.open(LoginSuccessDialog, {
          width: '400px',
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
    console.log("onNoCLick Works");
  }


  Login(email:string, password:string){
 
        
      

       this.promise = this.loginService.showLogin(email,password).map((userLogin : User) => {

       
          this.users = userLogin;
          
          console.log("works");
          // console.log(userLogin);
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          sessionStorage.setItem('email', JSON.stringify(email));
          sessionStorage.setItem('password', JSON.stringify(password)); 
          
          
          console.log("id: " + userLogin.id);
          sessionStorage.setItem("id", userLogin.id);
          sessionStorage.setItem("name", userLogin.name);
          sessionStorage.setItem("email", userLogin.email);
          sessionStorage.setItem("password", userLogin.password);          
          sessionStorage.setItem("phoneNumber", userLogin.phoneNumber);
          sessionStorage.setItem("birthDate", userLogin.birthDate);
          sessionStorage.setItem("loginFlag",JSON.stringify(true));
          
          
          this.successDialog();

          sessionStorage.setItem("namaBank", userLogin.rekening.namaBank);
          sessionStorage.setItem("noRekening", userLogin.rekening.noRekening);
          sessionStorage.setItem("namaRekening", userLogin.rekening.namaRekening);
          sessionStorage.setItem("addressDetail", userLogin.address.addressDetail);
          sessionStorage.setItem("city", userLogin.address.city);
          sessionStorage.setItem("postalCode", userLogin.address.postalCode);
          
        },
        err => {
          console.log("error occured");

          
        }
      ).toPromise();
        
  
     
    console.log("TESTING");
  }

  setOthers(){
    
  }

  LoginEmailFormControl = new FormControl('', [
    Validators.required
  ]);
  LoginPasswordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  

}

@Component({
  templateUrl: './z_register.dialog.html',
  styleUrls: ['./z_register.dialog.css']
})
export class RegisterDialogOverview implements OnInit {


  promise: Promise<any>;
  users: User;
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<RegisterDialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private registerService: RegisterService
  ) { 
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    console.log("testing register");
  }

  Register(name:String, email : String, password : String, phoneNumber:String, birthDate:Date){
    this.promise = this.registerService.regisService(name,email,password,phoneNumber,birthDate).map((userRegis : User) =>{
     
      this.users = userRegis;
      this.successDialog()
    },err => {
      
      
    }
  
    ).toPromise();
  }
  NameFormControl = new FormControl('', [
    Validators.required
  ]);
  EmailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  PasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);
  ConfPasswordFormControl = new FormControl('', [
    Validators.required
  ]);
  PhoneNumberFormControl = new FormControl('', [
    Validators.required
  ]);
  BirthDateFormControl = new FormControl('', [
    Validators.required
  ]);

   successDialog(){
    this.dialogRef.close();
        let dialogRef = this.dialog.open(RegisterSuccessDialog, {
          width: '400px',
      });
  }

  matcher = new MyErrorStateMatcher();

}

@Component({
  templateUrl: './z_loginFailed.dialog.html',
  styleUrls: ['./z_loginFailed.dialog.css']
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

@Component({
  templateUrl: './z_loginSuccess.dialog.html',
  styleUrls: ['./z_loginSuccess.dialog.css']
})
export class LoginSuccessDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginSuccessDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }

}

@Component({
  templateUrl: './z_registerSuccess.dialog.html',
  styleUrls: ['./z_registerSuccess.dialog.css']
})
export class RegisterSuccessDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RegisterSuccessDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }

}

@Component({
  templateUrl: './z_termsAndCondition.dialog.html',
  styleUrls: ['./z_termsAndCondition.dialog.css']
})
export class TermsAndConditionDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TermsAndConditionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }

}



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


