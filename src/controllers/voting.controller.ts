import {NextFunction, Response} from 'express';
import {RequestWithUser} from "../interfaces/auth.interface";
import VotingService from "../services/voting.service";

class VotingController {
  public votingService = new VotingService();

  public addVote = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userId: number = req.user.id;
    const initiativeId: number = Number(req.params.id);

    try {
      await this.votingService.addVote(userId, initiativeId);
      res.status(201).json({ message: 'voted' });
    } catch (error) {
      next(error);
    }
  }

  public getVote = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userId: number = req.user.id;
    const initiativeId: number = Number(req.params.id);

    try {
      const result: boolean = await this.votingService.getVoteStatus(userId, initiativeId);
      res.status(200).json({ result: result });
    } catch (error) {
      next(error);
    }
  }

  public removeVote = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userId: number = req.user.id;
    const initiativeId: number = Number(req.params.id);

    try {
      await this.votingService.removeVote(userId, initiativeId);
      res.status(201).json({ message: 'vote-deleted' });
    } catch (error) {
      next(error);
    }
  }
}

export default VotingController;
