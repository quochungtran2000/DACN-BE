import swaggerStats from 'swagger-stats';

export const swaggerMiddleware = swaggerStats.getMiddleware({
  name: 'backend',
  version: '1.0',
  timelineBucketDuration: 60000,
  uriPath: '/api/v1/dashboard',
  durationBuckets: [500, 1000, 5000, 10000, 20000, 50000, 100000],
  requestSizeBuckets: [500, 5000, 15000, 50000],
  responseSizeBuckets: [600, 6000, 6000, 60000],
  apdexThreshold: 50,
});
