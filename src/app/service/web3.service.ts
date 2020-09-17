/*import { Injectable } from '@angular/core';
import { bindNodeCallback, Observable } from 'rxjs';
import Web3 from 'web3';

@Injectable({
	providedIn: 'root'
  })
  
export class Web3Service {

  public web3: Web3;

  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  public getAccounts(): Observable<string[]> {
    return bindNodeCallback(this.web3.eth.getAccounts)();
  }
}
*/
import { Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';
import Web3 from 'web3';
import { BehaviorSubject } from 'rxjs';
declare let require: any;
declare let window: any;

@Injectable({
  providedIn: 'root'
})

///   Implementation
///   constructor(@Inject(WEB3) private web3: Web3)
//    0xd37C0cba5eabFb4eE605F3CB66942Be99FCe0dbd

export class Web3Service {
	private web3Provider
	private contracts: {}
	a
	val
  
  constructor() { 
    try {
      //const provider = ('ethereum' in window) ? window['ethereum'] : Web3.givenProvider;
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      console.log('Inside Try');
    } catch (err) {
      throw new Error('Non-Ethereum browser detected.');
      console.log('Inside Error');
	}
	/*
	if (typeof window.web3 !== 'undefined') {
		this.web3Provider = window.web3.currentProvider;
		} else {
			this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
		}
		window.web3 = new Web3(this.web3Provider);
*/
  }

  async ac() {
    console.log('Inside Befor ac');
    const account = await window.web3.eth.getAccounts();
	//console.log(accounts);
	//this.a = await this.WEB3.eth.currentAccount();
    console.log('Inside After ac current account'+account);
    //console.log(accounts+' balnce '+(await this.web3.eth.getBalance('0xAf62c70e88B5693D890EeEeC1d8b84471f414e84')));
  }

	getAuthentication() {
		//this.a = await new window.web3.eth.Contract([],'0xA29Ec46433A6735A6803aecD20C2f6d4A1e48d10');
		/*return new Promise((resolve, reject) => {
			window.web3.eth.Contract((function(err, account) {
	
			if(err === null) {
				window.web3.eth.getBalance(account, function(err, balance) {
				if(err === null) {
					return resolve({fromAccount: account, balance: window.web3.fromWei(balance, "ether")});
				} else {
					return reject("error!");
				}
				});
			}
			});
		});*/
	}

  setVal(val:string){
	this.a.setPara(val);
	console.log('Inside Set');
  }

  getVal(){
	this.val = this.a.getPara();
	console.log('Inside Get'+this.val); 
  }

}
