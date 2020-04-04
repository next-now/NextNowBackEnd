import HttpException from '../exceptions/HttpException';
import InitiativeService from "./initiative.service";
import {Initiative} from "../interfaces/initiatives.interface";
import VotesStore from "../stores/votes.store";

class VotingService {
  public initiativeService = new InitiativeService();
  public votesStore = new VotesStore();

  private async checkIfInitiativeExists(initiativeId: number): Promise<void>
  {
    const result: Initiative = await this.initiativeService.findInitiativeById(initiativeId);
    if (!result)
      throw new HttpException(404, "Initiative doesn't exist");
  }

  public async addVote(userId: number, initiativeId: number): Promise<void>
  {
    await this.checkIfInitiativeExists(initiativeId);
    await this.votesStore.addVote(userId, initiativeId);

  }

  public async removeVote(userId: number, initiativeId: number): Promise<void>
  {
    await this.checkIfInitiativeExists(initiativeId);
    await this.votesStore.removeVote(userId, initiativeId);
  }

  public async getVoteStatus(userId: number, initiativeId: number):Promise<boolean>
  {
    await this.checkIfInitiativeExists(initiativeId);
    const res: boolean = await this.votesStore.getVoteStatus(userId, initiativeId);
    return res;
  }

}

export default VotingService;