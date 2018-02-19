
import React, {Component} from "react";
import { observer } from "mobx-react";

const OwnAccount = observer(({fromAccount})=>{
    return(
        <p>You have {fromAccount.balance} MetaCoins at this address {fromAccount.address}. </p>
    );
});

export default OwnAccount;