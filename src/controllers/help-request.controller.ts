import {NextFunction, Response} from 'express';
import {User} from '../interfaces/users.interface';
import {RequestWithUser} from "../interfaces/auth.interface";
import HttpException from "../exceptions/HttpException";
import HelpRequestsService from "../services/help-requests.service";
import {HelpRequest} from "../interfaces/help-request.interface";
import {CreateHelpRequestDto} from "../dtos/help-requests.dto";

class HelpRequestController {
  public helpRequestsService = new HelpRequestsService();

  private static verifyUserHasAccess(obj: HelpRequest, user: User): void {
    if (user.id !== obj.userId)
      throw new HttpException(403, "You don't have access to this resource");
  }

  public getHelpRequestById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const id: number = Number(req.params.id);
    try {
      const request: HelpRequest = await this.helpRequestsService.findHelpRequestById(id);

      res.status(200).json({ data: request, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  }

  public createHelpRequest = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const helpRequestDto: CreateHelpRequestDto = req.body;
    const user: User = req.user;

    try {
      const request: HelpRequest = await this.helpRequestsService.createHelpRequest(helpRequestDto, user.id);
      res.status(201).json({ data: request, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateHelpRequest = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const id: number = Number(req.params.id);
    const user: User = req.user;
    const helpRequestDto: CreateHelpRequestDto = req.body;
    try {
      const originalData: HelpRequest = await this.helpRequestsService.findHelpRequestById(id)
      HelpRequestController.verifyUserHasAccess(originalData, user);
      const updatedData: HelpRequest = await this.helpRequestsService.updateHelpRequest(id, helpRequestDto);
      res.status(200).json({ data: updatedData });
    } catch (error) {
      next(error);
    }
  };

  public deleteHelpRequest = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const id: number = Number(req.params.id);
    const user: User = req.user;

    try {
      const originalData: HelpRequest = await this.helpRequestsService.findHelpRequestById(id);
      HelpRequestController.verifyUserHasAccess(originalData, user);
      await this.helpRequestsService.deleteHelpRequest(id);
      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }

  public geOpenRequests = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const id: number = Number(req.params.id);
    try {
      const request = await this.helpRequestsService.geOpenRequests();

      res.status(200).json({data: request});
    } catch (error) {
      next(error);
    }
  }
}

export default HelpRequestController;
