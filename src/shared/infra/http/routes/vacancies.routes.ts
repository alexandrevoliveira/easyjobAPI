import { CreateVacancyController } from "@modules/vacancies/useCases/createVacancy/CreateVacancyController";
import { ListVacanciesController } from "@modules/vacancies/useCases/listVacancies/ListVacanciesController";
import { ShowVacancyController } from "@modules/vacancies/useCases/showVacancy/ShowVacancyController";
import { Router } from "express";

const vacanciesRoutes = Router();

const createVacancyController = new CreateVacancyController();
const listVacanciesController = new ListVacanciesController();
const showVacancyController = new ShowVacancyController();

vacanciesRoutes.post("/", createVacancyController.handle);
vacanciesRoutes.get("/", listVacanciesController.handle);
vacanciesRoutes.get("/:id", showVacancyController.handle);

export { vacanciesRoutes };
