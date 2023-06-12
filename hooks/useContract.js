import { useMemo } from 'react';
import { ethers } from 'ethers';
import TokenLockerFactory from '@/contracts/TokenLockerFactory.json';
import Locker from "@/contracts/TokenLocker.json";
import IDOFactory from '@/contracts/IDOFactory.json';
import IDOPool from "@/contracts/IDOPool.json";
import STORAGE from '@/contracts/Storage.json';
import ERC20 from '@/contracts/ERC20.json';
import { STORAGE_NETWORK_ID } from '@/constant';
import { networks } from '@/constant/networkInfo';
import { getContract } from '@/utils/utils';
import { useWeb3React } from '@web3-react/core';

export function useStorageContract() {
  const { storage, rpc } = networks[STORAGE_NETWORK_ID];

  return useMemo(() => {
    if (!storage) return null;

    try {
     const provider = new ethers.providers.JsonRpcProvider(rpc)
        return new ethers.Contract(storage, STORAGE.abi, provider)
    } catch (error) {
      console.error('Failed to get Storage contract', error);
    }

    return null;
  }, [storage, rpc]);
}

// returns null on errors
function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useWeb3React()

  return useMemo(() => {
    if (!address || !ethers.utils.isAddress(address) || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useLockerFactoryContract(address, withSignerIfPossible) {
  return useContract(address, TokenLockerFactory.abi, withSignerIfPossible)
}

export function useLockerContract(address, withSignerIfPossible) {
  return useContract(address, Locker.abi, withSignerIfPossible)
}

export function useIDOFactoryContract(address, withSignerIfPossible) {
  return useContract(address, IDOFactory.abi, withSignerIfPossible)
}

export function useTokenContract(tokenAddress, withSignerIfPossible) {
  return useContract(tokenAddress, ERC20.abi, withSignerIfPossible)
}

export function useIDOPoolContract(IDOAddress, withSignerIfPossible) {
  return useContract(IDOAddress, IDOPool.abi, withSignerIfPossible)
}
