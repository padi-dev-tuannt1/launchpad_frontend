import { ethers } from "ethers";
export function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
export const getTokenData = async (tokenAddress) => {
  if (!ethers.utils.isAddress(tokenAddress)) {
    return null;
  }
  const token = await ethers.Contract(ERC20.abi, tokenAddress)
  let tokenName = await token.methods.name().call();
  let tokenSymbol = await token.methods.symbol().call();
  let tokenDecimals = await token.methods.decimals().call();
  let totalSupply = await token.methods.totalSupply().call();
  return {
    tokenAddress,
    tokenName,
    tokenDecimals,
    tokenSymbol,
    totalSupply,
    tokenDenominator: BigNumber(10).pow(
      BigNumber(parseInt(tokenDecimals))
    ),
  };
};

