import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { usePoolContext } from "@/context/PoolContext";
import LongLocker from "../Card/longLocker";
const LockerList = (props) => {
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [lockersAddresses, setLockersAddresses] = useState([])

  const { tokenAddress, owner, showZero, showUserLockers } = props;

  const { allLocker, allLockerAddress, userLockersAddresses } = usePoolContext();
  console.log(allLocker, tokenAddress)


  useEffect(() => {
    setLockersAddresses(showUserLockers ? userLockersAddresses : allLockerAddress);
  }, [showUserLockers, userLockersAddresses, allLockerAddress]);
  // if (!lockersAddresses.length) {
  //   return null;
  // }

  // sort lockers by unlock time
  lockersAddresses.sort((a, b) => allLocker[b]?.time - allLocker[a]?.time);

  const loadmore = (amount) => {
    setLimit((p) => (p < lockersAddresses.length ? p + amount : p));
  };

  return (
    <div >
      <div >
        <div
          style={{ flexWrap: "wrap", marginTop: 20 }}
        >
          {lockersAddresses.map((lockerAddress, index) => {
            console.log(lockerAddress,index)
            if (index >= limit) {

              return null;
            }
            if (!showZero) {
              if (BigNumber(allLocker[lockerAddress]?.balance).lte(0)) {

                return null;
              }
            }
            if (owner && owner !== "") {
              if (allLocker[lockerAddress]?.owner.toLowerCase() !== owner.toLowerCase()) {


                return null;
              }
            }
            if (tokenAddress && tokenAddress !== "") {
              if (
                allLocker[lockerAddress]?.token.tokenAddress.toLowerCase() !==
                tokenAddress.toLowerCase()
              ) {


                return null;
              }
            }
            return (
              <div key={index} style={{ padding: 10 }}>
                {console.log(lockerAddress)}
                <LongLocker lockerAddress={lockerAddress} />
              </div>
            );
          })}
        </div>
      </div>
      {limit >= lockersAddresses.length ? null : (
        <button
          onClick={async (e) => {
            e.preventDefault();
            setLoading(true);
            await utils.timeout(1000);
            loadmore(6);
            setLoading(false);
          }}
        >
          {loading ? "LOADING . . ." : "LOADMORE"}
        </button>
      )}
    </div>
  );
};

export default LockerList;
