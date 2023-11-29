import { APIGatewayProxyHandler } from 'aws-lambda';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator'
import { transpileSchema } from '@middy/validator/transpile'
import schema from '../schema/hello';
import inputOutputLogger from '@middy/input-output-logger';


const baseHandler: APIGatewayProxyHandler = async (event) => {
  const { name, lastName, age } = event.body as unknown as { name: string; lastName: string; age: number; };

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Received data for ${name} ${lastName}, age ${age}`,
    }),
  };
};

export const handler = middy()
  .use(inputOutputLogger())
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(validator({ eventSchema: transpileSchema(schema) }))
  .use(httpErrorHandler())
  .handler(baseHandler);
