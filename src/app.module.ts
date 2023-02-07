import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/product.controller';
import { ProductService } from './domain/services/products.service';
import { BuyController } from './controllers/buy.controller';
import { BuyService } from './domain/services/buys.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, BuyController],
  providers: [AppService, ProductService, BuyService],
})
export class AppModule {}
