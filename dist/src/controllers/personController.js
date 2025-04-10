"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePerson = exports.getPersonById = exports.modifyPerson = exports.getGenderStats = exports.getStatusPercentage = exports.getTotalPeople = exports.getAllPeople = exports.createPerson = void 0;
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
        const totalPersonas = await person_1.Person.count();
        res.status(200).json({
            message: "Total de personas obtenido exitosamente",
            payload: { total: totalPersonas },
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
        const total = await person_1.Person.count();
        const graduates = await person_1.Person.count({ where: { status: true } });
        const failed = total - graduates;
        res.status(200).json({
            message: "Informacion obtenida correctamente",
            payload: [
                { name: "Graduados", value: graduates },
                { name: "No Graduado", value: failed },
            ],
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
        const maleGraduates = await person_1.Person.count({
            where: {
                gender: "M",
                status: true,
            },
        });
        const femaleGraduates = await person_1.Person.count({
            where: {
                gender: "F",
                status: true,
            },
        });
        const response = {
            hombresGraduados: maleGraduates,
            mujeresGraduadas: femaleGraduates,
        };
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
