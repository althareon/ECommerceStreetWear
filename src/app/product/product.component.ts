import { Component, OnInit, HostListener } from '@angular/core';
import { Product } from "../model/product";
import { GetAllProductService } from "../services/getAllProduct.service";
import { GetAllProductByCategoryService } from "../services/getAllProductByCategory.service";
import { GetAllProductByBrandService } from "../services/getAllProductByBrand.service";
import { GetAllProductByNameService } from "../services/getAllProductByName.service";

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

@HostListener('window:unload', ['$event'])
export class ProductComponent implements OnInit {

  order: string = 'productName';
  products: Product[];
  p: number = 1;
  collection: any[] = this.products; 
  noItem: string = "No Items Found!";

  id1:string = null;
  id2:string = null;

  allProductId1:string = "allProduct1";
  allProductId2:string = "allProduct2";
  
  constructor(
    private getAllProductService: GetAllProductService,
    private getAllProductByCategoryService: GetAllProductByCategoryService,
    private getAllProductByBrandService: GetAllProductByBrandService,
    private getAllProductByNameService : GetAllProductByNameService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getAllProduct();
    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 500);
 
    
    
  }


  takeData(productName:string, productImage: string, productBrand: string, productCategory:string){
    console.log(productName);
    console.log(productBrand);
    console.log(productImage);
    console.log(productCategory);

    sessionStorage.setItem("productName", productName);
    sessionStorage.setItem("productImage", productImage);
    sessionStorage.setItem("productBrand", productBrand);
    sessionStorage.setItem("productCategory", productCategory);

    // var test = sessionStorage.getItem("productName");
    // console.log(JSON.parse(test));
  }


  getAllProduct(){
    var serv = this.getAllProductService.getAllProduct();
    serv.subscribe(
      (allProducts: Product[]) => this.products = allProducts
    );
    document.getElementById(this.allProductId1).style.fontWeight = "bold";
    document.getElementById(this.allProductId2).style.fontWeight = "bold";
    document.getElementById(this.id1).style.fontWeight = "normal";
    document.getElementById(this.id2).style.fontWeight = "normal";
    
  }

  getAllProductByCategory(productCategory: string){
   
    document.getElementById(this.allProductId1).style.fontWeight = "normal";
    document.getElementById(this.allProductId2).style.fontWeight = "normal";

    var serv = this.getAllProductByCategoryService.getAllProductByCategory(productCategory);
    serv.subscribe(
      (allProducts: Product[]) => this.products = allProducts
    );

    if(this.id1 != productCategory && this.id1 != null){
      document.getElementById(this.id1).style.fontWeight = "normal";
    }
    else if(this.id1 == null){
      document.getElementById(productCategory).style.fontWeight = "bold";
    }
    


    document.getElementById(productCategory).style.fontWeight = "bold";
    this.id1 = productCategory;
    document.getElementById(this.id2).style.fontWeight = "normal";
  }

  getAllProductByBrand(productBrand: string){
    
    document.getElementById(this.allProductId1).style.fontWeight = "normal";
    document.getElementById(this.allProductId2).style.fontWeight = "normal";
    
    var serv = this.getAllProductByBrandService.getAllProductByBrand(productBrand);
    serv.subscribe(
      (allProducts: Product[]) => this.products = allProducts
    );

    if(this.id2 != productBrand && this.id2 != null){
      

      document.getElementById(this.id2).style.fontWeight = "normal";
    }
    else if(this.id2 == null){
      document.getElementById(productBrand).style.fontWeight = "bold";
    }
    
      
    
    
    document.getElementById(productBrand).style.fontWeight = "bold";
    this.id2 = productBrand;
    document.getElementById(this.id1).style.fontWeight = "normal";
  }

  getAllProductByName(productName: string){

    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 500);

    var serv = this.getAllProductByNameService.getAllProductByName(productName);
    serv.subscribe(
      (allProducts: Product[]) => this.products = allProducts
    );
  }
  
}
