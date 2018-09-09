export interface Transaction{
    id: string;
    buyerEmail: string;
    sellerEmail: string;
    productImage: string;
    productName: string;
    productBrand: string;
    productCategory:string;
    productSize: string;
    productPrice: number;
    sellerStatus: string;
    delivery:{
        trackNumSellerToUs:string;
        statusPhase1:string;
        trackNumUsToSeller:string;
        statusBackupPhase:string;
        deliveryCourier:string;
    }
    verifyStatus:string;
    verifyNote:string;
    overallStatus:string;
    paymentToSeller:{
        namaBank:string;
        noRekening:string;
        namaRekening: string;
        nilaiTransfer: string;
        paymentStatus: string;
    }
    paymentToBuyer:{
        namaBank:string;
        noRekening:string;
        namaRekening: string;
        nilaiTransfer: string;
        paymentStatus: string;
    }
    localDateTime: Date;
    checkOutId: string
}
