import { AuthenticateCompanyController } from "@modules/companies/useCases/authenticateCompany/AuthenticateCompanyController";
import { CreateCompanyController } from "@modules/companies/useCases/createCompany/CreateCompanyController";
import { ListCompaniesController } from "@modules/companies/useCases/listCompanies/ListCompaniesController";
import { ShowCompanyController } from "@modules/companies/useCases/showCompany/ShowCompanyController";
import { Router } from "express";

const companiesRoutes = Router();

const createCompanyController = new CreateCompanyController();
const listCompaniesController = new ListCompaniesController();
const showCompanyController = new ShowCompanyController();

const authenticateCompanyController = new AuthenticateCompanyController();

companiesRoutes.post("/", createCompanyController.handle);
companiesRoutes.get("/", listCompaniesController.handle);
companiesRoutes.get("/:id", showCompanyController.handle);

// sessions
companiesRoutes.post("/sessions", authenticateCompanyController.handle);

export { companiesRoutes };
