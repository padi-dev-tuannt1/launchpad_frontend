import React, { useEffect, useState } from "react";
import PoolInfoRender from "@/components/Card/PoolInfoRender";
import { usePoolContext } from '@/context/poolContext';
import { useSearchParams } from 'next/navigation';
import IDOAction from "@/components/Modal/idoActionModal";
import { useIDOPoolContract } from "@/hooks/useContract";
import { ethers } from "ethers";

// import {  isValidPool } from "../utils/utils";

const LaunchpadInFo = () => {
  const searchParams = useSearchParams();
  const idoAddress = searchParams.get('idoAddress');
  const [isLoading, setIsLoading] = useState(true);
  const [prompt, setPromt] = useState('');
  const { allPools } = usePoolContext();

  const idoInfo = allPools[idoAddress];
  const IDOPoolContract = useIDOPoolContract(idoAddress);

  useEffect(() => {
    const checkPoolByContract = async () => {
      try {
        const hasRewardToken = await IDOPoolContract.rewardToken();
        if (ethers.utils.isAddress(hasRewardToken)) {
          setPromt('Wait for the pool data is loaded... It may take more than 30 seconds.')
        } else {
          setIsLoading(false);
          return setPromt('Address is not valid...');
        }
      } catch (error) {
        console.log('CheckPoolByContract Error:', error)
        setIsLoading(false);
        return setPromt('Address is not valid...');
      }
    }

    if (IDOPoolContract === null) {
      setIsLoading(false);
      return setPromt('Address is not valid...');
    }

    if (!idoInfo && IDOPoolContract) {
      return checkPoolByContract();
    }

    const isValidPoolData = !!idoInfo;

    if (isValidPoolData) {
      setIsLoading(false);
      return setPromt('');
    } else {
      setIsLoading(false);
      return setPromt('Pool is not valid...');
    }


  },[IDOPoolContract, idoInfo])


  return (
    <div>
      <div>Launchpad</div>
      {
        (
          <div>
            <PoolInfoRender idoAddress={idoAddress} />
            <IDOAction idoAddress={idoAddress} />
          </div>
        )
      }
    </div>
  );
};

export default LaunchpadInFo