import { AuthenticateCandidateController } from "@modules/candidates/useCases/authenticateCandidate/AuthenticateCandidateController";
import { CreateCandidateController } from "@modules/candidates/useCases/createCandidate/CreateCandidateController";
import { ListCandidatesController } from "@modules/candidates/useCases/listCandidates/ListCandidatesController";
import { Router } from "express";

const candidatesRoutes = Router();

const createCandidateController = new CreateCandidateController();
const listCandidatesController = new ListCandidatesController();
const authenticateCandidateController = new AuthenticateCandidateController();

candidatesRoutes.post("/", createCandidateController.handle);
candidatesRoutes.get("/", listCandidatesController.handle);

// sessions
candidatesRoutes.post("/sessions", authenticateCandidateController.handle);

export { candidatesRoutes };
