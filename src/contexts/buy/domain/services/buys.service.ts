import { Injectable, NotFoundException } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common/exceptions';
import { Buy } from 'src/contexts/buy/infraestructure/entities/buy.entity';
import { ProductService } from 'src/contexts/products/domain/services/products.service';
import { ReadBuyDto, CreateBuyDto } from '../dtos/buys.dto';
import { Product } from '../../../products/infraestructure/entities/product.entity';
@Injectable()
export class BuyService {

    private counterId = 1;
    private currentDate = new Date();
    private buys: Buy[] = [{
        idBuy: 1,
        date: this.currentDate,
        idType: 'CC',
        id: "103748422",
        clientName: 'Alejandra',
        products: [{
            idproduct: 1,
            quantity: 5
        }],
    }];
    private products: Product[] = [{
        id: 1,
        name: 'Camiseta',
        inInventory: 5,
        enabled: true,
        min: 2,
        max: 10
    }];

    private productService: ProductService;

    findAll() {
        if (this.buys.length < 0) {
            throw new NotFoundException('buys not found');
        }
        return this.buys;
    }

    findOne(id: number) {
        const buys = this.buys.find((item) => item.idBuy == id);
        if (!buys) {
            throw new NotFoundException(`buys #${id} not found`);
        }
        return buys;
    }

    async create(payload: CreateBuyDto) {
        const productEnabled = await this.validateEnabledProducts(payload);
        this.counterId = this.counterId + 1;

        if (productEnabled) {
            const newbuys = {
                idBuy: this.counterId,
                ...payload,
            };
            this.buys.push(newbuys);
            console.log(productEnabled);
            return (newbuys);
        }
        console.log(productEnabled);
        throw new NotAcceptableException(`Error con el producto que se intenta agregar`);


    }


    //refactor pendiente
    validateEnabledProducts(payload: any) {

        const productsBuy = payload.products;
        let i: any;
        let bandera = false;

        console.log("entre a la validacion")
        for (i = 0; i < productsBuy.length; i++) {
            let val = this.products.find(p => p.id === productsBuy[i].id);
            let Idproduct = productsBuy[i].id;
            const indexProduct = this.products.findIndex((i) => i.id = Idproduct)

            if (val == undefined) {
                throw new NotFoundException(`product with id ${this.products[i].id} not found`);
            } else if (!this.products[indexProduct].enabled) {
                throw new NotAcceptableException(`product with id ${this.products[i].id} not enabled`);
            } else if (!(productsBuy[i].quantity >= this.products[indexProduct].inInventory)) {
                throw new NotAcceptableException(`product with id ${this.products[i].id}, no stock, at this moment we can only sell ${productsBuy[i].quantity} amount of this product`);
            } else {
                bandera = true;
            }

        }

        return bandera;
    }

    update(id: number, payload: any) {
        const buys = this.findOne(id);

        if (buys) {
            const i = this.buys.findIndex((i) => i.idBuy == id)
            this.buys[i] = {
                ...buys,
                ...payload
            };
            return this.buys[i];
        }
        return null;
    }


    remove(id: number) {
        const index = this.buys.findIndex((item) => item.idBuy == id);
        if (index === -1) {
            throw new NotFoundException(`buys #${id} not found`);
        }
        this.buys.splice(index, 1);
        return true;
    }
}