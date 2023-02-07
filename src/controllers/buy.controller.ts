import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BuyService } from 'src/services/buys.service';

@Controller('buys')
export class BuyController {
    constructor(private buyService: BuyService){}

    @Get()
    getProducts() {
        return this.buyService.findAll();
    }

    @Get(':id')
    getProduct(@Param('id') id: number) {
        return this.buyService.findOne(id);
    }

    @Post()
    create(@Body() payload: any) {
        return this.buyService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: any) {
        return this.buyService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.buyService.remove(id);
    }
}