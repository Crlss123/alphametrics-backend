"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyPerson = exports.getAllPeople = void 0;
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
const modifyPerson = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            message: "No se proporcionaron datos para modificar la persona",
            payload: null,
            status: "error",
        });
        return;
    }
    person_1.Person.update({ ...req.body }, { where: { id: req.params.id } })
        .then((isUpdated) => {
        if (isUpdated[0] > 0) {
            res.status(200).json({
                status: "success",
                message: "Persona modificada correctamente",
                payload: { ...req.body },
            });
        }
        else {
            res.status(500).json({
                status: "error",
                message: "Error al modificar la persona",
                payload: null,
            });
        }
    })
        .catch((error) => {
        res.status(500).json({
            status: "error",
            message: "Algo salió mal al intentar modificar la persona " + error.message,
            payload: null,
        });
    });
};
exports.modifyPerson = modifyPerson;
