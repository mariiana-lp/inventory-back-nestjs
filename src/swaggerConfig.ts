import { DocumentBuilder } from "@nestjs/swagger";
import { SwaggerConfig } from "./common/constants/swagger.const";

export const config = new DocumentBuilder()
    .setTitle(SwaggerConfig.title)
    .setDescription(SwaggerConfig.description)
    .setVersion(SwaggerConfig.setVersion)
    .addTag(SwaggerConfig.addtag)
    .build();