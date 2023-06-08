import { TextField } from "@mui/material";
import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { utils } from "../../../utils";

const TokenVerify = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("")
  const [tokenInformation, setTokenInformation] = useState("")

  useEffect(() => {

    const fetchTokenInfo = async () => {
      if (address) {
        setLoading(true)
        try {
          const token = await utils.getTokenData(address);
          setTokenInformation(token);
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchTokenInfo();

  }, [address]);

  return (
    <div >
      <h2>Token Verify</h2>
      <TextField
        id="tokenAddress"
        onChange={(e) => {
          e.preventDefault();
          setAddress(e.target.value);
        }}
        value={tokenInformation?.tokenAddress || address || ""}
        name={"tokenAddress"}
        label={"Token address"}
        className="w-full"
      />
      {loading ? (
        <div>
          <Badge bg="secondary">Token Address Checking...</Badge>
        </div>
      ) : <p className="text-red-500 w-full"></p >
      }
      {tokenInformation && (
        <div>
          <p>Name</p>
          <p>{tokenInformation.tokenName}</p>
          <p>Decimals</p>
          <p>{tokenInformation.tokenDecimals}</p>
          <p>Total supply</p>
          <p>
            {BigNumber(tokenInformation.totalSupply)
              .dividedBy(10 ** tokenInformation.tokenDecimals)
              .toFixed(0)}
          </p>
        </div>
      )}
    </div>
  );
}
export default TokenVerify