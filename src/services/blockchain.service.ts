import axios, {AxiosInstance} from "axios";
import {v4 as uuidv4} from 'uuid';
const path = require('path');
const fs = require('fs');
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/cb16ef812fd5444f97ef0335439da1f4");
const web3 = new Web3(provider);
var Tx = require('ethereumjs-tx');

var myAddress = "0x77Bdd84E1695cB8E8ff74bd9B713D82dd7cdA5dC"; 
var contractAddress = "0x67b7fecf8b02506d4692d9895959c42d7e7511bb";
var abiArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, './abi.json'), 'utf-8'));
// var contract = new web3.eth.Contract(abiArray, contractAddress, { from: myAddress });
var contract = new web3.eth.Contract(abiArray, contractAddress);



class BlockchainService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create()
    }

    public async createWallet(): Promise<string> {
        var wallet = web3.eth.accounts.create();
        var walletAddress = wallet.address;
        var privateKey = wallet.privateKey;
        return walletAddress;
    }

    // check if walletID is a string i think it must be type address
    public async getWalletBalance(walletId: string): Promise<number> {
        var balance = await contract.methods.balanceOf(walletId).call();
        return balance;
    }

    // target= exchange dest 
    public async sendTokens(target: string, amount: number): Promise<string> {
                // 1.Nonce: Determine the nonce
        var destAddress = target;

        var count = await web3.eth.getTransactionCount(myAddress);
        console.log(`num transactions so far: ${count}`);

        // 2.token amount - token is divisible to 0 decimals hence 1 = 1 token
        let transferamount = amount.toString();
        let transferAmount_ = web3.utils.numberToHex(transferamount)
        let transferAmount = transferAmount_;

        
        // How many tokens do I have before sending?
        var balance = await contract.methods.balanceOf(myAddress).call();
        console.log(`Balance before send: ${balance}`);

        // I chose gas price and gas limit based on what ethereum wallet was recommending for a similar transaction. You may need to change the gas price!
        var rawTransaction = {
            "from": myAddress,
            "nonce": "0x" + count.toString(16),
            "gasPrice": "0x003B9ACA00",
            "gasLimit": "0x250CA",
            "to": contractAddress,
            "value": "0x0",
            "data": contract.methods.transfer(destAddress, transferAmount).encodeABI(),
            "chainId": 0x04
        };

        // Example private key (do not use): 'e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109'
        // The private key must be for myAddress
        let privKey_ = "CDABEA58AC1E5F390A672AC32E0B119E9F22E20BAF28C71D86912605A5068F2B";
        let privKey = new Buffer.from(privKey_, "hex")
        var tx = new Tx(rawTransaction);
            //var tx = new Tx(rawTransaction,{chain:'rinkeby', hardfork: 'petersburg'} ); // https://ethereum.stackexchange.com/questions/61771/error-returned-error-invalid-sender
            tx.sign(privKey);
            var serializedTx = tx.serialize();

        console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}`);
        var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
        console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);


        // The balance may not be updated yet, but let's check
        balance = await contract.methods.balanceOf(myAddress).call();
        console.log(`Balance after send: ${balance}`);

        return receipt; 

        
        }
}
export default BlockchainService;
