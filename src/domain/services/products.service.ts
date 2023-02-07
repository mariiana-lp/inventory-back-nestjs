import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/infraestructure/entities/product.entity';

@Injectable()
export class ProductService {
    private counterId = 1;
    private products: Product[] = [{
        id: 1,
        name: 'Camiseta',
        inInventory: 5,
        enabled: false,
        min: 2,
        max: 10
    }];

    findAll() {
        if (this.products.length < 0) {
            throw new NotFoundException('products not found');
        }
        return this.products;
    }

    findOne(id: number) {
        const product = this.products.find((item) => item.id == id);
        if (!product) {
            throw new NotFoundException(`product #${id} not found`);
        }
        return product;
    }

    create(payload: any) {
        this.counterId = this.counterId + 1;
        const newproduct = {
            id: this.counterId,
            ...payload,
        };
        this.products.push(newproduct);
        return newproduct;
    }

    update(id: number, payload: any) {
        const product = this.findOne(id);

        if (product) {
            const i = this.products.findIndex((i) => i.id == id)
            this.products[i] = {
                ...product,
                ...payload
            };
            return this.products[i];
        }
        return null;
    }


    remove(id: number) {
        const index = this.products.findIndex((item) => item.id == id);
        if (index === -1) {
            throw new NotFoundException(`product #${id} not found`);
        }
        this.products.splice(index, 1);
        return true;
    }
}