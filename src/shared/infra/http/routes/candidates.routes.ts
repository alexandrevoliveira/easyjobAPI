import { CreateCandidateController } from "@modules/candidates/useCases/createCandidate/CreateCandidateController";
import { Router } from "express";

const candidatesRoutes = Router();

const createCandidateController = new CreateCandidateController();

candidatesRoutes.post("/", createCandidateController.handle);

export { candidatesRoutes };
