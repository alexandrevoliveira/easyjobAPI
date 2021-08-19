import { Router } from "express";

import { candidatesRoutes } from "./candidates.routes";
import { companiesRoutes } from "./companies.routes";

const router = Router();

router.use("/companies", companiesRoutes);
router.use("/candidates", candidatesRoutes);

export { router };
