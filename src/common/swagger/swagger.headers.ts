import { ApiHeader, ApiOperation } from '@nestjs/swagger';

export const SwaggerHeaders = {
    products: {
        name: 'Products controller',
        description: 'Controller to get products by id, create and update them',
        endpoints: {
            all: 'Get all products',
            id: 'Get product by Id',
            create: 'Create products',
            updateById: 'Update products by Id',
            delete: 'Delete products by Id'
        },
    },

    buys: {
        name: 'Buys controller',
        description: 'Controller to get Buys by id, create and update them',
        endpoints: {
            all: 'Get all buys',
            id: 'Get buy by Id',
            create: 'Create buy',
            updateById: 'Update buy by Id',
            delete: 'Delete buy by Id'
        },
    },

};

export const SwaggerHeader = (controllerName: string) => {
    return ApiHeader({
        name: SwaggerHeaders[controllerName].name,
        description: SwaggerHeaders[controllerName].description,
    });
};

export const SwaggerOperations = (controllerName: string, method: string) => {
    return ApiOperation({
        summary: SwaggerHeaders[controllerName].endpoints[method],
    });
};
