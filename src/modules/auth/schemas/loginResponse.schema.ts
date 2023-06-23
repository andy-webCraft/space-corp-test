import { ApiResponseOptions } from '@nestjs/swagger';

export const loginResponse: ApiResponseOptions = {
  schema: {
    type: 'object',
    properties: {
      user: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          login: { type: 'string' },
        },
      },
      accessToken: { type: 'string' },
    },
  },
};
