import Web3 from 'web3';
import ArtTokenABI from '../contractABI/ArtToken.json'
const TOKEN_ADDRESS = '0x61C44F9EBA4BBbb898B37d933Fab4D8e7Dfd25c1';
const UNIT_PRICE = 10000000000000//500000000000000000;
export default class NFTMintClient {
    constructor(){
        window.web3 = new Web3(window.ethereum);
        let abtract = ArtTokenABI.abi
        this.tokenInstance = new window.web3.eth.Contract(abtract, TOKEN_ADDRESS)
    }
    async mintToken(userAddress, paintingID){
        console.log(userAddress)
        const payment = UNIT_PRICE;
        let txHash = await this.tokenInstance.methods.mintArtToken(paintingID)
            .send({from: userAddress, value: payment}, function(error, transactionHash){
                if(error){
                    console.log(error)
                    return false
                }
                return transactionHash.hash
            })
            return txHash;
    }
}