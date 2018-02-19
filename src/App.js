import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import MetaCoin from '../build/contracts/MetaCoin.json'
import getWeb3 from './utils/getWeb3'
import SendCoin from './components/SendCoin'
import {Tabs, Tab} from 'material-ui/Tabs';


import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import Store from './models/Store';
import OwnAccount from './components/OwnAccount';
import AllAccounts from './components/AllAccounts';


const styles ={
  root:{
    margin: 'auto',
    width: '60%'
  }
}

const store = new Store();

class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      tabIndex: 0
    };
  }

  handleTabChange = (value) => {
    this.setState({
      tabIndex:value
    });
  }

  render() {
    return (
      <div style={styles.root}>
        <h1>MetaCoin Application</h1>
        <div>
          <Tabs value={this.state.tabIndex} onChange={this.handleTabChange}>
            <Tab label="Main Account" value ={0}>
              <OwnAccount store = {store} />
              <br/>
              <SendCoin store={store} />
              <br/>
            </Tab>
            <Tab label="All Accounts" value = {1}>
              <AllAccounts accounts ={store.accounts}/>
            </Tab>
          </Tabs>
          <span class="hint"><strong>Hint:</strong> open the browser developer console to view any errors and warnings.</span>
        </div>
      </div>
    );
  }
}

export default App
