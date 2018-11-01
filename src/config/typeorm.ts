export default {
    type: process.env.TYPEORM_CONNECTION,
    PORT: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    HOST: process.env.TYPEORM_HOST,
    logging: process.env.TYPEORM_LOGGING,
    entities: process.env.TYPEORM_ENTITIES,
    url: process.env.TYPEORM_URL,
}