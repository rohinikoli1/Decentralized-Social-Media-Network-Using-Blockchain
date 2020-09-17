import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { ContainerService } from './container.service';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UserFriendsService {

  private web3: Web3;
  private contractDeployedAt = "0x1FC4956146788bB9Db94496E75ed846E3C562316";
  private auth = null;
  private accounts: string[];

  constructor(private cont:ContainerService) {
    // call createWeb3
    this.createWeb3();
  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public async delMyFri(id,index){
    // it calls getOrganizer method of exhibition contract
    await this.web3.eth.personal.unlockAccount(this.cont.getId(),this.cont.getPass(),60);
    await this.auth.methods.delMyFri(id,index).send({from: this.cont.getId()});
  }

  public async addMyFri(id,name){
    await this.web3.eth.personal.unlockAccount(this.cont.getId(),this.cont.getPass(),60);
    await this.auth.methods.addMyFri(id,name).send({from: this.cont.getId()});
  }

  public async getLengthMyFri(id):Promise<number>{
   
     return await this.auth.methods.getLengthMyFri(id).call({from: this.cont.getId()});
    
  }

  public async getMyFri(id,index):Promise<string>{
  
    return await this.auth.methods.getMyFri(id,index).call({from: this.cont.getId()});
  }
/////////////////////////////////////////////////
  public async rejectReqFri(id,index){
    // it calls getOrganizer method of exhibition contract
    await this.web3.eth.personal.unlockAccount(this.cont.getId(),this.cont.getPass(),60);
    await this.auth.methods.rejectReqFri(id,index).send({from: this.cont.getId()});
  }

  public async acceptReqFri(id,name){
    await this.web3.eth.personal.unlockAccount(this.cont.getId(),this.cont.getPass(),60);
    await this.auth.methods.acceptReqFri(id,name).send({from: this.cont.getId()});
  }

  public async getLengthReqFri(id):Promise<number>{
    
     return await this.auth.methods.getLengthReqFri(id).call({from: this.cont.getId()});
    
  }
  public async addReqFri(id,name){
    console.log(this.cont.getId()+" "+this.cont.getPass());
    await this.web3.eth.personal.unlockAccount(this.cont.getId(),this.cont.getPass(),60);
    console.log("after fisrt await");
    await this.auth.methods.addReqFri(id,name).send({from: this.cont.getId()});

  }
  public async getReqFri(id,index):Promise<string>{
    await this.web3.eth.personal.unlockAccount(this.cont.getId(),this.cont.getPass(),60);
    return await this.auth.methods.getReqFri(id,index).call({from: this.cont.getId()});
  }
  /////////////////////////////////////////////////////////
  public async canSendFri(id,index){
    // it calls getOrganizer method of exhibition contract
    await this.web3.eth.personal.unlockAccount(this.cont.getId(),this.cont.getPass(),60);
    await this.auth.methods.canSendFri(id,index).send({from: this.cont.getId()});
  }

  public async addSendFri(id,name){
    console.log("we are in addsendfri");
    await this.web3.eth.personal.unlockAccount(this.cont.getId(),this.cont.getPass(),60);
    await this.auth.methods.addSendFri(id,name).send({from: this.cont.getId()});
  }

  public async getLengthSedFri(id):Promise<number>{
      console.log("we rae in getLengthSedFri");
     return await this.auth.methods.getLengthSedFri(id).call({from: this.cont.getId()});
    
  }

  public async getSedFri(id,index):Promise<string>{
    console.log("we are in getsedFRi");
    return await this.auth.methods.getSedFri(id,index).call({from: this.cont.getId()});
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
          "name": "acceptReqFri",
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
          "name": "addMyFri",
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
          "name": "addReqFri",
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
          "name": "addSendFri",
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
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "canSendFri",
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
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "delMyFri",
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
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "rejectReqFri",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "id",
              "type": "address"
            }
          ],
          "name": "getLengthMyFri",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "id",
              "type": "address"
            }
          ],
          "name": "getLengthReqFri",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "id",
              "type": "address"
            }
          ],
          "name": "getLengthSedFri",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "id",
              "type": "address"
            },
            {
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "getMyFri",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "id",
              "type": "address"
            },
            {
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "getReqFri",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "id",
              "type": "address"
            },
            {
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "getSedFri",
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
