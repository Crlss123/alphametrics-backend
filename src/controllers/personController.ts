import { Request, Response, RequestHandler } from "express";
import { Person } from "../models/person";
import { Population } from "../models/population";
import { Zone } from "../models/zone";
import { json } from "sequelize";

export const createPerson: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
  }

  const person = { ...req.body };
  Person.create(person)
    .then((data: Person | null) => {
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

export const getAllPeople: RequestHandler = (req: Request, res: Response) => {
  Person.findAll({
    include: [
      {
        model: Population,
        include: [
          {
            model: Zone,
          },
        ],
      },
    ],
  })
    .then((data: Person[]) => {
      res.status(200).json({
        message: "Personas obtenidas correctamente",
        payload: data,
        status: "success",
      });
    })
    .catch((error: Error) => {
      res.status(500).json({
        message: "Error al obtener las personas",
        payload: null,
        status: "error",
      });
    });
};

export const getTotalPeople: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const totalPersonas = await Person.count();
    res.status(200).json({
      message: "Total de personas obtenido exitosamente",
      payload: { total: totalPersonas },
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el total",
      payload: null,
      status: "error " + error,
    });
  }
};

export const getStatusPercentage: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const total = await Person.count();
    const graduates = await Person.count({ where: { status: true } });
    const failed = total - graduates;
    res.status(200).json({
      message: "Informacion obtenida correctamente",
      payload: [
        { name: "Graduados", value: graduates },
        { name: "No Graduado", value: failed },
      ],
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la informacion",
      payload: null,
      status: "error " + error,
    });
  }
};

export const getGenderStats: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const maleGraduates = await Person.count({
      where: {
        gender: "M",
        status: true,
      },
    });
    const femaleGraduates = await Person.count({
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
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los datos " + error,
      payload: null,
      status: "error",
    });
  }
};

export const getPeopleByGroup: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { populationId } = req.query;

  if (!populationId) {
    res.status(404).json({
      message: "No se encontro el ID de poblacion",
      payload: null,
      status: "error",
    });
  }

  try {
    const people = await Person.findAll({
      where: { population_id: Number(populationId) },
    });
    res.status(200).json({
      message: "Datos obtenidos correctamente",
      payload: people,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los datos " + error,
      payload: null,
      status: "error",
    });
  }
};

export const modifyPerson: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({
      message: "No se proporcionaron datos para modificar la persona",
      payload: null,
      status: "error",
    });
    return;
  }
  Person.update({ ...req.body }, { where: { id: req.params.id } })
    .then((isUpdated) => {
      if (isUpdated[0] > 0) {
        res.status(200).json({
          status: "success",
          message: "Persona modificada correctamente",
          payload: { ...req.body },
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "Error al modificar la persona",
          payload: null,
        });
      }
    })
    .catch((error: Error) => {
      res.status(500).json({
        status: "error",
        message:
          "Algo salió mal al intentar modificar la persona " + error.message,
        payload: null,
      });
    });
};

export const getPersonById: RequestHandler = (req: Request, res: Response) => {
  Person.findByPk(req.params.id, {
    include: [
      {
        model: Population,
        include: [
          {
            model: Zone,
          },
        ],
      },
    ],
  })
    .then((data: Person | null) => {
      if (data) {
        res.status(200).json({
          status: "success",
          message: "Persona obtenida correctamente",
          payload: data,
        });
      }
    })
    .catch((error: Error) => {
      res.status(500).json({
        status: "error",
        message: "Error al obtener la persona " + error.message,
        payload: null,
      });
    });
};

export const deletePerson: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    await Person.destroy({ where: { id } });
    res.status(200).json({ message: "Provided deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting products.",
    });
  }
};
