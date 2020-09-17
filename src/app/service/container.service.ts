import { Injectable } from "@angular/core";
// import Web3 from web3.js
import Web3 from "web3";

declare let window: any;

@Injectable({
  providedIn: 'root'
})

export class ContainerService {
  private web3: Web3;
  private contractDeployedAt = "0x0EFF3eC61EAa6F953FEbe908a32A4F633f1b5a35";
  private auth = null;
  private accounts: string[];
  private account: string;
  private userName:string;
  private pass:string;
  private friendname:string;
  private friendphoto:string;
  constructor(private online:ContainerService) {
    // call createWeb3
    this.createWeb3();
  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public async assign(id, userName){
    await this.web3.eth.personal.unlockAccount(this.getId(),this.getPass(),60);
    await this.auth.methods.assign(id,userName).send({from:this.account});
    this.account = id;
    this.userName = userName;
  }

  public getId():string {
    return this.account;
  }

  public getUName():string {
    return this.userName;
  }

  public setId(id) {
    this.account = id;
  }

  public setUName(name) {
    this.userName = name;
  }

  public getPass():string {
    return this.pass;
  }

  public setPass(pass) {
    this.pass = pass;
  }

  public setFriend(name,photo){
    this.friendname=name;
    this.friendphoto=photo;
  }

  public getFriendname():string{
    return this.friendname;
  }

  public getFriendphoto():string{
    return this.friendphoto;
  }

  public async getuser(ind):Promise<string> {
    // it calls getOrganizer method of exhibition contract
    return await this.auth.methods.onlines(ind).call({from:this.account});
  }

  public async adduser(name){
    await this.web3.eth.personal.unlockAccount(this.getId(),this.getPass(),60);
    await this.auth.methods.join(this.account, name).send({from:this.account});
  }

  public async deluser(ind){
    await this.web3.eth.personal.unlockAccount(this.getId(),this.getPass(),60);
    await this.auth.methods.left(this.account, ind).send({from:this.account});
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  private async createWeb3() {
    // Checking if Web3 has been injected by the browser (MetaMask)
    console.log('before Web3 :'+this.web3);
    if (typeof this.web3 == 'undefined') {
      // Use MetaMask's provider
      console.log('before Web3');
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.43.144:8545"));
      console.log('after Web3');
      //create a exhibition contract instance
      this.auth = new this.web3.eth.Contract([
        {
          "constant": false,
          "inputs": [
            {
              "name": "id",
              "type": "address"
            },
            {
              "name": "name",
              "type": "string"
            }
          ],
          "name": "join",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "id",
              "type": "address"
            },
            {
              "name": "i",
              "type": "uint256"
            }
          ],
          "name": "left",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "onlines",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ], // contract interface
        this.contractDeployedAt // address where contract is deployed
      );

      this.accounts = await this.web3.eth.getAccounts();
      this.account = this.accounts[0];
      this.userName = null;
      console.log(this.accounts);
    }else {
      console.log("No web3? Please trying with MetaMask!");
    }
  }
}