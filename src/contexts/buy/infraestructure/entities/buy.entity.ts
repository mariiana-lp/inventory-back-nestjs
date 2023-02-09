import { Product } from "../../../products/infraestructure/entities/product.entity";

export class Buy {
    idBuy: number;
    date: Date;
    idType: String;
    id: String;
    clientName: String;
    products: any[];
}