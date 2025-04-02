"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPeople = void 0;
const person_1 = require("../models/person");
const population_1 = require("../models/population");
const zone_1 = require("../models/zone");
const getAllPeople = (req, res) => {
    person_1.Person.findAll({
        include: [
            {
                model: population_1.Population,
                include: [
                    {
                        model: zone_1.Zone,
                    },
                ],
            },
        ],
    })
        .then((data) => {
        return res.status(200).json({
            message: "Personas obtenidas correctamente",
            payload: data,
            status: "success",
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: "Error al obtener las personas",
            payload: null,
            status: "error",
        });
    });
};
exports.getAllPeople = getAllPeople;
