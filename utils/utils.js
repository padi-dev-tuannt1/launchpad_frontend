import { ethers } from "ethers";
import ERC20 from "../contracts/ERC20.json";

export function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
export const getTokenData = async (tokenAddress) => {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/'); 
  if (!ethers.utils.isAddress(tokenAddress)) {
    return null;
  }
  const token = new ethers.Contract( tokenAddress,ERC20.abi,provider)
 
  const tokenName = await token.name();
  
  const tokenSymbol = await token.symbol();
 
  
  const tokenDecimals = await token.decimals();
  const totalSupply = await token.totalSupply();
  // Promise.all([tokenName, tokenSymbol, tokenDecimals,totalSupply]).then((values) => {
  //   console.log(values); // [3, 1337, "foo"]
  // });
  return {
    tokenAddress,
    tokenName,
    tokenDecimals,
    tokenSymbol,
    totalSupply,
  };
};

