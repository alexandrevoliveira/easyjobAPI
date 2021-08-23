import { AuthenticateCandidateController } from "@modules/candidates/useCases/authenticateCandidate/AuthenticateCandidateController";
import { CreateCandidateController } from "@modules/candidates/useCases/createCandidate/CreateCandidateController";
import { ListCandidatesController } from "@modules/candidates/useCases/listCandidates/ListCandidatesController";
import { ShowCandidateController } from "@modules/candidates/useCases/showCandidate/ShowCandidateController";
import { Router } from "express";

const candidatesRoutes = Router();

const createCandidateController = new CreateCandidateController();
const listCandidatesController = new ListCandidatesController();
const showCandidateController = new ShowCandidateController();

const authenticateCandidateController = new AuthenticateCandidateController();

candidatesRoutes.post("/", createCandidateController.handle);
candidatesRoutes.get("/", listCandidatesController.handle);
candidatesRoutes.get("/:id", showCandidateController.handle);

// sessions
candidatesRoutes.post("/sessions", authenticateCandidateController.handle);

export { candidatesRoutes };
