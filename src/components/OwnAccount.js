
import React, {Component} from "react";
import { observer } from "mobx-react";

const OwnAccount = observer(({store})=>{
    if (!store.fromAccount) {
        return null;
    }
    return(
        <div>
            <h2> Account Summary </h2>
            <p>You have {store.fromAccount.balance} MetaCoins at this address {store.fromAccount.address}. </p>
        </div>
    );
});

export default OwnAccount;