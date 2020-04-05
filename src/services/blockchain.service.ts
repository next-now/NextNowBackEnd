import axios, {AxiosInstance} from "axios";
import {v4 as uuidv4} from 'uuid';

class BlockchainService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create()
    }

    private getHeaders(): any {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.BLOCKCHAIN_SERVICE_TOKEN}`,
            'Grpc-metadata-space': "7a24f929-dd96-49c4-a306-3d16269ad920"
        }
    }

    public async createWallet(): Promise<string> {
        const path: string = `${process.env.BLOCKCHAIN_SERVICE_BASE_PATH}/functions-invoke/create`;
        const payload = {
            "walletUUID": uuidv4(),
        };
        const reply = await this.api.post(path, payload, {headers: this.getHeaders()})
        return reply.data.result.uuid;
    }

    public async getWalletBalance(walletId: string): Promise<number> {
        const path: string = `${process.env.BLOCKCHAIN_SERVICE_BASE_PATH}/functions-invoke/query`;
        const payload = {
            walletUUID: walletId
        };
        const reply = await this.api.post(path, payload, {headers: this.getHeaders()})
        return reply.data.result.balance;
    }

    public async sendTokens(target: string, amount: number): Promise<string> {
        const path: string = `${process.env.BLOCKCHAIN_SERVICE_BASE_PATH}/functions-invoke/transfer`;
        const payload = {
            walletUUID: target,
            amount: amount
        };

        const reply = await this.api.post(path, payload, {headers: this.getHeaders()})
        console.log(reply);
        return "";
    }

    public async init(masterBalance: number): Promise<void> {
        const path: string = `${process.env.BLOCKCHAIN_SERVICE_BASE_PATH}/functions-invoke/initialize`;
        const payload = {
            masterBalance: masterBalance,
        };

        const reply = await this.api.post(path, payload, {headers: this.getHeaders()});
        console.log(reply);

    }
}
export default BlockchainService;
