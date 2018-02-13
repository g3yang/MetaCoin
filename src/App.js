import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import MetaCoin from '../build/contracts/MetaCoin.json'
import getWeb3 from './utils/getWeb3'
import SendCoin from './SendCoin'


import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'


const styles ={
  root:{
    margin: 'auto',
    width: '60%'
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null
    }
  }

  componentDidMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract(){
    const contract = require('truffle-contract');
    const metaCoin = contract(MetaCoin);
    metaCoin.setProvider(this.state.web3.currentProvider);

    var contractInstance;
    
    this.state.web3.eth.getAccounts((errors, addresses)=>{
      metaCoin.deployed().then((instance)=>{
        let state = this.state;
        contractInstance = instance;
        const fromAddress = addresses[0];
        this.setState({
          contractInstance,
          fromAddress,
          addresses
        });
        return contractInstance.getBalance.call(fromAddress, {from: fromAddress});
      }).then(result=>{
        this.setState({
          amount: result.c
        })
      });
    });
  }

  refreshBalance(){
    const contract = this.state.contractInstance;
    const fromAddress = this.state.fromAddress;
    contract.getBalance.call(fromAddress,{from: fromAddress}).then(result=>{
      this.setState({amount:result.c})
    })
  }

  render() {
    return (
      <div style={styles.root}>
        <h1>MetaCoin</h1>
        <h2>Example Truffle Dapp</h2>
        <p>You have {this.state.amount} MetaCoins at this address {this.state.fromAddress}. </p>

        <br/>
        
        <SendCoin fromAddress = {this.state.fromAddress} addresses = {this.state.addresses}
                  contractInstance = {this.state.contractInstance} handler={this.refreshBalance.bind(this)} />
        <br/>
        <span class="hint"><strong>Hint:</strong> open the browser developer console to view any errors and warnings.</span>
      </div>
    );
  }
}

export default App
