import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';




const styles = {
    dropDown: {
      width: 200,
    },
    button: {
      margin: 10  
    }
  };

export default class SendCoin extends Component {

    static propTypes = {
        fromAddress: PropTypes.string,
        contractInstance: PropTypes.object,
        addresses: PropTypes.array
    };

    static defaultProps = {
        fromAddress: null,
        contractInstance: null,
        addresses: []
    };

    constructor(props) {
        super(props);
        this.state = {
            fromAddress: this.props.fromAddress,
            toAddress: this.props.addresses[0],
            amount: null,
            status: '',
            balance: null
        };

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            toAddress: nextProps.addresses[0],
            fromAddress: nextProps.fromAddress
        })
    }


    handleAddressChange(event, index, value){
        event.preventDefault();
        this.setState({
            toAddress: value
        })
    }

    handleAmountChange(event){
        event.preventDefault()
        this.setState({
            amount: event.target.value
        });
    }
   
    refreshBalance(){
        this.props.contractInstance.getBalance.call(this.state.fromAddress, {from: this.state.fromAddress})
            .then(value=>{
                this.setState({
                    balance: value.valueOf()
                })
            }).catch(e=>{
                this.setState({
                    status: 'Error getting the balance'
                })
            });
    }

    sendCoin(){
        const contract = this.props.contractInstance;
        const fromAddress = this.state.fromAddress;
        const toAddress = this.state.toAddress;
        const amount = this.state.amount;

        this.setState({
            status: 'Initiating transaction... (please wait)'
        });

        var self = this;
        contract.sendCoin(toAddress, amount, {from:fromAddress}).then(()=>{
            self.setState({
                status: 'Transaction completed'
            });
            self.props.handler();
        }).catch(e=>{
            self.setState({
                status: 'Error sending coin'          
            });
        })
    }

    render(){
        console.log(this.props);
        var accountList = this.props.addresses.map((address)=>(
            <MenuItem value={address} primaryText={address} />
        ));

    

        return (
            <div>
                <h1>Send MetaCoin</h1>
                  
                 <TextField
                    value = {this.state.fromAddress}
                    floatingLabelText="From Address"
                    disabled = {true}
                 />
                
                <br/>

                <TextField value = {this.state.amount} 
                    floatingLabelText="Amount: "
                    hintText="e.g., 95"
                    onChange={this.handleAmountChange.bind(this)}
                />
                <br/>

                <SelectField value = {this.state.toAddress} floatingLabelText="To Address:"
                    onChange={this.handleAddressChange.bind(this)} autoWidth={true}>
                    {accountList}
                </SelectField>

                <p> {this.state.status} </p>

                <RaisedButton label="Send Coin" primary={true} style={styles.button} onClick={this.sendCoin.bind(this)} />
                
                <br/><br/>
            </div>
        );

    }


}
