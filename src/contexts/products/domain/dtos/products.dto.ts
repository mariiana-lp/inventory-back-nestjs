import { IsNumber, IsString, IsBoolean, IsNotEmpty, IsPositive } from "class-validator";
import { PartialType } from '@nestjs/mapped-types'

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly inInventory: number;

    @IsBoolean()
    readonly enabled: boolean;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly min: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly max: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsNumber()
    id: number;
}

export class ReadProductDto extends PartialType(CreateProductDto) {
    @IsNumber()
    id: number;
}