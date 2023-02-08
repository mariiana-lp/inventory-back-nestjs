import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BuyService } from '../domain/services/buys.service';

@Controller('buys')
export class BuyController {
    constructor(private buyService: BuyService){}

    @Get()
    getBuys() {
        return this.buyService.findAll();
    }

    @Get(':id')
    getBuy(@Param('id') id: number) {
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