import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import { CreateUserDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware'
import {CreateInitiativeDto} from "../dtos/initiatives.dto";
import InitiativesController from "../controllers/initiatives.controller";
class InitiativesRoute implements Route {
  public path = '/initiatives';
  public router = Router();
  public initiativeController = new InitiativesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateInitiativeDto), this.initiativeController.createInitiative);

    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.initiativeController.getInitiativeById);
    this.router.put(`${this.path}/:id(\\d+)`, authMiddleware, validationMiddleware(CreateInitiativeDto, true), this.initiativeController.updateInitiative);
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.initiativeController.deleteInitiative);
  }
}

export default InitiativesRoute;
