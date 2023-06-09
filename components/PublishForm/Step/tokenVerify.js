import { TextField } from "@mui/material";
import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { utils } from "../../../utils";
import { useStoreContext } from "@/context/store";
const TokenVerify = () => {
  const [loading, setLoading] = useState(false);

  const { address, tokenInformation, tokenError } = useStoreContext();

  useEffect(() => {

    const fetchTokenInfo = async () => {
      if (address[0]) {
        setLoading(true)
        try {
          const token = await utils.getTokenData(address[0]);
          tokenInformation[1](token);
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchTokenInfo();

  }, [address[0]]);


  return (
    <div >
      <h2>Token Verify</h2>
      <TextField
        id="tokenAddress"
        onChange={(e) => {
          e.preventDefault();
          address[1](e.target.value);
        }}
        value={tokenInformation?.[0]?.tokenAddress || address[0] || ""}
        name={"tokenAddress"}
        label={"Token address"}
        className="w-full"
      />
      {loading ? (
        <div>
          <Badge bg="secondary">Token Address Checking...</Badge>
        </div>
      ) : <p className="text-red-500 w-full">{tokenError["token"]}</p >
      }
      {tokenInformation[0] && (
        <div>
          <p>Name</p>
          <p>{tokenInformation[0].tokenName}</p>
          <p>Decimals</p>
          <p>{tokenInformation[0].tokenDecimals}</p>
          <p>Total supply</p>
          <p>
            {BigNumber(tokenInformation[0].totalSupply)
              .dividedBy(10 ** tokenInformation[0].tokenDecimals)
              .toFixed(0)}
          </p>
        </div>
      )}
    </div>
  );
}
export default TokenVerify