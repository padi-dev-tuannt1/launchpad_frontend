import React, { useState } from "react";
import LockerList from "../components/Modal/lockerList";
import SearchBar from "@/components/SearchBar";

const Locker = (props) => {
  const [address, setAddress] = useState("");
  const [showZero, setShowZero] = useState(0);

//   if (!contract.web3) {
//     return null;
//   }

  const handleShowZero = (e) => {
    setShowZero(!showZero);
  };
  const onHandleSearch = (value) => {
    setAddress(value)
  }
  const onClearSearch = () => {
    setAddress('')
  }
  return (
    <div >
      <h2>Locker</h2>
     
      <div >
        <div flex={7}></div>
        <div flex={2} >
          show zero?
          <input type="checkbox" value={showZero} onChange={handleShowZero} />
        </div>
      </div>
      <SearchBar onHandleSearch={onHandleSearch} onClearSearch={onClearSearch} />
      <LockerList showZero={showZero} tokenAddress={address} />
    </div>
  );
};

export default Locker;