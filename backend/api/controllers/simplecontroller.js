// Import our config file
const config = require("../../config");

// Import some other libraries/SDKs we'll need for this file as well
const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

exports.helloworld = function (request, result) {
    result.json(config.name);
}