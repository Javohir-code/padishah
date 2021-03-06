export default () => ({
  env: process.env.APP_ENV,
  port: Number(process.env.PORT),
  jwtSecret: process.env.USER_JWT_SECRET,
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    sync: Boolean(process.env.DB_TYPEORM_SYNC)
  },
  admin: {
    jwtSecret: process.env.ADMIN_JWT_SECRET
  },
  sms_service: {
    url: process.env.SMS_API,
    username: process.env.SMS_USERNAME,
    password: process.env.SMS_PASSWORD,
    orginator: process.env.SMS_ORGINATOR,
    auth: process.env.SMS_AUTH
  },
  click_service: {
    service_id: process.env.SERVICE_ID,
    merchant_id: process.env.MERCHANT_ID,
    secret_key: process.env.SECRET_KEY,
    merchant_user_id: process.env.MERCHANT_USER_ID
  },
  payme_service: {
    merchant_id: process.env.PAYME_MERCHANT_ID,
    key: process.env.PAYME_KEY,
    test_key: process.env.PAYME_TEST_KEY
  },
  awsSecret: process.env.AWS_SECRET,
  awsAccess: process.env.AWS_ACCESS,
  awsS3Bucket: process.env.AWS_S3_BUCKET
});
