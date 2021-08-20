import { CreateVacancyController } from "@modules/vacancies/useCases/createVacancy/CreateVacancyController";
import { Router } from "express";

const vacanciesRoutes = Router();

const createVacancyController = new CreateVacancyController();

vacanciesRoutes.post("/", createVacancyController.handle);

export { vacanciesRoutes };
