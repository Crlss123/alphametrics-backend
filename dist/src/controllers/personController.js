"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersonById = exports.modifyPerson = exports.getAllPeople = exports.createPerson = void 0;
const person_1 = require("../models/person");
const population_1 = require("../models/population");
const zone_1 = require("../models/zone");
const createPerson = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }
    const person = { ...req.body };
    person_1.Person.create(person)
        .then((data) => {
        res.status(200).json({
            status: "success",
            message: "Persona creada correctamente",
            payload: data,
        });
    })
        .catch((err) => {
        console.error("Validation Error:", err);
        res.status(500).json({
            status: "error",
            message: "Algo salió mal al intentar crear una persona " + err.message,
            payload: null,
        });
    });
};
exports.createPerson = createPerson;
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
const getPersonById = (req, res) => {
    person_1.Person.findByPk(req.params.id, {
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
        if (data) {
            res.status(200).json({
                status: "success",
                message: "Persona obtenida correctamente",
                payload: data,
            });
        }
    })
        .catch((error) => {
        res.status(500).json({
            status: "error",
            message: "Error al obtener la persona " + error.message,
            payload: null,
        });
    });
};
exports.getPersonById = getPersonById;
