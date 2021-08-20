import { Router } from "express";

import { candidatesRoutes } from "./candidates.routes";
import { companiesRoutes } from "./companies.routes";
import { vacanciesRoutes } from "./vacancies.routes";

const router = Router();

router.use("/companies", companiesRoutes);
router.use("/candidates", candidatesRoutes);
router.use("/vacancies", vacanciesRoutes);

export { router };
