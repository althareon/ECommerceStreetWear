import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, ErrorStateMatcher } from '@angular/material';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { UpdateAddressService } from '../services/updateAddress.service';
import { User } from '../model/user';
import { UpdateRekeningService } from '../services/updateRekening.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  name:string;
  email:string;
  phoneNumber:string;
  addressDetail: string;
  city:string;
  postalCode:string;
  
  namaBank : string;
  noRekening: string;
  namaRekening: string;

  flag:boolean = false;

  flag2:boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
   this.verify();
  }


  verify(){
    if(sessionStorage.getItem("addressDetail") == null || sessionStorage.getItem("city") == null || sessionStorage.getItem("postalCode") == null){
      this.flag = false;
    }
    else{
      this.flag = true;
      this.getData();
    }

    if(sessionStorage.getItem("namaBank") == null || sessionStorage.getItem("noRekening") == null || sessionStorage.getItem("namaRekening") == null){
      this.flag2 = false;
    }
    else{
      this.flag2 = true;
      this.getData2();
    }
  }
  getData(){
    this.name = sessionStorage.getItem("name");
    this.email= sessionStorage.getItem("email");
    this.phoneNumber = sessionStorage.getItem("phoneNumber");
    this.addressDetail = sessionStorage.getItem("addressDetail");
    this.city = sessionStorage.getItem("city");
    this.postalCode= sessionStorage.getItem("postalCode");
  }
 
  getData2(){
    this.namaBank = sessionStorage.getItem("namaBank");
    this.noRekening= sessionStorage.getItem("noRekening");
    this.namaRekening = sessionStorage.getItem("namaRekening");
  }

  updateAddressDialog(): void {
    let dialogRef = this.dialog.open(UpdateAddressDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
      this.verify();
    });
  }

  updateRekeningDialog(): void {
    let dialogRef = this.dialog.open(UpdateRekeningDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData2();
      this.verify();
    });
  }



}


@Component({
  templateUrl: './z_updateAddress.dialog.html',
  styleUrls: ['./z_updateAddress.dialog.css']
})
export class UpdateAddressDialog implements OnInit {

  
  

  promise: Promise<any>;
  updateAdd: User;
  
  constructor(
    public dialogRef: MatDialogRef<UpdateAddressDialog>,
    public dialog: MatDialog,
    private updateAddressService: UpdateAddressService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    

   
  }

  updateAddress(city:string, postalCode:string, addressDetail:string){

    

    var email = sessionStorage.getItem("email");
    this.promise = this.updateAddressService.updateAddress(email,city,postalCode,addressDetail)
    .map((upAdd : User) =>{
      this.updateAdd = upAdd;
      this.successDialog();

      sessionStorage.setItem("addressDetail", addressDetail);
      sessionStorage.setItem("city", city);
      sessionStorage.setItem("postalCode", postalCode);
      this.dialogRef.close();

    },err => {
      console.log("error occured");
      
    }
  
    ).toPromise();

  }

  successDialog(): void {
    let dialogRef = this.dialog.open(SuccessProfileDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

  CityFormControl = new FormControl('', [
    Validators.required
  ]);
  PostalCodeFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);
  AddressDetailFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

}

@Component({
  templateUrl: './z_success.dialog.html',
  styleUrls: ['./z_success.dialog.css']
})
export class SuccessProfileDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SuccessProfileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }



}


@Component({
  templateUrl: './z_updateRekening.dialog.html',
  styleUrls: ['./z_updateRekening.dialog.css']
})
export class UpdateRekeningDialog implements OnInit {

  promise: Promise<any>;
  updateRek: User;
  
  constructor(
    public dialogRef: MatDialogRef<UpdateRekeningDialog>,
    public dialog: MatDialog,
    public updateRekeningService : UpdateRekeningService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    

   
  }

  updateRekening(namaBank:string, noRekening:string, namaRekening:string){

    

    var email = sessionStorage.getItem("email");
    this.promise = this.updateRekeningService.updateRekening(email,namaBank,noRekening,namaRekening)
    .map((upRek : User) =>{
      this.updateRek = upRek;
      this.successDialog();

      sessionStorage.setItem("namaBank", namaBank);
      sessionStorage.setItem("noRekening", noRekening);
      sessionStorage.setItem("namaRekening", namaRekening);
      this.dialogRef.close();

    },err => {
      console.log("error occured");
      
    }
  
    ).toPromise();

  }

  successDialog(): void {
    let dialogRef = this.dialog.open(SuccessProfileDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

  NamaBankFormControl = new FormControl('', [
    Validators.required
  ]);
  NoRekeningFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10)
  ]);
  
  NamaRekeningFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

}



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}