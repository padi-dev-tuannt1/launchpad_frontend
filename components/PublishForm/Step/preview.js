import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import { useRouter } from "next/router";
import { useStoreContext } from "@/context/store";
import { chainRouter } from "@/constant/networkInfo";
// import SocialMediaModal from "../../../Modal/socialmediaModal";
import { useApplicationContext } from "@/context/applicationContext";
// import { useTokenContract } from "../../../../hooks/useContract";
// import ReadMore from "../../readMore";
// import { isAddress } from "../../../../utils/utils";
import { ETHER } from "@/constant";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { useIDOFactoryContract } from "@/hooks/useContract";

export default function Preview() {
  const { account, chainId, library } = useWeb3React();
 
  const {
    baseCurrencySymbol,
    IDOFactoryAddress,
    TokenLockerFactoryAddress,
    FeeTokenContract,
    FeeTokenSymbol,
    FeeTokenApproveToFactory,
    triggerUpdateAccountData,
    isFeeTokenDataFetching,
  } = useApplicationContext();
  console.log(IDOFactoryAddress)
  const IDOFactoryContract = useIDOFactoryContract(IDOFactoryAddress,true)
  console.log(IDOFactoryContract)
  const router = useRouter();

  const {
    tokenInformation: [tokenInfo],
    address: [tokenAddress],
    icon: [icon, setIcon],
    tokenRate: [tokenRate],
    hardCap: [hardCap],
    softCap: [softCap],
    minETH: [minETH],
    maxETH: [maxETH],
    listingRate: [listingRate],
    liquidityPercentage: [liquidityPercentage],
    isAddLiquidityEnabled: [isAddLiquidityEnabled],
    start: [start],
    end: [end],
    unlock: [unlock],

    description: [description],
    website: [website],
    discord: [discord],
    telegram: [telegram],
    twitter: [twitter],
  } = useStoreContext();

//   const ipfs = useIPFS();

//   const tokenContract = useTokenContract(tokenAddress);
  const [IDOFactoryFee, sesIDOFactoryFee] = useState("0");
  const [tokenApprove, setTokenApprove] = useState("");
  const [isTokenApprovalFetching, setIsTokenApprovalFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  const tokenRateBN = BigNumber(tokenRate);
  const hardCapBN = BigNumber(hardCap);
  const listingRateBN = BigNumber(isAddLiquidityEnabled ? listingRate : 0);
  const lp = BigNumber(isAddLiquidityEnabled ? liquidityPercentage : 0);

  const oneTokenInWei = ETHER.div(tokenRateBN).integerValue(BigNumber.ROUND_CEIL);
  const oneListingTokeninWei = ETHER.div(listingRateBN).integerValue(BigNumber.ROUND_CEIL);

  const requiredToken = ETHER.times(hardCapBN).div(oneTokenInWei)
    .plus(ETHER.times(hardCapBN).div(oneListingTokeninWei).times(lp).dividedBy(100))

//   useEffect(() => {
//     const checkTokenApproval = async () => {
//       setIsTokenApprovalFetching(true);
//       try {
//         let tokenApproval = await tokenContract.allowance(account, IDOFactoryAddress);
//         setTokenApprove(tokenApproval);
//       } catch (error) {
//         console.log('checkTokenApproval error: ', error);
//       } finally {
//         setIsTokenApprovalFetching(false);
//       }
//     }
//     if (isAddress(tokenAddress) && tokenContract) {
//       checkTokenApproval();
//     } else {
//       setTokenApprove("");
//     }
//   }, [account, library, IDOFactoryAddress, tokenContract, tokenAddress]);

  useEffect(() => {
    const fetchIDOFactoryFee = async () => {
      const IDOFactoryFee = await IDOFactoryContract?.feeAmount() || "0";
      sesIDOFactoryFee(IDOFactoryFee.toString());
    }

    fetchIDOFactoryFee();
  }, [IDOFactoryContract]);

  const pinJSONToIPFS = async (JSONBody) => {
    try {
      const JSONBodyString = JSON.stringify(JSONBody);
      const response = await ipfs.add(JSONBodyString);
      return {
        success: true,
        ipfsHash:
          response.path,
      };

    } catch (error) {

      console.log(error);
      return {
        success: false,
        message: error.message,
      };

    }
  };

  const createIDO = async () => {
    setLoading(true);

    try {
    //   const iconAdded = await ipfs.add(icon);

    //   const metadata = {
    //     imageHash: iconAdded.path,
    //     description,
    //     links: {
    //       website,
    //       discord,
    //       telegram,
    //       twitter,
    //     }
    //   };

    //   const ipfsResonse = await pinJSONToIPFS(metadata);

    //   if (!ipfsResonse.success) {
    //     return {
    //       success: false,
    //       status: "😢 Something went wrong while uploading your tokenURI.",
    //     };
    //   }
      const tokenURI = "ipfsResonse.ipfsHash";

      const rewardToken = tokenAddress;

      const finInfo = [
        `0x${oneTokenInWei.toString(16)}`,
        `0x${ETHER.times(softCap).toString(16)}`,
        `0x${ETHER.times(hardCap).toString(16)}`,
        `0x${ETHER.times(minETH).toString(16)}`,
        `0x${ETHER.times(maxETH).toString(16)}`,
        listingRateBN.gt(0) ? `0x${oneListingTokeninWei.toString(16)}` : 0,
        parseInt(isAddLiquidityEnabled ? liquidityPercentage : 0),
      ];
      const timestamps = [
        `0x${BigNumber(start.getTime()).div(1000).decimalPlaces(0, 1).toString(16)}`,
        `0x${BigNumber(end.getTime()).div(1000).decimalPlaces(0, 1).toString(16)}`,
        `0x${BigNumber(unlock.getTime()).div(1000).decimalPlaces(0, 1).toString(16)}`,
      ];
      const dexInfo = [
        chainRouter[chainId][0].ROUTER,
        chainRouter[chainId][0].FACTORY,
        chainRouter[chainId][0].WETH,
      ];

      const tx = await IDOFactoryContract
        .createIDO(
          rewardToken,
          finInfo,
          timestamps,
          dexInfo,
          TokenLockerFactoryAddress,
          tokenURI,
          {
            from: account,
          },
        );

      const receipt = await tx.wait();

      console.log('createIDO receipt', receipt);

      triggerUpdateAccountData();
      const IDOCreatedIndex = receipt?.events?.findIndex?.((i) => i?.event === "IDOCreated");
      if (IDOCreatedIndex || IDOCreatedIndex === 0){
        router.push(`../launchpad/${receipt.events[IDOCreatedIndex].args.idoPool}`)
      }
    } catch (error) {
      console.log("createIDO Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const approveToken = async (amount, tokenContract) => {
    if (!tokenContract) {
      return;
    }
    setLoading(true);

    try {
      const tx = await tokenContract.approve(IDOFactoryAddress, amount, {
        from: account,
      });

      await tx.wait();

      setTokenApprove(amount);
      triggerUpdateAccountData();
    } catch (error) {
      console.log("approveToken Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div flex={1}>
      <h2 >Token information</h2>
      <div >
        <div
          style={{
            display: "flex",
            width: 140,
            height: 140,
            borderRadius: 20,
            margin: 20,
            backgroundColor: "var(--upper-card)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              e.preventDefault();
              const file = e.target.files[0];
              setIcon(file);
            }}
          ></input>
          {icon !== "" ? (
            <img
              style={{ width: 100, height: 100, borderRadius: 20 }}
              src={URL.createObjectURL(icon)}
            />
          ) : (
            <FaImage style={{ width: 100, height: 100, padding: 20 }} />
          )}
        </div>
      </div>
      {/* <SocialMediaModal
        website={website}
        discord={discord}
        telegram={telegram}
        twitter={twitter}
      /> */}
      <p>Description</p>
      {/* <ReadMore max={2000}>{description}</ReadMore> */}
      <p>{description}</p>
      <p>Token address</p>
      <p>
        {tokenInfo.tokenAddress}
      </p>
      <p>Token name</p>
      <p>{tokenInfo.tokenName}</p>
      <p>Total supply</p>
      <p>
        {BigNumber(tokenInfo.totalSupply)
          .toFormat(0) +
          " $" +
          tokenInfo.tokenSymbol}
      </p>
      <h2>IDO information</h2>
      <p>Token rate</p>
      <p>
        {"1 $" +
          baseCurrencySymbol +
          " -> " +
          ETHER.div(oneTokenInWei) +
          " $" +
          tokenInfo.tokenSymbol}
      </p>
      <div >
        <div style={{ marginLeft: 10, marginRight: 10 }}>
          <p>Soft Cap</p>
          <p>
            {BigNumber(softCap).toFormat(2) +
              " $" +
              baseCurrencySymbol}
          </p>
          <p>Hard Cap</p>
          <p>
            {hardCapBN.toFormat(2) +
              " $" +
              baseCurrencySymbol}
          </p>
         
        </div>
        <div style={{ marginLeft: 10, marginRight: 10 }}>
          <p>Minimum Buy</p>
          <p>
            {BigNumber(minETH).toFormat(2) +
              " $" +
              baseCurrencySymbol}
          </p>
          <p>Maximum Buy</p>
          <p>
            {BigNumber(maxETH).toFormat(2) +
              " $" +
              baseCurrencySymbol}
          </p>
          {
            isAddLiquidityEnabled && <>
              <p>Liquidity %</p>
              <p>
                {BigNumber(liquidityPercentage).toFixed(0) + " %"}
              </p>
            </>
          }
        </div>
      </div>
      {
        isAddLiquidityEnabled && <>
          <p>Listing rate</p>
          <p>
            {"1 $" +
              baseCurrencySymbol +
              " -> " +
              ETHER.div(oneListingTokeninWei) +
              " $" +
              tokenInfo.tokenSymbol}
          </p>
          (TokenRate * HardCap) + ((HardCap * LP%) * ListingRate)
        </>
      }
      <p  style={{ color: "var(--primary)" }}>
        {"Required " +
          requiredToken
            .toFormat() +
          " $" +
          tokenInfo.tokenSymbol}
      </p>
      <div ai="center">
        {BigNumber(FeeTokenApproveToFactory?.toString?.()).lt(BigNumber(IDOFactoryFee?.toString?.())) ? (
          <button
            style={{ marginTop: 20 }}
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              approveToken(IDOFactoryFee, FeeTokenContract);
            }}
          >
            {loading ? ". . ." : `APPROVE ${FeeTokenSymbol}`}
          </button>
        ) : BigNumber(tokenApprove?.toString?.()).lt(BigNumber(requiredToken?.toString?.())) ? (
          <button
            style={{ marginTop: 20 }}
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              approveToken(BigNumber(requiredToken).toFixed(0), tokenContract);
            }}
          >
            {loading ? ". . ." : `APPROVE ${tokenInfo.tokenSymbol}`}
          </button>
        ) : (
          <button
            style={{ marginTop: 20 }}
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              createIDO();
            }}
          >
            {loading ? ". . ." : "Create IDO Poll"}
          </button>
        )}
      </div>

      {IDOFactoryFee && IDOFactoryFee !== "0" && `Create IDO fee : ${ethers.utils.formatEther(IDOFactoryFee)}`}
      {/* {IDOFactoryFee && IDOFactoryFee !== "0" && `Create IDO fee : ${ethers.utils.formatEther(IDOFactoryFee)} ${FeeTokenSymbol}`} */}
    </div>
  );
}