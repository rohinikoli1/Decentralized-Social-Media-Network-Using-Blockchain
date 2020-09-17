
  import { Injectable } from "@angular/core";
  // import Web3 from web3.js
  import Web3 from "web3";
import { ContainerService } from './container.service';
  
  declare let window: any;
  
  @Injectable({
    providedIn: 'root'
  })

  export class Webe3AuthService {
    private web3: Web3;
    private contractDeployedAt = "0xF37A1d969A9A827f320E2a853b6d5b768a93745f";
    private auth = null;
    private accounts: string[];
  
    constructor(private cont:ContainerService) {
      // call createWeb3
      this.createWeb3();
    }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    public async register(userName, id, name, pass, que, ans) {
      // it calls getOrganizer method of exhibition contract
      console.log('Before --',id,'-',this.cont.getId());
      await this.web3.eth.personal.unlockAccount(this.cont.getId(),this.cont.getPass(),120);
      console.log('id - ',this.cont.getId())
      console.log('pass - ',this.cont.getPass())
      await this.auth.methods.regiter(userName, id, name, pass, que, ans).send({from: this.cont.getId()},
      function(error, result){
        if(error)
        console.log('Error occured :',error);
        else
        console.log('Result: ',result);
      }
      );
      console.log('After --');
    }

    public async authenticate(userName, pass):Promise<string> {
      // return address of user account
      return await this.auth.methods.authenticate(userName, pass).call({from:this.cont.getId()});
    }

    public async delAuth(id, userName){
      await this.web3.eth.personal.unlockAccount(this.cont.getId(),this.cont.getPass(),60);
      await this.auth.methods.delAuth(id, userName).send({from:  this.cont.getId()});
    }

    public async changepass(id, userName, pass) {
      // it calls getOrganizer method of exhibition contract
      console.log('ID -',this.cont.getId());
      console.log('Pass -',this.cont.getPass());
      await this.web3.eth.personal.unlockAccount(this.cont.getId(),this.cont.getPass(),60);
      await this.auth.methods.changePass(id, userName, pass).send({from:  this.cont.getId()});
    }

    public async forgetpass(userName, que, ans):Promise<string> {
      // it calls getOrganizer method of exhibition contract
      return await this.auth.methods.forgrtPass(userName, que, ans).call({from: this.cont.getId()});
    }

    public async create_user(pass):Promise<string> {
      var a;
      await this.web3.eth.personal.newAccount(pass).then(value => {
       a= value;
       console.log('Inside Create User',value);
      });
      await this.web3.eth.personal.unlockAccount("0x2648d3ca79174933Db1A39894E7489466aD35df8","rohit",60);

      await this.web3.eth.sendTransaction({to:a, from:"0x2648d3ca79174933Db1A39894E7489466aD35df8", value:this.web3.utils.toHex(this.web3.utils.toWei("10", "ether"))});
      console.log('After Create User');
      return a;
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
              },
              {
                "name": "pass",
                "type": "string"
              }
            ],
            "name": "changePass",
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
              }
            ],
            "name": "delAuth",
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
                "name": "name",
                "type": "string"
              },
              {
                "name": "pass",
                "type": "string"
              },
              {
                "name": "que",
                "type": "string"
              },
              {
                "name": "ans",
                "type": "string"
              }
            ],
            "name": "regiter",
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
              },
              {
                "name": "pass",
                "type": "string"
              }
            ],
            "name": "authenticate",
            "outputs": [
              {
                "name": "",
                "type": "address"
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
                "name": "userName",
                "type": "string"
              },
              {
                "name": "que",
                "type": "string"
              },
              {
                "name": "ans",
                "type": "string"
              }
            ],
            "name": "forgrtPass",
            "outputs": [
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