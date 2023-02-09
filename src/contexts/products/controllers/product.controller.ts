import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { response } from 'express';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import { ProductService } from '../domain/services/products.service';
import { CreateProductDto, ReadProductDto, UpdateProductDto } from '../domain/dtos/products.dto';
import { UpdateBuyDto } from '../../buy/domain/dtos/buys.dto';



@Controller('products')
@ApiTags('Products')
@UseFilters(HttpExceptionFilter)
export class ProductsController {
    constructor(private productService: ProductService) { }

    @Get()
    getProducts() {
        return this.productService.findAll();
    }

    @Get(':id')
    getProduct(@Param('id') id: number) {
        return (this.productService.findOne(id));
    }       

    @Post()
    create(@Body() payload: CreateProductDto) {
        return this.productService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
        return this.productService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.productService.remove(id);
    }

}