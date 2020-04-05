import HttpException from '../exceptions/HttpException';
import InitiativeService from "./initiative.service";
import {Initiative} from "../interfaces/initiatives.interface";
import VotesStore from "../stores/votes.store";
import TransactionService from "./transaction.service";

class VotingService {
  public initiativeService = new InitiativeService();
  public transactionService = new TransactionService();
  public votesStore = new VotesStore();

  private async checkIfInitiativeExists(initiativeId: number): Promise<void>
  {
    const result: Initiative = await this.initiativeService.findInitiativeById(initiativeId);
    if (!result)
      throw new HttpException(404, "Initiative doesn't exist");
  }

  public async addVote(userId: number, initiativeId: number): Promise<void>
  {
    const rewardThreshold = 1; // TODO: this doesn't even belong here!
    await this.checkIfInitiativeExists(initiativeId);
    await this.votesStore.addVote(userId, initiativeId);

    const totalCount = await this.votesStore.getVoteCount(initiativeId);
    console.log("Total count for initiative");
    console.log(totalCount);
    if (totalCount >= rewardThreshold)
    {
      console.log("Threshold activated");

      const initiative: Initiative = await this.initiativeService.findInitiativeById(initiativeId);
      if (!initiative.rewarded)
      {
        console.log("Rewarding");
        await this.transactionService.createTransaction(initiative);
        await this.initiativeService.markAsRewarded(initiativeId);
      }
    }
  }

  public async getVoteCount(initiativeId: number): Promise<number>
  {
    return this.votesStore.getVoteCount(initiativeId);
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