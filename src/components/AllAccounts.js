import React, {Component} from "react";
import { observer } from "mobx-react";

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
  
const AllAccounts = observer(({accounts})=>{
    var rows = accounts.map(account=>(
        <TableRow>
            <TableRowColumn>{account.address}</TableRowColumn>
            <TableRowColumn>{account.balance}</TableRowColumn>
        </TableRow>
    ));
    
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn>Account</TableHeaderColumn>
                    <TableHeaderColumn>Balance</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows}
            </TableBody>
        </Table>
    );

});

export default AllAccounts;