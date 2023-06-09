import React from "react";
import BuyTokenCard from "../Card/buyTokenCard";
import { useWeb3React } from "@web3-react/core";
import WithdrawETH from "../Card/withdrawCard";

const IDOAction = (props) => {
    const { idoAddress } = props;
      const { account } = useWeb3React();

      if (!account || !idoAddress) {
        return null;
      }
    return (
        <div>
            <BuyTokenCard idoAddress={idoAddress} />
            <WithdrawETH idoAddress={idoAddress} />
        </div>
    );
};

export default IDOAction;
