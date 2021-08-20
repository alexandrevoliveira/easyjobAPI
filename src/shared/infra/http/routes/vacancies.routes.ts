import { CreateVacancyController } from "@modules/vacancies/useCases/createVacancy/CreateVacancyController";
import { ListVacanciesController } from "@modules/vacancies/useCases/listVacancies/ListVacanciesController";
import { Router } from "express";

const vacanciesRoutes = Router();

const createVacancyController = new CreateVacancyController();
const listVacanciesController = new ListVacanciesController();

vacanciesRoutes.post("/", createVacancyController.handle);
vacanciesRoutes.get("/", listVacanciesController.handle);

export { vacanciesRoutes };
