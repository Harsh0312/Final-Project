import { StringDecoder } from "string_decoder";

export interface Medicine{
    idMed: number;
    nameMed: string;
    priceMed: number;
    descriptionMed?: any;
    category: string;
    sellerMed: string;
    imagePathMed?: any;
    quantity:number;
}