import BigNumber from "bignumber.js";
import React from "react";
import Countdown from "react-countdown";
import Link from "next/link";
import { usePoolContext } from "@/context/PoolContext";

const LongLocker = (props) => {
  const { lockerAddress } = props;
  const lockerInfo = usePoolContext().allLocker[lockerAddress];

  if (!lockerInfo) {
    return (
      <div
        ai="center"
        style={{ maxWidth: 500, margin: 20, minWidth: 400 }}
      ></div>
    );
  }

  return (
    <Link
      href={`/locker/${lockerAddress}`}
      style={{
        textDecoration: "none",
        color: "white",
        width: "100%",
      }}
    >
      <div
        style={{ maxWidth: "100%" }}
      >
        <div flex={1}>
          <div>{lockerInfo.name}</div>
          <p>{lockerInfo.token.tokenSymbol}</p>
        </div>
        <div flex={1} ai="flex-end">
          <div>
            {BigNumber(lockerInfo.balance)
              .dividedBy(
                BigNumber(10 ** parseInt(lockerInfo.token.tokenDecimals))
              )
              .toFixed(2) +
              " $" +
              lockerInfo.token.tokenSymbol}
          </div>
          {BigNumber(lockerInfo.time).lt(Date.now() / 1000) ? (
            <p style={{ color: "var(--primary)" }}>UNLOCKED</p>
          ) : (
            <p>
              <Countdown date={parseInt(lockerInfo.time) * 1000}></Countdown>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
export default LongLocker;
