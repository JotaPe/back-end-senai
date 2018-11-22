export default {
    name: process.env.npm_package_name,
    version: process.env.npm_package_version,
    description: process.env.npm_package_description,
    env: process.env.NODE_ENV,
    tags: process.env.npm_package_tags,
    port: process.env.PORT,
    host: process.env.HOST,
};
