import { CreateApplicationController } from "@modules/applications/useCases/createApplication/CreateApplicationController";
import { ListApplicationsController } from "@modules/applications/useCases/listApplications/ListApplicationsController";
import { Router } from "express";

const applicationsRoutes = Router();

const createApplicationController = new CreateApplicationController();
const listApplicationsController = new ListApplicationsController();

applicationsRoutes.post("/", createApplicationController.handle);
applicationsRoutes.get("/", listApplicationsController.handle);

export { applicationsRoutes };
