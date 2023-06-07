import React from "react";
import { useSearchParams } from 'next/navigation';
import LockerInfoRender from "@/components/Card/lockerInfoRender";
const LockerInfo = () => {
    const searchParams = useSearchParams();
    const lockerAddress = searchParams.get('lockerAddress');
 
  return (
    <div className="text-center">
      <h2>Locker Information</h2>
      <div >
        {/* TODO: add loader depends on fetching all lockers */}
        <LockerInfoRender lockerAddress={lockerAddress} />
      </div>
    </div>
  );
};

export default LockerInfo;