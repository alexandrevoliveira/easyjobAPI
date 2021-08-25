import { Router } from "express";

import { applicationsRoutes } from "./applications.routes";
import { candidatesRoutes } from "./candidates.routes";
import { companiesRoutes } from "./companies.routes";
import { vacanciesRoutes } from "./vacancies.routes";

const router = Router();

router.use("/companies", companiesRoutes);
router.use("/candidates", candidatesRoutes);
router.use("/vacancies", vacanciesRoutes);
router.use("/applications", applicationsRoutes);

export { router };
