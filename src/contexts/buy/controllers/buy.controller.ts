import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BuyService } from '../domain/services/buys.service';
import { CreateBuyDto, UpdateBuyDto } from '../domain/dtos/buys.dto';
import { SwaggerHeader, SwaggerOperations } from '../../../common/swagger/swagger.headers';
import { ApiTags } from '@nestjs/swagger';
import {
    SwaggerResponsesDelete,
    SwaggerResponsesPost,
    SwaggerResponsesPut,
    SwaggerResponsesGets,
} from '../../../common/swagger/swagger.responses';

@Controller('buys')
@SwaggerHeader('buys')
@ApiTags('Buys')
export class BuyController {
    constructor(private buyService: BuyService) { }

    @Get()
    @SwaggerOperations('buys', 'all')
    @SwaggerResponsesGets()
    getBuys() {
        return this.buyService.findAll();
    }

    @Get(':id')
    @SwaggerOperations('buys', 'id')
    @SwaggerResponsesGets()
    getBuy(@Param('id') id: number) {
        return this.buyService.findOne(id);
    }

    @Post()
    @SwaggerOperations('buys', 'create')
    @SwaggerResponsesPost()
    create(@Body() payload: CreateBuyDto) {
        return this.buyService.create(payload);
    }

    @Put(':id')
    @SwaggerOperations('buys', 'updateById')
    @SwaggerResponsesPut()
    update(@Param('id') id: number, @Body() payload: UpdateBuyDto) {
        return this.buyService.update(id, payload);
    }

    @Delete(':id')
    @SwaggerOperations('buys', 'delete')
    @SwaggerResponsesDelete()
    delete(@Param('id') id: number) {
        return this.buyService.remove(id);
    }
}

