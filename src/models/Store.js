import {observable} from 'mobx';

import MetaCoin from '../../build/contracts/MetaCoin.json'
import getWeb3 from '../utils/getWeb3'
import AccountModel from './AccountModel';

export default class Store {
   @observable accounts=[];
   @observable fromAccount;
   @observable toAddress = '';
   @observable amount = 0;
   
   constructor(){
     this.init();
   }

   init(){
     var self = this;
     getWeb3.then(result => {
       var web3 = result.web3;
       const contract = require('truffle-contract');
       const metaCoin = contract(MetaCoin);
       metaCoin.setProvider(web3.currentProvider);
       return web3.eth.getAccounts((errors, addresses)=>{
         var fromAddress = addresses[0];
         addresses.forEach(address=>{
            const account = new AccountModel(address); 
            self.accounts.push(account);
         });

         self.fromAccount = self.accounts[0];
         self.toAddress = addresses[1];
         metaCoin.deployed().then(instance=>{
             self.contractInstance = instance;
             self.accounts.forEach(account=>{
                 instance.getBalance.call(account.address, {from:fromAddress}).then(result=>{
                     account.balance = result.c;
                     console.log(account.toString());
                 });
             });
         });
       });
     });
   }

   transfer(){
        this.contractInstance.sendCoin(this.toAddress, this.amount, {from:this.fromAccount.address}).then(()=>{
            this.status = 'Transaction completed';
            this.refreshBalances();
        }).catch(e=>{
            this.status = 'Transaction error';
        })    
   }

   refreshBalances(){
    this.accounts.forEach(account=>{
        this.contractInstance.getBalance.call(account.address, {from:this.fromAccount.address}).then(result=>{
            account.balance = result.c;
            console.log(account.toString());
        });
    });
   }
   
}