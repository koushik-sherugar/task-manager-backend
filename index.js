const serverless = require("serverless-http");
const app = require("./app"); // Assuming your Express setup is exported from app.js

module.exports.handler = serverless(app);
