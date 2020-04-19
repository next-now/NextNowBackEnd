import {Router} from 'express';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware'
import HelpRequestController from "../controllers/help-request.controller";
import {CreateHelpRequestDto} from "../dtos/help-requests.dto";

class HelpRequestsRoute implements Route {
  public path = '/help-requests';
  public router = Router();
  public helpRequestController = new HelpRequestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateHelpRequestDto), this.helpRequestController.createHelpRequest);
    this.router.get(`${this.path}`, this.helpRequestController.geOpenRequests);

    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.helpRequestController.getHelpRequestById);
    this.router.put(`${this.path}/:id(\\d+)`, authMiddleware, validationMiddleware(CreateHelpRequestDto, true), this.helpRequestController.updateHelpRequest);
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.helpRequestController.deleteHelpRequest);
  }
}

export default HelpRequestsRoute;
