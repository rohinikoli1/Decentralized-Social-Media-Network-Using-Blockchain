import { Injectable } from "@angular/core";
// import Web3 from web3.js
import Web3 from "web3";
import { ContainerService } from './container.service';

declare let window: any;

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private web3: Web3;
  private contractDeployedAt = "0xB64418019a40Ea77Ebd4aE46BC223fd3bDd60eb0";
  private auth = null;
  private accounts: string[];
  
  constructor(private cont:ContainerService) {
    // call createWeb3
    this.createWeb3();

  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public async getuser(name):Promise<string> {
    // it calls getOrganizer method of exhibition contract
    return await this.auth.methods.getUser(name).call({from:this.cont.getId()});
  }
  
  public async adduser(id, name, userName){
    await this.web3.eth.personal.unlockAccount(this.cont.getId(),this.cont.getPass(),60);
    await this.auth.methods.addUser( id, name, userName).send({from: this.cont.getId()});
  }

  public async deluser(id, name){
    await this.web3.eth.personal.unlockAccount(this.cont.getId(),this.cont.getPass(),60);
    await this.auth.methods.delUser(id, name).send({from:this.cont.getId()});
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
            },
            {
              "name": "userName",
              "type": "string"
            }
          ],
          "name": "addUser",
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
              "name": "name",
              "type": "string"
            }
          ],
          "name": "delUser",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "name",
              "type": "string"
            }
          ],
          "name": "getUser",
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
      console.log(this.accounts);
    }else { 
      console.log("No web3? Please trying with MetaMask!");
    }
  }
}