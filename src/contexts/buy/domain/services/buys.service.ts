import { Injectable, NotFoundException } from '@nestjs/common';
import { Buy } from 'src/contexts/buy/infraestructure/entities/buy.entity';
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

    create(payload: any) {
        this.counterId = this.counterId + 1;
        const newbuys = {
            idBuy: this.counterId,
            ...payload,
        };
        this.buys.push(newbuys);
        return newbuys;
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