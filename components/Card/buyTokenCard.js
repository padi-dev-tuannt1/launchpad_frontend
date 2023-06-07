
import BigNumber from "bignumber.js";
import React, { useState } from "react";
// import { Badge } from "react-bootstrap";
// import { useIDOPoolContract } from "../../hooks/useContract";
// import { utils } from "../../utils";
// import { NumberField } from "../FormField";
// import ProgressBar from "../Modal/ProgressBar";
// import PoolCountdown from "../Utils/poolCountdown";
import { useApplicationContext } from "@/context/ApplicationContext";
import { usePoolContext } from "@/context/PoolContext";
import { ethers } from "ethers";
import {web3} from "web3"

const BuyTokenCard = (props) => {
    // const { account, library } = useWeb3React();
    // console.log(account)
    console.log(ethers.utils)
    const [ethAmount, setEthAmount] = useState("0");
    const [tokensToBuy, setTokensToBuy] = useState(0);
    const [loading, setLoading] = useState(false);
    const { idoAddress } = props;
    //   const {
    //     triggerUpdateAccountData,
    //     baseCurrencySymbol
    //   } = useApplicationContext();
    const baseCurrencySymbol = "ETH"
    const idoInfo = usePoolContext().allPools[idoAddress];
    console.log(idoInfo)

    //   const IDOPoolContract = useIDOPoolContract(idoAddress);

    // if (!account) {
    //     return null;
    // }
    // if (!utils.isValidPool(idoInfo)) {
    //     return null;
    // }
    // if (!idoInfo) {
    //     return <p>Loading</p>;
    // }
    // if (!idoInfo?.userData) {
    //     return <p>Loading</p>;
    // }

    //   const buyToken = async () => {
    //     setLoading(true); // TODO: add action loader to the appropriate button
    //     try {
    //       const tx = await IDOPoolContract.pay({
    //         from: account,
    //         value: `0x${ethAmount.toString(16)}`,
    //       });

    //       const receipt = await tx.wait();

    //       triggerUpdateAccountData();
    //       // TODO: add trigger for update IDOInfo after actions
    //       console.log("buyToken receipt", receipt);
    //     } catch (err) {
    //       console.log("buyToken Error: ", err);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   const claimToken = async () => {
    //     setLoading(true); // TODO: add action loader to the appropriate button
    //     try {
    //       const tx = await IDOPoolContract.claim({
    //         from: account,
    //       });

    //       const receipt = await tx.wait();

    //       triggerUpdateAccountData();
    //       // TODO: add trigger for update IDOInfo after actions
    //       console.log("claimToken receipt", receipt);
    //     } catch (err) {
    //       console.log("claimToken Error: ", err);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   const refund = async () => {
    //     setLoading(true); // TODO: add action loader to the appropriate button
    //     try {
    //       const tx = await IDOPoolContract.refund({
    //         from: account,
    //       });

    //       const receipt = await tx.wait();

    //       triggerUpdateAccountData();
    //       // TODO: add trigger for update IDOInfo after actions
    //       console.log("refund receipt", receipt);
    //     } catch (err) {
    //       console.log("refund Error: ", err);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    const buyToken = async () => {

    }
    const claimToken = async () => {

    }
    const refund = async () => {

    }

    const isStarted = parseInt(idoInfo.start) < (parseInt(Date.now() / 1000));
    const hasEnded = parseInt(idoInfo.end) < (parseInt(Date.now() / 1000));
    const reachSoftCap = BigNumber(idoInfo.totalInvestedETH).gte(BigNumber(idoInfo.softCap));

    const willhMaxAmountOverflow = BigNumber(ethAmount).gt(
        BigNumber(idoInfo.max).minus(BigNumber(idoInfo.userData.totalInvestedETH))
    );
    const reachMaxAmount = BigNumber(idoInfo.max).lte(
        BigNumber(idoInfo.userData.totalInvestedETH)
    );
    const lessThanMinAmount = BigNumber(ethAmount).lt(BigNumber(idoInfo.min));

    return (
        <div
            style={{
                minWidth: 350,
                flex: 1,
                margin: 10,
            }}
        >
            <h2>BUY TOKEN</h2>
            {hasEnded ? (
                <p >Ended</p>
            ) : isStarted ? (
                <p >Started</p>
            ) : (
                <p >Not started</p>
            )}
            {/* <PoolCountdown start={idoInfo.start} end={idoInfo.end} /> */}
            <div style={{ marginTop: 10 }}>
                <div style={{ padding: 0 }}>
                    <p>{"Minimum " + baseCurrencySymbol}</p>
                    <p>
                        {/* {BigNumber(library.web3.utils.fromWei(idoInfo.min)).toFormat(2)} */}
                        {idoInfo.min}
                    </p>
                </div>
                <div style={{ padding: 0 }}>
                    <p>Maximum {baseCurrencySymbol}</p>
                    <p>
                        {/* {BigNumber(library.web3.utils.fromWei(idoInfo.max)).toFormat(2)} */}
                        {idoInfo.max}
                    </p>
                </div>
            </div>
            <div >
                <div flex={4}>
                    <p>To claim</p>
                    <p>
                        {BigNumber(idoInfo.userData.debt)
                            .dividedBy(10 ** idoInfo.tokenDecimals)
                            .toString() +
                            " $" +
                            idoInfo.tokenSymbol}
                    </p>
                </div>
                <div flex={1}>
                    <button
                        disabled={
                            !hasEnded ||
                            (hasEnded && !reachSoftCap) ||
                            BigNumber(idoInfo.userData.debt).lte(0)
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            claimToken();
                        }}
                    >
                        CLAIM
                    </button>
                </div>
            </div>
            <div >
                <div flex={4}>
                    <p>My invested {baseCurrencySymbol}</p>
                    <p>
                        {/* {BigNumber(ethers.utils.formatUnits(idoInfo.userData.totalInvestedETH)).toFormat(
                            2
                        ) + " " + baseCurrencySymbol} */}
                        {idoInfo.userData.totalInvestedETH}
                    </p>
                </div>
                <div flex={1}>
                    <button
                        disabled={
                            !hasEnded ||
                            BigNumber(idoInfo.totalInvestedETH).gte(
                                BigNumber(idoInfo.softCap)
                            ) ||
                            BigNumber(idoInfo.userData.totalInvestedETH).lte(0)
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            refund();
                        }}
                    >
                        REFUND
                    </button>
                </div>
            </div>
            <p>Progress</p>
            {/* <ProgressBar now={parseInt(idoInfo.progress)} /> */}
            <p>{idoInfo.progress}</p>

            <div>
                <div flex={4} style={{ marginRight: 20 }}>
                    <input
                        value={tokensToBuy}
                        label={"Tokens amount"}
                        adornment={idoInfo.tokenSymbol}
                        onChange={(e) => {
                            e.preventDefault();
                            let val = BigNumber(e.target.value).toFixed(0);
                            if (!isNaN(val)) {
                                setTokensToBuy(val);
                                setEthAmount(
                                    BigNumber(idoInfo.tokenRate).times(val)
                                );
                            } else {
                                setTokensToBuy(0);
                                setEthAmount("0");
                            }
                        }}
                    />
                </div>
                <div flex={1} ai="flex-end">
                    <button
                        disabled={
                            hasEnded ||
                            !isStarted ||
                            tokensToBuy === 0 ||
                            willhMaxAmountOverflow ||
                            reachMaxAmount ||
                            lessThanMinAmount
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            buyToken();
                        }}
                    >
                        BUY
                    </button>
                </div>
            </div>

            <div style={{ wordBreak: "break-all" }} >
                <p>You will spend</p>
                {/* {(ethAmount ? ethers.utils.formatUnits(ethAmount.toString(16)) : 0) +
                    " " +
                    baseCurrencySymbol
                } */}
                {ethAmount? ethAmount:0}
            </div>
        </div>
    );
};
export default BuyTokenCard;
