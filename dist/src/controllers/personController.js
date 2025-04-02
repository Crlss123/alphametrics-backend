"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePerson = exports.createPerson = void 0;
const person_1 = require("../models/person");
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
            message: "Product successfully created",
            payload: data,
        });
    })
        .catch((err) => {
        res.status(500).json({
            status: "error",
            message: "Something happened creating a product" + err.message,
            payload: null,
        });
    });
};
exports.createPerson = createPerson;
const deletePerson = async (req, res) => {
    const { id } = req.params;
    try {
        await person_1.Person.destroy({ where: { id } });
        res.status(200).json({ message: "Provided deleted" });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting products."
        });
    }
};
exports.deletePerson = deletePerson;
