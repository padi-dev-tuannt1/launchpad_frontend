import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import CreateLaunchpad from "../components/Button/createLaunchpad";
import CreateLocker from "../components/Button/createLocker";
import LockerList from "../components/Modal/lockerList";
import LongIdoList from "../components/Modal/longIdoList";
import { useApplicationContext } from "@/context/ApplicationContext";

const Account = () => {
  const { account } = useWeb3React();
  const [showZero, setShowZero] = useState(0);

  const { domainSettings: { isLockerEnabled } } = useApplicationContext();

  if (!account) {
    return (
      <div >
        <h2>Account</h2>
        <p>Please login</p>
      </div>
    );
  }

  const handleShowZero = (e) => {
    setShowZero(!showZero);
  };

  return (
    <div ai="center">
      <h2>Account</h2>
      <div fd="row" jc="space-between">
        <div flex={1}>
          <div fd="row" ai="center" jc="space-between">
            <h2 style={{ flex: 1, whiteSpace: "nowrap", margin: 20 }}>
              My IDO
            </h2>
            <CreateLaunchpad />
          </div>
          <LongIdoList />
        </div>

        {
          isLockerEnabled &&
          <div flex={1}>
            <div fd="row" ai="center" jc="space-between">
              <h2 style={{ flex: 1, whiteSpace: "nowrap", margin: 20 }}>
                My Locker
              </h2>
              <CreateLocker />
            </div>
            <div fd="row" flex={1}>
              <div flex={4}></div>
              <div flex={2} ai="center" fd="row" jc="center">
                <p>show zero?</p>
                <input type="checkbox" value={showZero} onChange={handleShowZero} />
              </div>
            </div>
            <LockerList showZero={showZero} showUserLockers />
          </div>
        }
      </div>
    </div>
  );
};

export default Account;