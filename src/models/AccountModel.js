
import {observable} from 'mobx';

export default class AccountModel{
    @observable balance;

    constructor(address, balance=0){
        this.address = address;
        this.balance = balance;
    }

    toString(){
        return `${this.address}: ${this.balance}`;
    }
}