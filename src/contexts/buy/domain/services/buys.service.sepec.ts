import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../../products/domain/services/products.service';
import { BuyService } from './buys.service';

describe('BuysService', () => {
    let service: BuyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BuyService],
        }).compile();

        service = module.get<BuyService>(BuyService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
})