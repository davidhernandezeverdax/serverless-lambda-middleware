import type { AWS } from '@serverless/typescript';

import schema from './src/schema/hello';

const serverlessConfiguration: AWS = {
  service: 'serverless-lambda-middleware',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  functions: {
    hello: {
      handler: `src/handlers/hello.handler`,
      events: [
        {
          http: {
            method: 'post',
            path: 'hello',
            request: {
              schemas: {
                'application/json': schema,
              },
            },
          },
        },
      ],
    }
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
