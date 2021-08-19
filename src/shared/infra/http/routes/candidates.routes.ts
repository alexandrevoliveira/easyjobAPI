import { CreateCandidateController } from "@modules/candidates/useCases/createCandidate/CreateCandidateController";
import { ListCandidatesController } from "@modules/candidates/useCases/listCandidates/ListCandidatesController";
import { Router } from "express";

const candidatesRoutes = Router();

const createCandidateController = new CreateCandidateController();
const listCandidatesController = new ListCandidatesController();

candidatesRoutes.post("/", createCandidateController.handle);
candidatesRoutes.get("/", listCandidatesController.handle);

export { candidatesRoutes };
