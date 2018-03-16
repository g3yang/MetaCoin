import {observable} from 'mobx';

import MetaCoin from '../../build/contracts/MetaCoin.json'
import getWeb3 from '../utils/getWeb3'
import AccountModel from './AccountModel';
//import Promise from 'promise';

export default class Store {
   @observable accounts=[];
   @observable fromAccount;
   @observable toAddress = '';
   @observable amount = 0;
   @observable status = '';

   constructor(){
     this.init();
   }

   async init(){
       const {web3} = await getWeb3;
       const contract = require('truffle-contract');
       const metaCoin = contract(MetaCoin);
       await metaCoin.setProvider(web3.currentProvider);
       this.contractInstance = await metaCoin.deployed();
       const addresses = await web3.eth.accounts;
       this.toAddress = addresses[1];

       const promises = addresses.map(async (address)=>{
            const account = new AccountModel();
            const {c} = await this.contractInstance.getBalance.call(address, {from:address});
            account.balance = c;
            account.address = address;
            this.accounts.push(account);
       });
       await Promise.all(promises);
       this.fromAccount = this.accounts[0];
   }

   async refreshBalances(){
    this.accounts.forEach(async (account)=>{
        const result = await this.contractInstance.getBalance.call(account.address, {from:this.fromAccount.address});            
        account.balance = result.c;
        console.log(account.toString());
    });
   }
   
   async transfer(){
       try{
           await this.contractInstance.sendCoin(this.toAddress, this.amount, {from:this.fromAccount.address});
           this.status = 'Transaction completed';
           this.refreshBalances();
       }catch(e){
            this.status = 'Transaction error';
       }
       
   }
}