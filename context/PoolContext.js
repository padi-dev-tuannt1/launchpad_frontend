import React, { createContext, useEffect, useState } from "react";


export const PoolContext = createContext({});

export const PoolContextProvider = ({ children }) => {
    const userData = {
        totalInvestedETH: 0.01,
        debt: 10
    }
    const [allPools, setAllPools] = useState({
        ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8"]: {
            tokenAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            metadata: "metadata",
            tokenName: "tokenName",
            tokenDecimals: 2,
            tokenSymbol: "TXT",
            totalSupply: 1000000000000,
            idoAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            owner: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            balance: 0.04,
            unsold: true,
            tokenRate: 0.01,
            listingRate: 0.02,
            // dexInfo,
            lpPercentage: 30,
            start: 1685858034,
            end: 1686070020,
            claim: 1686065777,
            min: 0.1,
            max: 2,
            softCap: 10,
            hardCap: 100,
            totalInvestedETH: 0,
            progress: 0,
            // metadataURL,
            userData: userData,
        },
        ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]: {
            tokenAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            metadata: "metadata",
            tokenName: "tokenName",
            tokenDecimals: 2,
            tokenSymbol: "TXT",
            totalSupply: 1000000000000,
            idoAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            owner: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            balance: 0.04,
            unsold: true,
            tokenRate: 0.01,
            listingRate: 0.02,
            // dexInfo,
            lpPercentage: 30,
            start: 1685858033,
            end: 1686070020,
            claim: 1686065777,
            min: 0.1,
            max: 2,
            softCap: 10,
            hardCap: 100,
            totalInvestedETH: 0,
            progress: 0,
            // metadataURL,
            userData: userData,
        }
    });
    const tokenData = {
        tokenSymbol: "TXT",
        tokenDecimals: 2,
        tokenName: "test token",
        tokenAddress: "0x0000000001212"
    }
    const allLocker = {
        ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]: {
            lockerAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            token: tokenData,
            name: "test locker",
            withdrawer: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            time: 1686065777,
            owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            balance: 10,
        },
        ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8"]: {
            lockerAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            token: tokenData,
            name: "test locker 2",
            withdrawer: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            time: 1686065747,
            owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            balance: 0,
        }
    }
    const allLockerAddress = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"];
    const allUserLockersAddresses = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"];
    const value = {
        allPools, allLocker, allLockerAddress, allUserLockersAddresses
    };

    return (
        <PoolContext.Provider value={value}>{children}</PoolContext.Provider>
    );
};

export const usePoolContext = () => React.useContext(PoolContext);