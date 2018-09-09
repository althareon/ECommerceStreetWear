export interface Checkout{
    id: string;
    email: string;
    transactionId: {
        transactionId:string;
        productName:string;
    };
    grandTotal: number;
    namaBank: string;
    noRekening: string;
    namaRekening: string;
    nilaiTransfer: number;
    paymentStatus: string;
    trackNumUsToBuyer: string;
    statusPhase2: string;
    deliveryCourier: string;
    buyerReceivedStatus:string;
    localDateTime: Date;
}