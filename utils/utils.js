import { ethers, providers } from "ethers";
import ERC20 from "../contracts/ERC20.json";
import { networks } from "@/constant/networkInfo";
import { STORAGE_NETWORK_ID } from "@/constant";
import { ZERO_ADDRESS } from "@/constant";
const { rpc } = networks[STORAGE_NETWORK_ID];

const provider = new ethers.providers.JsonRpcProvider(rpc); 
export function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
export const getTokenData = async (tokenAddress) => {
 
  if (!ethers.utils.isAddress(tokenAddress)) {
    return null;
  }
  const token = new ethers.Contract( tokenAddress,ERC20.abi,provider)
 
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

export function getContract(address, ABI, account = '') {
  if (!ethers.utils.isAddress(address) || address === ZERO_ADDRESS) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  if(account != ''){
    return new ethers.Contract(address, ABI, account);
  }
  return  new ethers.Contract(address,ABI,provider)
}

