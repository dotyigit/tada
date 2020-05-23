var Sequelize = require('sequelize');
var Secret = require('../secret');

var sequelize = new Sequelize(Secret.DB_NAME, Secret.DB_USER, Secret.DB_PASS, {
    host: Secret.DB_HOST,
    dialect: 'mysql',
});

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.todos = require("./todo.model.js")(sequelize, Sequelize);

module.exports = db;