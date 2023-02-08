import { ProductsController } from './product.controller';
import { ProductService } from '../domain/services/products.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto, ReadProductDto } from '../domain/dtos/products.dto';

describe('ProductsController', () => {
    let controller: ProductsController;
    let service: ProductService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [ProductService],
        }).compile();

        controller = module.get<ProductsController>(ProductsController);
        service = module.get<ProductService>(ProductService);
    })

    describe('methods products controller', () => {

        it('create product', () => {
            const dto = new CreateProductDto();
            expect(controller.create(dto)).not.toEqual(null);
        });

        it("getProducts", () => {
            expect(controller.getProducts()).not.toBeNull;
        });

        it("get product by id", () => {
            const dto = new ReadProductDto();
            dto.id = 1;
            expect(controller.getProduct(dto.id)).not.toBeNull;
        });

        it("update product successful", () => {
            const dto = new ReadProductDto();
            dto.id = 1;
            const payload = {
                name: 'Buzo'
            }
            expect(controller.update(dto.id, payload)).not.toBeNull;
            const result = controller.getProduct(dto.id);
            expect(result.name).toEqual(payload.name);
        });

        it('remove product by id successfull', () => {
            const dto = new ReadProductDto();
            dto.id = 1;
            expect(controller.delete(dto.id)).not.toBeNull;
            const result = controller.getProducts();
            expect(result.find(p => p.id === dto.id)).toBeNull;
        });

    })
});