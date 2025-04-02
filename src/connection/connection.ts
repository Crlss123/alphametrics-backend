import { Sequelize } from "sequelize-typescript";
import { Person } from "../models/person";
import { Zone } from "../models/zone";
import { Population } from "../models/population";

const connection = new Sequelize({
  database: "alpha_db",
  dialect: "mysql",
  username: "root",
  password: "C4rl0s2005!", //C4rl0s2005!
  host: "localhost",
  port: 3306,
  models: [Person, Zone, Population],
  logging: false,
});

async function connectionDB() {
  try {
    await connection.authenticate();
    console.log("Conexión a MySQL establecida correctamente.");
    await connection.sync({ alter: true });
  } catch (error) {
    console.log("Error al conectar la base de datos:", error);
  }
}

export default connectionDB;
