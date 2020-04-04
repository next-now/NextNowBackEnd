import {Router} from 'express';
import Route from '../interfaces/routes.interface';
import authMiddleware from "../middlewares/auth.middleware";
import VotingController from "../controllers/voting.controller";

class VotingRouter implements Route {
  public path = '/voting';
  public router = Router();

  private votingController = new VotingController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.votingController.getVote);

    this.router.put(`${this.path}/:id(\\d+)`, authMiddleware, this.votingController.addVote);
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.votingController.removeVote);
  }
}

export default VotingRouter;
