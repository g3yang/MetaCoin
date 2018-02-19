import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import MetaCoin from '../build/contracts/MetaCoin.json'
import getWeb3 from './utils/getWeb3'
import SendCoin from './components/SendCoin'


import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import Store from './models/Store';
import OwnAccount from './components/OwnAccount';


const styles ={
  root:{
    margin: 'auto',
    width: '60%'
  }
}

const store = new Store();

class App extends Component {

  render() {
    return (
      <div style={styles.root}>
        <h1>MetaCoin</h1>
        <h2>Example Truffle Dapp</h2>
        <OwnAccount fromAccount = {store.fromAccount} />
        <br/>
        <SendCoin store={store} />
        <br/>
        <span class="hint"><strong>Hint:</strong> open the browser developer console to view any errors and warnings.</span>
      </div>
    );
  }
}

export default App
