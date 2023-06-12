import BigNumber from "bignumber.js";
import React from "react";
// import { Badge } from "react-bootstrap";
import { ETHER } from "@/constant";
import { useApplicationContext } from "@/context/applicationContext";
import { usePoolContext } from "@/context/poolContext";
import { ethers } from "ethers";

// import { getRouterName } from "../../utils/utils";
// import TokenInfo from "./tokenInfo";

const PoolInfoRender = (props) => {
    const { idoAddress } = props;

    const poolContext = usePoolContext();

    let idoInfo = poolContext.allPools[idoAddress];
    const {
        baseCurrencySymbol
    } = useApplicationContext();
   

    //   if (!utils.isValidPool(idoInfo)) {
    //     console.log(idoInfo);
    //     return null;
    //   }

    const startDate = new Date(parseInt(idoInfo.start) * 1000);
    const endDate = new Date(parseInt(idoInfo.end) * 1000);
    const claimDate = new Date(parseInt(idoInfo.claim) * 1000);

    const isAddLiquidityEnabled = idoInfo.listingRate > 0 && idoInfo.lpPercentage > 0;

    return (
        <div style={{ margin: 10, minWidth: 400 }}>
            <div
                style={{
                    flex: 3,
                }}
            >
                {/* IDO Information */}
                <h2>IDO Information</h2>
                {parseInt(idoInfo.end) < parseInt(Date.now() / 1000) ? (
                    <p >Ended</p>
                ) : parseInt(idoInfo.start) < parseInt(Date.now() / 1000) ? (
                    <p >Started</p>
                ) : (
                    <p >Not started</p>
                )}
                <div style={{ marginTop: 15 }}>
                    <p >IDO pool address</p>
                    <p>{idoAddress}</p>
                </div>

                <div >
                    <p >Token rate</p>
                    {`${BigNumber(idoInfo.tokenRate).div(ETHER)} ${idoInfo.tokenSymbol}/${baseCurrencySymbol}`}
                   
                </div>

                {
                    isAddLiquidityEnabled && <div >
                        <p >Listing rate</p>
                        {`${BigNumber(idoInfo.listingRate).div(ETHER)} ${idoInfo.tokenSymbol}/${baseCurrencySymbol}`}
                    </div>
                }

                <div style={{ marginTop: 10 }}>
                    <div style={{ padding: 0 }}>
                        <p>Soft Cap</p>
                        <p>
                            {BigNumber(ethers.utils.formatEther(idoInfo.softCap)).toFormat(2) +
                " " + baseCurrencySymbol}
                           
                        </p>
                    </div>
                    <div style={{ padding: 0 }}>
                        <p>Hard Cap</p>
                        <p>
                            {BigNumber(ethers.utils.formatEther(idoInfo.hardCap)).toFormat(2) +
                " " + baseCurrencySymbol}
                        </p>
                    </div>
                    <div style={{ padding: 0 }}>
                        <p>Minimum Buy</p>
                        <p> {BigNumber(ethers.utils.formatEther(idoInfo.min)).toFormat(2) +
                " " + baseCurrencySymbol}        
                        </p>
                    </div>
                    <div ai="center" style={{ padding: 0 }}>
                        <p>Maximum Buy</p>
                        <p>
                        {BigNumber(ethers.utils.formatEther(idoInfo.max)).toFormat(2) +
                " " + baseCurrencySymbol}
                        </p>
                    </div>
                </div>

                {
                    isAddLiquidityEnabled && <>
                        <div >
                            <p >Liquidity %</p>
                            {idoInfo.lpPercentage + " %"}
                        </div>

                        {/* <div >
              <p fw="700">Router</p>
              {getRouterName(chainId)}
            </div> */}

                    </>
                }
                <div >
                    <p >Start time</p>
                    {startDate.toString()}
                </div>

                <div >
                    <p >End time</p>
                    {endDate.toString()}
                </div>

                <div >
                    <p >Lock LP until</p>
                    {claimDate.toString()}
                </div>

            </div>

            {/* <TokenInfo idoAddress={idoAddress} /> */}
        </div>
    );
};
export default PoolInfoRender;