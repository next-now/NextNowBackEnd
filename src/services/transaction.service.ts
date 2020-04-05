import HttpException from '../exceptions/HttpException';
import InitiativeService from "./initiative.service";
import {Initiative} from "../interfaces/initiatives.interface";
import VotesStore from "../stores/votes.store";
import BlockchainService from "./blockchain.service";
import TransactionStore from "../stores/transaction.store";
import InitiativesStore from "../stores/initiatives.store";
import {User} from "../interfaces/users.interface";
import UserStore from "../stores/userStore";

class TransactionService {
  public blockchainService = new BlockchainService();
  public transactionStore = new TransactionStore();
  public initiativeStore = new InitiativesStore();
  public userStore = new UserStore();

  public async createTransaction(initiative: Initiative): Promise<void>
  {
    const AMOUNT = 1;
    const user: User = await this.userStore.findUserById(initiative.userId);
    const walletId = user.walletId;
    console.log("Sending SOCI's to " + walletId);
    const transactionUUID = await this.blockchainService.sendTokens(walletId, AMOUNT);
    console.log("transactionUUID" + transactionUUID);

    await this.transactionStore.addTransaction({initiativeId: initiative.id, amount: AMOUNT, uuid: transactionUUID});
  }
}

export default TransactionService;