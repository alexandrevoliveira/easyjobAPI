import { CreateCompanyController } from "@modules/companies/useCases/createCompany/CreateCompanyController";
import { ListCompaniesController } from "@modules/companies/useCases/listCompanies/ListCompaniesController";
import { Router } from "express";

const companiesRoutes = Router();

const createCompanyController = new CreateCompanyController();
const listCompaniesController = new ListCompaniesController();

companiesRoutes.post("/", createCompanyController.handle);
companiesRoutes.get("/", listCompaniesController.handle);

export { companiesRoutes };
