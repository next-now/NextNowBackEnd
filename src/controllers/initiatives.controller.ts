import {NextFunction, Response} from 'express';
import {User} from '../interfaces/users.interface';
import {RequestWithUser} from "../interfaces/auth.interface";
import HttpException from "../exceptions/HttpException";
import {CreateInitiativeDto} from "../dtos/initiatives.dto";
import InitiativeService from "../services/initiative.service";
import {Initiative} from "../interfaces/initiatives.interface";

class InitiativesController {
  public initiativeService = new InitiativeService();

  private static verifyUserHasAccess(initiative: Initiative, user: User): void {
    if (user.id !== initiative.userId)
      throw new HttpException(403, "You don't have access to this resource");
  }

  public getInitiativeById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const initiativeId: number = Number(req.params.id);
    try {
      const initiative: Initiative = await this.initiativeService.findInitiativeById(initiativeId);

      res.status(200).json({ data: initiative, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  }

  public createInitiative = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const initiativeDto: CreateInitiativeDto = req.body;
    const user: User = req.user;

    try {
      const initiative: Initiative = await this.initiativeService.createInitiative(initiativeDto, user.id);
      res.status(201).json({ data: initiative, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  public updateInitiative = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const initiativeId: number = Number(req.params.id);
    const user: User = req.user;
    const initiativeDto: CreateInitiativeDto = req.body;
    try {
      const originalData: Initiative = await this.initiativeService.findInitiativeById(initiativeId)
      InitiativesController.verifyUserHasAccess(originalData, user);
      const updatedData: Initiative = await this.initiativeService.updateInitiative(initiativeId, user.id, initiativeDto);
      res.status(200).json({ data: updatedData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  }

  public deleteInitiative = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const initiativeId: number = Number(req.params.id);
    const user: User = req.user;

    try {
      const originalData: Initiative = await this.initiativeService.findInitiativeById(initiativeId);
      InitiativesController.verifyUserHasAccess(originalData, user);
      await this.initiativeService.deleteInitiative(initiativeId, user.id);
      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }
}

export default InitiativesController;
