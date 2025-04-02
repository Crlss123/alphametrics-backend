"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const person_1 = require("../models/person");
const zone_1 = require("../models/zone");
const population_1 = require("../models/population");
const connection = new sequelize_typescript_1.Sequelize({
    database: "alpha_db",
    dialect: "mysql",
    username: "root",
    password: "123456", //C4rl0s2005!
    host: "localhost",
    port: 3306,
    models: [person_1.Person, zone_1.Zone, population_1.Population],
    logging: false,
});
async function connectionDB() {
    try {
        await connection.authenticate();
        console.log("Conexión a MySQL establecida correctamente.");
        await connection.sync({ alter: true });
    }
    catch (error) {
        console.log("Error al conectar la base de datos:", error);
    }
}
exports.default = connectionDB;
