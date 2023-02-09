import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BuyService } from '../domain/services/buys.service';
import { CreateBuyDto, UpdateBuyDto } from '../domain/dtos/buys.dto';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';

@Controller('buys')
@ApiTags('Cases')
@UseFilters(HttpExceptionFilter)
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
    create(@Body() payload: CreateBuyDto) {
        return this.buyService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateBuyDto) {
        return this.buyService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.buyService.remove(id);
    }
}

