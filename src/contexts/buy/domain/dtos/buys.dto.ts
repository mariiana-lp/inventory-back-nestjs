import { IsNotEmpty, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';

export class CreateBuyDto {
    @IsNotEmpty()
    readonly date: Date;

    @IsString()
    @IsNotEmpty()
    readonly idType: String;

    @IsString()
    @IsNotEmpty()
    readonly clientName: String;

    @IsNotEmpty()
    readonly products: any[];

    @IsNotEmpty()
    @IsString()
    readonly id: string;
}

export class UpdateBuyDto extends PartialType(CreateBuyDto){}

export class ReadBuyDto extends PartialType(CreateBuyDto){
   idBuy: number; 
}