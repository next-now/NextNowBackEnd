import axios, {AxiosInstance} from "axios";
import {v4 as uuidv4} from 'uuid';

class BlockchainService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create()
    }

    public async createWallet(): Promise<string> {
        return uuidv4();
    }

    public async getWalletBalance(walletId: string): Promise<number> {
        return 0;
    }

    public async sendTokens(target: string, amount: number): Promise<string> {
        return uuidv4(); // no transaction
    }
}
export default BlockchainService;
