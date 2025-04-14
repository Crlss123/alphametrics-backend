"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePerson = exports.getPersonById = exports.modifyPerson = exports.getAllPopulations = exports.getPopulations = exports.getAllZones = exports.getAlertLevel = exports.getPeopleByGroup = exports.getGenderStats = exports.getStatusPercentage = exports.getTotalPeople = exports.getAllPeople = exports.createPerson = void 0;
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
        res.status(200).json({
            message: "Personas obtenidas correctamente",
            payload: data,
            status: "success",
        });
    })
        .catch((error) => {
        res.status(500).json({
            message: "Error al obtener las personas",
            payload: null,
            status: "error",
        });
    });
};
exports.getAllPeople = getAllPeople;
const getTotalPeople = async (req, res) => {
    try {
        const { populationId } = req.query;
        const totalPersonas = await person_1.Person.count({
            where: { population_id: Number(populationId) },
        });
        res.status(200).json({
            message: "Total de personas obtenido exitosamente",
            payload: totalPersonas,
            status: "success",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener el total",
            payload: null,
            status: "error " + error,
        });
    }
};
exports.getTotalPeople = getTotalPeople;
const getStatusPercentage = async (req, res) => {
    try {
        const { populationId } = req.query;
        const total = await person_1.Person.count({
            where: { population_id: Number(populationId) },
        });
        const graduates = await person_1.Person.count({
            where: { status: true, population_id: Number(populationId) },
        });
        const failed = total - graduates;
        res.status(200).json({
            message: "Informacion obtenida correctamente",
            payload: [{ name: "-", graduados: graduates, noGraduados: failed }],
            status: "success",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener la informacion",
            payload: null,
            status: "error " + error,
        });
    }
};
exports.getStatusPercentage = getStatusPercentage;
const getGenderStats = async (req, res) => {
    try {
        const { populationId } = req.query;
        const maleGraduates = await person_1.Person.count({
            where: {
                gender: "M",
                status: true,
                population_id: Number(populationId),
            },
        });
        const femaleGraduates = await person_1.Person.count({
            where: {
                gender: "F",
                status: true,
                population_id: Number(populationId),
            },
        });
        const response = [
            { name: "Mujeres", value: femaleGraduates },
            { name: "Hombres", value: maleGraduates },
        ];
        res.status(200).json({
            message: "Datos obtenidos exitosamente",
            payload: response,
            status: "success",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener los datos " + error,
            payload: null,
            status: "error",
        });
    }
};
exports.getGenderStats = getGenderStats;
const getPeopleByGroup = async (req, res) => {
    const { populationId } = req.query;
    if (!populationId) {
        res.status(404).json({
            message: "No se encontro el ID de poblacion",
            payload: null,
            status: "error",
        });
    }
    try {
        const people = await person_1.Person.findAll({
            where: { population_id: Number(populationId) },
        });
        res.status(200).json({
            message: "Datos obtenidos correctamente",
            payload: people,
            status: "success",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener los datos " + error,
            payload: null,
            status: "error",
        });
    }
};
exports.getPeopleByGroup = getPeopleByGroup;
const getAlertLevel = async (req, res) => {
    try {
        const { populationId } = req.query;
        const totalPersonas = await person_1.Person.count({
            where: { population_id: Number(populationId) },
        });
        const graduates = await person_1.Person.count({
            where: { status: true, population_id: Number(populationId) },
        });
        const gradPercentage = (graduates * 100) / totalPersonas;
        let level = "";
        if (gradPercentage <= 20) {
            level = "Grave";
        }
        else if (gradPercentage <= 50) {
            level = "Alto";
        }
        else if (gradPercentage <= 90) {
            level = "Bajo";
        }
        else {
            level = "Nulo";
        }
        res.status(200).json({
            message: "Datos obtenidos correctamente",
            payload: level,
            status: "success",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "No se encontro el ID de poblacion",
            payload: null,
            status: "error",
        });
    }
};
exports.getAlertLevel = getAlertLevel;
const getAllZones = async (req, res) => {
    try {
        const zones = await zone_1.Zone.findAll({
            include: [
                {
                    model: population_1.Population,
                },
            ],
        });
        res.status(200).json({
            message: "Zonas obtenidas de manera correcta",
            payload: zones,
            status: "success",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Algo salio mal al intentar obtener las zonas",
            payload: null,
            status: "error " + error,
        });
    }
};
exports.getAllZones = getAllZones;
const getPopulations = async (req, res) => {
    const { zoneId } = req.query;
    if (!zoneId) {
        res.status(404).json({
            message: "No se encontró el ID de la zona",
            payload: null,
            status: "error",
        });
    }
    try {
        const populations = await population_1.Population.findAll({
            where: { zone_id: Number(zoneId) },
        });
        res.status(200).json({
            message: "Poblaciones obtenidas correctamente",
            payload: populations,
            status: "success",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener los datos",
            payload: null,
            status: "error",
        });
    }
};
exports.getPopulations = getPopulations;
const getAllPopulations = async (req, res) => {
    try {
        const populations = await population_1.Population.findAll({
            include: [
                {
                    model: zone_1.Zone,
                },
            ],
        });
        res.status(200).json({
            message: "Poblaciones obtenidas correctamente",
            payload: populations,
            status: "succes",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener los datos",
            payload: null,
            status: "error",
        });
    }
};
exports.getAllPopulations = getAllPopulations;
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
const deletePerson = async (req, res) => {
    const { id } = req.params;
    try {
        await person_1.Person.destroy({ where: { id } });
        res.status(200).json({ message: "Provided deleted" });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting products.",
        });
    }
};
exports.deletePerson = deletePerson;
