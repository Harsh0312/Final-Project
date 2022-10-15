export interface BasketItem {
    idMed: number;
    nameMed: string;
    priceMed: number;
    descriptionMed?: any;
    category: string;
    sellerMed: string;
    imagePathMed?: any;
    quantity: number;
}

export interface Basket {
    id: number;
    buyerId: string;
    items: BasketItem[];
}



