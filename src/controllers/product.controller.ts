import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from '../services/products.service';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductService) { }

    @Get()
    getProducts() {
        return this.productService.findAll();
    }

    @Get(':id')
    getProduct(@Param('id') id: number) {
        return this.productService.findOne(id);
    }

    @Post()
    create(@Body() payload: any) {
        return this.productService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: any) {
        return this.productService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.productService.remove(id);
    }

}