import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import React, { useState } from "react";
import Countdown from "react-countdown";
import { useApplicationContext } from "@/context/applicationContext";
import { usePoolContext } from "@/context/poolContext";
import { useIDOPoolContract } from "@/hooks/useContract";
import { utils } from "@/utils";

const WithdrawETH = (props) => {
  const { account, library } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const { idoAddress } = props;

  const {
    baseCurrencySymbol,
    TokenLockerFactoryContract,
  } = useApplicationContext();

  const idoInfo = usePoolContext().allPools[idoAddress];
  const IDOPoolContract = useIDOPoolContract(idoAddress);

  if (!account || !idoInfo || !library) {
    return null;
  }

//   if (!utils.isValidPool(idoInfo)) {
//     return null;
//   }

//   if (idoInfo.owner.toLowerCase() !== account.toLowerCase()) {
//     return null;
//   }

  const withdrawETH = async () => {
    setLoading(true); // TODO: add action loader to the appropriate button
    try {
      const isNeedLocker = parseInt(idoInfo.claim) > parseInt(Date.now() / 1000);

      const signer = IDOPoolContract.connect(library.getSigner());
      const tx = await signer.withdrawETH({value: isNeedLocker ? await TokenLockerFactoryContract.fee() : 0});

      const receipt = await tx.wait();

    //   triggerUpdateAccountData();
      // TODO: add trigger for update IDOInfo after actions
      console.log("withdrawETH receipt", receipt);
    } catch (err) {
      console.log("withdrawETH Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  const withdrawToken = async () => {
    setLoading(true); // TODO: add action loader to the appropriate button
    try {
        const signer = IDOPoolContract.connect(library.getSigner());
        const tx = await signer.refundTokens();
      const receipt = await tx.wait();

    //   triggerUpdateAccountData();
      // TODO: add trigger for update IDOInfo after actions
      console.log("withdrawToken receipt", receipt);
    } catch (err) {
      console.log("withdrawToken Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  const withdrawUnsoldToken = async () => {
    setLoading(true); // TODO: add action loader to the appropriate button
    try {
        const signer = IDOPoolContract.connect(library.getSigner());
        const tx = await signer.withdrawNotSoldTokens();

      const receipt = await tx.wait();

    //   triggerUpdateAccountData();
      // TODO: add trigger for update IDOInfo after actions
      console.log("withdrawUnsoldToken receipt", receipt);
    } catch (err) {
      console.log("withdrawUnsoldToken Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  const hasEnded = parseInt(idoInfo.end) < parseInt(Date.now() / 1000);

  return (
    <div
      style={{
        minWidth: 350,
        flex: 1,
        margin: 10,
      }}
    >
      <h2>WITHDRAW</h2>
      <p>(Pool owner only)</p>
      {
        !hasEnded && (
          <div fd="row" ai="center" jc="space-between">
            <div flex={3}>
              <p>Can withdraw in</p>
            </div>

            <Countdown date={idoInfo.end * 1000} />
          </div>
        )
      }
      <div fd="row" ai="center" jc="space-between">
        <div flex={2}>
          <p>Total invested</p>
          <p>
            {idoInfo.balance +
              " " +
              baseCurrencySymbol}
          </p>
        </div>
        <button
          disabled={
            !hasEnded ||
            BigNumber(idoInfo.totalInvestedETH).lt(BigNumber(idoInfo.softCap)) ||
            idoInfo.balance == 0
          }
          onClick={(e) => {
            e.preventDefault();
            withdrawETH();
          }}
        >
          WITHDRAW
        </button>
      </div>
      <div fd="row" ai="center" jc="space-between">
        <div flex={2}>
          <p>Unsold token</p>
          <p>
            {BigNumber(idoInfo.unsold)
              .dividedBy(10 ** idoInfo.tokenDecimals)
              .toFixed(2) +
              " " +
              idoInfo.tokenSymbol}
          </p>
        </div>
        {BigNumber(idoInfo.totalInvestedETH).lt(BigNumber(idoInfo.softCap)) ? (
          <button
            disabled={
              !hasEnded ||
              !BigNumber(idoInfo.totalInvestedETH).lt(BigNumber(idoInfo.softCap)) ||
              (!idoInfo.unsold || idoInfo.unsold == "0")
            }
            onClick={(e) => {
              e.preventDefault();
              withdrawToken();
            }}
          >
            WITHDRAW ALL TOKEN
          </button>
        ) : (
          <button
            disabled={
              !hasEnded ||
              idoInfo.balance > 0 ||
              (!idoInfo.unsold || idoInfo.unsold == "0")
            }
            onClick={(e) => {
              e.preventDefault();
              withdrawUnsoldToken();
            }}
          >
            WITHDRAW UNSOLD TOKEN
          </button>
        )}
      </div>
    </div>
  );
};
export default WithdrawETH;