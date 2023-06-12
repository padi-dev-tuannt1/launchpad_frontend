import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
// import CreateLocker from "../components/Button/createLocker";
// import LockerList from "../components/Modal/lockerList";
// import LongIdoList from "../components/Modal/longIdoList";
import { useApplicationContext } from "@/context/applicationContext";
import Link from "next/link";

const Account = () => {
  const { account } = useWeb3React();
  const [showZero, setShowZero] = useState(0);

  // const { domainSettings: { isLockerEnabled } } = useApplicationContext();
  const isLockerEnabled = false
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
    <div >
      <h2>Account</h2>
      <div >
        <div >
          <div >
            <h2 style={{ flex: 1, whiteSpace: "nowrap", margin: 20 }}>
              My IDO
            </h2>
            {account ? (
              <Link
                href="/publish"
                style={{
                  whiteSpace: "nowrap",
                  backgroundColor: "var(--primary)",
                  padding: 10,
                  borderRadius: 20,
                  fontWeight: 700,
                  paddingLeft: 30,
                  paddingRight: 30,
                  textDecoration: "none",
                  color: "var(--card)",
                }}
              >
                Create IDO Poll
              </Link>
            ) : null}
          </div>
          {/* <LongIdoList /> */}
        </div>

        {
          isLockerEnabled &&
          <div flex={1}>
            <div >
              <h2 style={{ flex: 1, whiteSpace: "nowrap", margin: 20 }}>
                My Locker
              </h2>
              {/* <CreateLocker /> */}
            </div>
            <div flex={1}>
              <div flex={4}></div>
              <div flex={2} >
                <p>show zero?</p>
                <input type="checkbox" value={showZero} onChange={handleShowZero} />
              </div>
            </div>
            {/* <LockerList showZero={showZero} showUserLockers /> */}
          </div>
        }
      </div>
    </div>
  );
};

export default Account;