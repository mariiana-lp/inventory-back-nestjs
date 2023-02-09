import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '../domain/services/products.service';
import { CreateProductDto, UpdateProductDto } from '../domain/dtos/products.dto';
import { SwaggerHeader, SwaggerOperations } from '../../../common/swagger/swagger.headers';
import {
    SwaggerResponsesDelete,
    SwaggerResponsesPost,
    SwaggerResponsesPut,
    SwaggerResponsesGets,
} from '../../../common/swagger/swagger.responses';


@Controller('products')
@ApiTags('Products')
@SwaggerHeader('products')
export class ProductsController {
    constructor(private productService: ProductService) { }

    @Get()
    @SwaggerOperations('products', 'all')
    @SwaggerResponsesGets()
    getProducts() {
        return this.productService.findAll();
    }

    @Get(':id')
    @SwaggerOperations('products', 'id')
    @SwaggerResponsesGets()
    getProduct(@Param('id') id: number) {
        return (this.productService.findOne(id));
    }

    @Post()
    @SwaggerOperations('products', 'create')
    @SwaggerResponsesPost()
    create(@Body() payload: CreateProductDto) {
        return this.productService.create(payload);
    }

    @Put(':id')
    @SwaggerOperations('products', 'updateById')
    @SwaggerResponsesPut()
    update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
        return this.productService.update(id, payload);
    }

    @Delete(':id')
    @SwaggerOperations('products', 'delete')
    @SwaggerResponsesDelete()
    delete(@Param('id') id: number) {
        return this.productService.remove(id);
    }

}