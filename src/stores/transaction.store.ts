import TransactionModel from '../models/transaction.model';
import InitiativeModel from '../models/initiative.model';
import UserModel from '../models/users.model';
import {Transaction} from "../interfaces/transaction.interface";

class TransactionStore {
    private transactions = TransactionModel;

    private static extractPureJSONObject(transaction: TransactionModel): Transaction {
        return transaction && transaction.toJSON() as Transaction;
    }

    public async addTransaction(transactionData: Omit<Transaction, "id">): Promise<Transaction> {
        const transaction: TransactionModel = await this.transactions.create(transactionData);
        return TransactionStore.extractPureJSONObject(transaction);
    }

    public async getTransactionForUser(userId: number) : Promise<Transaction[]>
    {
        const res = await this.transactions.findAll({
            include: [ {
                model: InitiativeModel,
                attributes: [],
                include: [{
                    model: UserModel,
                    attributes: [],
                    where: {
                        id: userId
                    }
                }]
            }]
        });

        return res.map( (t: TransactionModel) => TransactionStore.extractPureJSONObject(t))
    }
}
export default TransactionStore