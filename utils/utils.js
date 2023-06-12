import { ethers, providers } from "ethers";
import ERC20 from "../contracts/ERC20.json";
import RewardToken from "../contracts/RewardToken.json"
import { networks } from "@/constant/networkInfo";
import { STORAGE_NETWORK_ID } from "@/constant";
import { ZERO_ADDRESS } from "@/constant";
import BigNumber from "bignumber.js";
import Locker from "../contracts/TokenLocker.json";

const { rpc } = networks[STORAGE_NETWORK_ID];

const provider = new ethers.providers.JsonRpcProvider(rpc);
export function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
export const getTokenData = async (tokenAddress) => {

  if (!ethers.utils.isAddress(tokenAddress)) {
    return null;
  }
  const token = new ethers.Contract(tokenAddress, RewardToken.abi, provider)

  const tokenName = await token.name();

  const tokenSymbol = await token.symbol();


  const tokenDecimals = await token.decimals();
  const totalSupply = await token.totalSupply();
  return {
    tokenAddress,
    tokenName,
    tokenDecimals,
    tokenSymbol,
    totalSupply,
  };
};

export const loadPoolData = async (idoPool) => {
  try {

    let metadataURL = idoPool.metadataURL
    let tokenAddress = idoPool.rewardToken
    const token = new ethers.Contract(tokenAddress, ERC20.abi,provider);

    const userData = idoPool.userInfos

    let tokenName =await token.name();

    let tokenSymbol = await token.symbol();
    let tokenDecimals = await token.decimals();
    let totalSupply = await token.totalSupply();
    let finInfo = idoPool.finInfo


    const timestamps = idoPool.timestamps
    const dexInfo = idoPool.dexInfo
    const totalInvestedETH = idoPool.totalInvestedETH

    const {
      startTimestamp,
      endTimestamp,
      unlockTimestamp,
    } = timestamps;

    const {
      tokenPrice,
      hardCap,
      softCap,
      minEthPayment,
      maxEthPayment,
      listingPrice,
      lpInterestRate,
    } = finInfo;

    const progress = parseFloat(
      BigNumber(totalInvestedETH)
        .times(100)
        .dividedBy(BigNumber(finInfo.hardCap))
    );

    let result = {
      tokenAddress: tokenAddress,
      // metadata: metadata,
      tokenName: tokenName,
      tokenDecimals: tokenDecimals,
      tokenSymbol: tokenSymbol,
      totalSupply: totalSupply,
      idoAddress: idoPool.id,
      // balance: balance,
      tokenRate: tokenPrice,
      listingRate: listingPrice,
      dexInfo,
      lpPercentage: lpInterestRate,
      start: startTimestamp,
      end: endTimestamp,
      claim: unlockTimestamp,
      min: minEthPayment,
      max: maxEthPayment,
      softCap: softCap,
      hardCap: hardCap,
      totalInvestedETH: totalInvestedETH,
      progress: progress,
      metadataURL,
      userData: userData,
    };
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
export const getBalanceOfERC20 = async (tokenAddress, address) => {
  const token = new ethers.Contract( tokenAddress,ERC20.abi);

  let balance = await token.balanceOf(address);
  return balance;
};
export const getLockerData = async (lockerAddress) => {
  const locker = new ethers.Contract(lockerAddress, Locker.abi,provider);
  let token = await locker.token()
  let tokenData = await getTokenData(token, web3);
  let name = await locker.name();
  let withdrawer = await locker.withdrawer();
  let balance = await getBalanceOfERC20(token, lockerAddress);
  let time = await locker.withdrawTime();
  let owner = await locker.owner();
  return {
    lockerAddress: lockerAddress,
    token: tokenData,
    name: name,
    withdrawer: withdrawer,
    time: time,
    owner: owner,
    balance: balance,
  };
};
export function getContract(address, ABI, account = '') {
  if (!ethers.utils.isAddress(address) || address === ZERO_ADDRESS) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  if (account != '') {
    return new ethers.Contract(address, ABI, account);
  }
  return new ethers.Contract(address, ABI, provider)
}

