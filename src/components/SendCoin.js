import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import { observer } from "mobx-react";
import { observable, action } from "mobx";




const styles = {
    dropDown: {
      width: 200,
    },
    button: {
      margin: 10  
    }
};

@observer
export default class SendCoin extends Component {

    constructor(props){
        super(props);
    }
    
    @action
    handleAddressChange(event, index, value){
        event.preventDefault();
        this.props.store.toAddress = value;
    }

    @action
    handleAmountChange(event){
        event.preventDefault()
        this.props.store.amount = event.target.value;
    }

    sendCoin(){
        this.props.store.transfer();
    }

    render(){
        const store = this.props.store;

        if(!store.fromAccount || store.accounts.length == 0){
            return null;
        }

        const accounts = this.props.store.accounts;
        const fromAddress = this.props.store.fromAccount.address;
        const accountList = accounts.map((account)=>(
            <MenuItem value={account.address} primaryText={account.address} />
        ));

        return (
            <div>
                <h2>Send MetaCoin</h2>
                  
                 <TextField
                    value = {fromAddress}
                    floatingLabelText="From Address"
                    disabled = {true}
                 />
                
                <br/>

                <TextField value = {this.amount} 
                    floatingLabelText="Amount: "
                    hintText="e.g., 95"
                    onChange={this.handleAmountChange.bind(this)}
                />
                <br/>

                <SelectField value = {store.toAddress} floatingLabelText="To Address:"
                    onChange={this.handleAddressChange.bind(this)} autoWidth={true}>
                    {accountList}
                </SelectField>

                <br/>

                <RaisedButton label="Send Coin" primary={true} style={styles.button} onClick={this.sendCoin.bind(this)} />

                <br/>
                {store.status}
                
                <br/><br/>
            </div>
        );

    }


}


