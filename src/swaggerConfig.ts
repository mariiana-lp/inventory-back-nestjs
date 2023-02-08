import { DocumentBuilder } from "@nestjs/swagger";

export const config = new DocumentBuilder()
    .setTitle('Inventory')
    .setDescription('The inventory API description')
    .setVersion('1.0')
    .addTag('Inventory')
    .build();