import { CreateApplicationController } from "@modules/applications/useCases/createApplication/CreateApplicationController";
import { Router } from "express";

const applicationsRoutes = Router();

const createApplicationController = new CreateApplicationController();

applicationsRoutes.post("/", createApplicationController.handle);

export { applicationsRoutes };
