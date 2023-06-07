import BigNumber from "bignumber.js";
import React, { useState } from "react";
import Countdown from "react-countdown";
import { useApplicationContext } from "@/context/ApplicationContext";
import { usePoolContext } from "@/context/PoolContext";
// import { useLockerContract } from "../../hooks/useContract";
// import Loader from "../Loader";

const LockerInfoRender = (props) => {
  const { lockerAddress } = props;
  const [loading, setLoading] = useState(false);
  const account ="0x3421342"
//   const {
//     triggerUpdateAccountData,
//   } = useApplicationContext();

//   const LockerContract = useLockerContract(lockerAddress, true)

  const poolContext = usePoolContext();
  let lockerInfo = poolContext.allLocker[lockerAddress];

  if (!lockerInfo) {
    return null;
  }

  const time = new Date(parseInt(lockerInfo.time) * 1000);

//   const withdraw = async () => {
//     setLoading(true);

//     try {
//       const tx = await LockerContract.withdrawTokenAll({
//         from: account,
//       });

//       await tx.wait();

//       triggerUpdateAccountData();
//       // TODO: add trigger for update lockerInfo after withdraw
//     } catch (error) {
//       console.log('locker withdraw Error', )
//     } finally {
//       setLoading(false);
//     }
//   };
const withdraw = () =>{

}

  return (
    <div  style={{ margin: 10, minWidth: 400 }}>
      <div
        style={{
          flex: 3,
        }}
      >
        {/* IDO Information */}
        <div style={{ marginTop: 15 }} >
          <p>Locker name</p>
          <p>
            {lockerInfo.name}
          </p>
        </div>
        <div style={{ marginTop: 15 }} fd="row" jc="space-between">
          <p>Locker address</p>
          <p>{lockerAddress}</p>
        </div>
        <div style={{ marginTop: 15 }} fd="row" jc="space-between">
          <p>Token name</p>
          <p>{lockerInfo.token.tokenName}</p>
        </div>
        <div style={{ marginTop: 15 }} fd="row" jc="space-between">
          <p>Token address</p>
          <p>
            {lockerInfo.token.tokenAddress}
          </p>
        </div>
        <div style={{ marginTop: 15 }} fd="row" jc="space-between">
          <p>Locker balance</p>
          <p>
            {BigNumber(lockerInfo.balance)
              .dividedBy(
                BigNumber(10 ** parseInt(lockerInfo.token.tokenDecimals))
              )
              .toFixed(2) +
              " $" +
              lockerInfo.token.tokenSymbol}
          </p>
        </div>
        <div style={{ marginTop: 15 }} fd="row" jc="space-between">
          <p>Withdrawer</p>
          <p>{lockerInfo.withdrawer}</p>
        </div>
        <div style={{ marginTop: 15 }} fd="row" jc="space-between">
          <p>Unlock time</p>
          <p>{time.toString()}</p>
        </div>
        <div style={{ marginTop: 15 }} fd="row" jc="space-between">
          <p>Status</p>
          {BigNumber(lockerInfo.time).lt(Date.now() / 1000) ? (
            <p style={{ color: "var(--primary)" }}>UNLOCKED</p>
          ) : (
            <p>
              Unlock in{" "}
              <Countdown date={parseInt(lockerInfo.time) * 1000}></Countdown>
            </p>
          )}
        </div>
        {account ? (
          <div flex={1} ai="center">
            <button
              disabled={
                loading ||
                BigNumber(lockerInfo.balance).lte(0) ||
                !BigNumber(lockerInfo.time).lt(Date.now() / 1000) ||
                account.toLowerCase() !== lockerInfo.withdrawer.toLowerCase()
              }
              onClick={(e) => {
                e.preventDefault();
                withdraw();
              }}
            >
              {loading ? "<Loader />" : "WITHDRAW" }
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default LockerInfoRender;