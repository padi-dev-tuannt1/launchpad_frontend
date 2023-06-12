import { networks } from "./networkInfo";
import BigNumber from "bignumber.js";
const GOERLI_ID = 5;
const LOCAL_ID = 31337;
export const STORAGE_NETWORK_ID = process.env.NODE_ENV === 'production' ? BSC_ID : GOERLI_ID;
export const STORAGE_NETWORK_NAME = networks[STORAGE_NETWORK_ID.toString()].name;
export const STORAGE = networks[STORAGE_NETWORK_ID.toString()].storage;

export const STORAGE_APP_KEY = 'launchpad';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const NetworkContextName = 'NETWORK';

export const ETHER = BigNumber(10).pow(18);