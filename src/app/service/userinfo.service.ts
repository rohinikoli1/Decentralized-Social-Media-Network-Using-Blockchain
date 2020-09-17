import { Injectable } from "@angular/core";
// import Web3 from web3.js
import Web3 from "web3";
import { ContainerService } from './container.service';

declare let window: any;

@Injectable({
  providedIn: 'root'
})

export class UserinfoService {
  private web3: Web3;
  private contractDeployedAt = "0x338F911581c5aEfcaaFBF53FB02D1E07eB356E79";
  private auth = null;
  private accounts: string[];

  constructor(private cont:ContainerService) {
    // call createWeb3
    this.createWeb3();
  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public async getinfo(userName):Promise<Buffer> {
    // it calls getOrganizer method of exhibition contract
    return await this.auth.methods.getInfo(userName).call({from: this.cont.getId()});
  }

  public async newuser(userName, id, photo, name){
    await this.web3.eth.personal.unlockAccount(this.cont.getId(),this.cont.getPass(),60);
    await this.auth.methods.newUser(userName, id, photo, name).send({from: this.cont.getId()});
  }

  public async deluser(id, userName){
    await this.web3.eth.personal.unlockAccount(this.cont.getId(),this.cont.getPass(),60);
    await this.auth.methods.delUser(id, userName).send({from: this.cont.getId()});
  }

  public async setphoto(id, userName, photo) {
    await this.web3.eth.personal.unlockAccount(this.cont.getId(),this.cont.getPass(),60);
    await this.auth.methods.setPhoto(id, userName, photo).send({from: this.cont.getId()});
  }

  public async setname(id, userName, name) {
    await this.web3.eth.personal.unlockAccount(this.cont.getId(),this.cont.getPass(),60);
    await this.auth.methods.setName(id, userName, name).send({from: this.cont.getId()});
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
              "name": "userName",
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
          "constant": false,
          "inputs": [
            {
              "name": "userName",
              "type": "string"
            },
            {
              "name": "id",
              "type": "address"
            },
            {
              "name": "photo",
              "type": "address"
            },
            {
              "name": "name",
              "type": "string"
            }
          ],
          "name": "newUser",
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
              "name": "userName",
              "type": "string"
            },
            {
              "name": "name",
              "type": "string"
            }
          ],
          "name": "setName",
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
              "name": "userName",
              "type": "string"
            },
            {
              "name": "photo",
              "type": "address"
            }
          ],
          "name": "setPhoto",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "userName",
              "type": "string"
            }
          ],
          "name": "getInfo",
          "outputs": [
            {
              "name": "",
              "type": "address"
            },
            {
              "name": "",
              "type": "string"
            },
            {
              "name": "",
              "type": "address"
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