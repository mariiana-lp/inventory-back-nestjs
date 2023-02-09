import { applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
  ApiCreatedResponse
} from '@nestjs/swagger';
import { SwaggerConfig } from '../constants/swagger.const';

export const SwaggerResponsesPost = () => applyDecorators(
  ApiForbiddenResponse({ description: SwaggerConfig.responses[403] }),
  ApiNotFoundResponse({ description: SwaggerConfig.responses[404] }),
  ApiUnprocessableEntityResponse({ description: SwaggerConfig.responses[422] }),
  ApiCreatedResponse({ description: SwaggerConfig.responses[201]})
);

export const SwaggerResponsesGets = () => applyDecorators(
  ApiOkResponse({ description: SwaggerConfig.responses[200] }),
  ApiForbiddenResponse({ description: SwaggerConfig.responses[403] }),
  ApiNotFoundResponse({ description: SwaggerConfig.responses[404] }),  
);

export const SwaggerResponsesPut = () => applyDecorators(
  ApiOkResponse({ description: SwaggerConfig.responses[200] }),
  ApiForbiddenResponse({ description: SwaggerConfig.responses[403] }),
  ApiNotFoundResponse({ description: SwaggerConfig.responses[404] }),
  ApiUnprocessableEntityResponse({ description: SwaggerConfig.responses[422] }),
);

export const SwaggerResponsesDelete = () => applyDecorators(
    ApiOkResponse({ description: SwaggerConfig.responses[200] }),
    ApiForbiddenResponse({ description: SwaggerConfig.responses[403] }),
    ApiNotFoundResponse({ description: SwaggerConfig.responses[404] }),
    ApiUnprocessableEntityResponse({ description: SwaggerConfig.responses[422] }),
  );

