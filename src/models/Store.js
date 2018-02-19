import {observable} from 'mobx';

import MetaCoin from '../../build/contracts/MetaCoin.json'
import getWeb3 from '../utils/getWeb3'
import AccountModel from './AccountModel';

export default class Store {
   @observable accounts=[];
   @observable fromAccount = {
       address: null,
       balance: 0
   };
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
       return web3.eth.getAccounts((errors, accounts)=>{
         var fromAddress = accounts[0];
         self.accounts = accounts;
         self.toAddress = accounts[1];
         metaCoin.deployed().then(instance=>{
             self.contractInstance = instance;
             return instance.getBalance.call(fromAddress, {from: fromAddress});
         }).then(result=>{
             const balance = result.c;
             self.fromAccount.address = fromAddress;
             self.fromAccount.balance = balance;
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
     const fromAddress = this.fromAccount.address;   
     this.contractInstance.getBalance.call(fromAddress, {from:fromAddress}).then(result=>{
         this.fromAccount.balance = result.c
     });
   }
   
}