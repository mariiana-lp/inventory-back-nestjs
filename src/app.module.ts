import { Module } from '@nestjs/common';
import { ProductsController } from './contexts/products/controllers/product.controller';
import { ProductService } from './contexts/products/domain/services/products.service';
import { BuyController } from './contexts/buy/controllers/buy.controller';
import { BuyService } from './contexts/buy/domain/services/buys.service';

@Module({
  imports: [],
  controllers: [ProductsController, BuyController],
  providers: [ProductService, BuyService],
})
export class AppModule {}
