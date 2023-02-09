import { BuyService } from "../domain/services/buys.service";
import { BuyController } from "./buy.controller";
import { Test, TestingModule } from '@nestjs/testing';
import { CreateBuyDto, ReadBuyDto, UpdateBuyDto } from '../domain/dtos/buys.dto';



describe('BuyController', () => {
    let controller: BuyController;
    let service: BuyService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BuyController],
            providers: [BuyService],   
        }).compile();

        controller = module.get<BuyController>(BuyController);
        service = module.get<BuyService>(BuyService);  
    })

    describe('methods buys controller', () => {

        it('create buy', () => {
            const dto = new CreateBuyDto();
            expect(controller.create(dto)).not.toEqual(null);
        });

        it("getBuys", () => {
            expect(controller.getBuys()).not.toBeNull;
        });

        it("get buy by id", () => {
            const dto = new ReadBuyDto();
            dto.idBuy = 1;
            expect(controller.getBuy(dto.idBuy)).not.toBeNull;
        });

        it("update buy successful", () => {
            const dto = new ReadBuyDto();
            dto.idBuy = 1;
            const payload = {
                clientName: 'Mari'
            }
            expect(controller.update(dto.idBuy, payload)).not.toBeNull;
            const result = controller.getBuy(dto.idBuy);
            expect(result.clientName).toEqual(payload.clientName);
        });

        it('remove buy by id successfull', () => {
            const dto = new ReadBuyDto();
            dto.idBuy = 1;
            expect(controller.delete(dto.idBuy)).not.toBeNull;
            const result = controller.getBuys();
            expect(result.find(b => b.idBuy === dto.idBuy)).toBeNull;
        });
    })
})