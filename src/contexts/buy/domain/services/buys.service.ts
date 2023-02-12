import { Injectable, NotFoundException } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common/exceptions';
import { Buy } from 'src/contexts/buy/infraestructure/entities/buy.entity';
import { ProductService } from 'src/contexts/products/domain/services/products.service';
import { CreateBuyDto } from '../dtos/buys.dto';

@Injectable()
export class BuyService {

    constructor(private readonly productService: ProductService) { }

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
    private listProducts = this.productService.findAll();


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
        const productExist = await this.validateExistProduct(payload);
        const productQuantity = await this.validateQuantityProduct(payload);

        this.counterId = this.counterId + 1;

        if (productEnabled && productExist && productQuantity) {
            const newbuys = {
                idBuy: this.counterId,
                ...payload,
            };
            this.buys.push(newbuys);
            this.subtractQuantityOfProducts(payload);
            return (newbuys);
        }
        throw new NotAcceptableException(`Error con el producto que se intenta agregar`);


    }

    validateExistProduct(payload: any) {
        const productsBuy = payload.products;
        let i: any;
        let bandera = false;

        for (i = 0; i < productsBuy.length; i++) {
            let val = this.productService.findOne(productsBuy[i].id);
            console.log(val);

            bandera = (val == undefined)
                ? false && function () {
                    throw new NotAcceptableException(`product with id ${this.listProducts[i].id} not enabled`)
                }
                : true;
        }


        return bandera;
    }

    validateQuantityProduct(payload: any) {
        const productsBuy = payload.products;
        let i: any;
        let bandera = false;
        for (i = 0; i < productsBuy.length; i++) {
            let val =  this.productService.findOne(productsBuy[i].id);
            let indexProduct = this.listProducts.findIndex((i) => i.id = val.id)

            bandera = (productsBuy[i].quantity >= this.listProducts[indexProduct].inInventory)
                ?false && function(){
                    throw new NotAcceptableException(`product with id ${this.listProducts[i].id}, no stock, at this moment we can only sell ${productsBuy[i].quantity} amount of this product`);
                } :true;
        }

        return bandera;
    }

    async validateEnabledProducts(payload: any) {
            const productsBuy = payload.products;
            let i: any;
            let bandera = false;

            for (i = 0; i < productsBuy.length; i++) {
                let val = await this.productService.findOne(productsBuy[i].id);

                bandera = !val.enabled
                ?false && function(){
                    throw new NotAcceptableException(`product with id ${this.listProducts[i].id} not enabled`);
                }: true;
            }
            return bandera;
        }

        subtractQuantityOfProducts(payload: any){
            const productsBuy = payload.products;
            for (let i = 0; i < productsBuy.length; i++) {
                let val =  this.productService.findOne(productsBuy[i].id);
                //let indexProduct = this.listProducts.findIndex((i) => i.id = (val.id))
                this.productService.update(val.id, {
                    inInventory: val.inInventory - productsBuy[i].quantity
                })
            }
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