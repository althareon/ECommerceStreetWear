export interface User{
    id : string;
    adminRole : boolean;
    name: string;
    email: string;
    password: string;
     address: {
        addressDetail: string;
        city: string;
        postalCode: string;
    };
    phoneNumber: string;
    birthDate: string;
    cart: {
        transactionId: string;
        productImage: string;
        productName: string;
        productBrand: string;
        productCategory: string;
        productPrice: number;
        productQuantity: number;
        totalPrice: number;
    };
    rekening: {
        namaBank: string;
        noRekening: string;
        namaRekening: string;
    }
}