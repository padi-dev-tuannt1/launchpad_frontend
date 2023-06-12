import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { MenuItem, TextField, Checkbox } from "@mui/material";
import BigNumber from "bignumber.js";
import { timeout } from '@/utils/utils';
import { useApplicationContext } from '@/context/applicationContext';
import React from "react";
import { useStoreContext } from '@/context/store';
const idoInformation = () => {
  const context = useStoreContext()
    const {
    baseCurrencySymbol,
  } = useApplicationContext();
    const {
    isAddLiquidityEnabled: [isAddLiquidityEnabled, setIsAddLiquidityEnabled],
  } = context;

  return (
    <div flex={1} className='bg-gray-500'>
      <h2 className='w-full'>IDO Information</h2>
     <p>
        If I pay 1 {baseCurrencySymbol} how much token I will get?
      </p>
      <input
        className='mb-10 text-black'
        type='number'
        value={BigNumber(context.tokenRate[0]).toFixed()}
        placeholder='Token rate'
        onChange={async (e) => {
          e.preventDefault();
          let val = BigNumber(e.target.value).absoluteValue().toFixed(18);
          if (!isNaN(val)) {
            await timeout(100).then(context.tokenRate[1](val));
          } else {
            await context.tokenRate[1](val);
          }
        }}
      />
      <p className='text-red-500'>{context.idoError["tokenRate"]}</p >
      <div >
        <div flex={1} style={{ marginLeft: 10, marginRight: 10 }}>
          <input 
            className='mb-10 text-black'
            type='number'
            value={BigNumber(context.softCap[0]).toFixed()}
            placeholder='Soft cap'
            onChange={(e) => {
              e.preventDefault();
              let val = BigNumber(e.target.value).absoluteValue().toFixed(18);
              if (!isNaN(val)) {
                context.softCap[1](val);
              } else {
                context.softCap[1]("");
              }
            }}
          />
          <p className='text-red-500'>{context.idoError["softCap"]}</p>
          <input
          className='text-black'
            type='number'
            value={BigNumber(context.hardCap[0]).toFixed()}
            placeholder='Hard cap'
            onChange={(e) => {
              e.preventDefault();
              let val = BigNumber(e.target.value).absoluteValue().toFixed(18);
              if (!isNaN(val)) {
                context.hardCap[1](val);
              } else {
                context.hardCap[1]("");
              }
            }}
          />
          <p className='text-red-500'>{context.idoError["hardCap"]}</p>
          <div >
            <p>Enable auto liquidity on the DEX?</p>
            <Checkbox
              value={isAddLiquidityEnabled}
              onChange={() => setIsAddLiquidityEnabled(!isAddLiquidityEnabled)}
            />
          </div>
        </div>
        <div flex={1} style={{ marginLeft: 10, marginRight: 10 }}>
          <input
            className='mb-10 text-black'
            type='number'
            value={BigNumber(context.minETH[0]).toFixed()}
            placeholder="Minimum Buy"
            onChange={(e) => {
              e.preventDefault();
              let val = BigNumber(e.target.value).absoluteValue().toFixed(18);
              if (!isNaN(val)) {
                context.minETH[1](val);
              } else {
                context.minETH[1]("");
              }
            }}
          />
          <p className='text-red-500'>{context.idoError["minETH"]}</p>
          <input
            className='mb-10 text-black'
            type='number'
            value={BigNumber(context.maxETH[0]).toFixed()}
            placeholder="Maximum Buy"
            onChange={(e) => {
              e.preventDefault();
              let val = BigNumber(e.target.value).absoluteValue().toFixed(18);
              if (!isNaN(val)) {
                context.maxETH[1](val);
              } else {
                context.maxETH[1]("");
              }
            }}
          />
          <p className='text-red-500'>{context.idoError["maxETH"]}</p>
          {
            isAddLiquidityEnabled && <>
              <input
                className='mb-10 text-black' 
                type='number'
                value={BigNumber(context.liquidityPercentage[0]).toFixed()}
                placeholder="Liquidity % (51% - 100%)"
                onChange={(e) => {
                  e.preventDefault();
                  let val = BigNumber(e.target.value).absoluteValue().toFixed(18);
                  if (!isNaN(val)) {
                    context.liquidityPercentage[1](val);
                  } else {
                    context.liquidityPercentage[1]("");
                  }
                }}
              />
              <p className='text-red-500'>
                {context.idoError["liquidityPercentage"]}
              </p>
            </>
          }
        </div>
      </div>
      {
        isAddLiquidityEnabled && <>
          <p>
            If I pay 1 {baseCurrencySymbol} how much token I will get
            after presale?
          </p>
          <input
            className='mb-10 text-black' 
            type='number'
            value={BigNumber(context.listingRate[0]).toFixed()}
            placeholder="Listing Rate"
            onChange={(e) => {
              e.preventDefault();
              let val = BigNumber(e.target.value).absoluteValue().toFixed(18);
              if (!isNaN(val)) {
                context.listingRate[1](val);
              } else {
                context.listingRate[1]("");
              }
            }}
          />
          <p className='text-red-500'>{context.idoError["listingRate"]}</p>
        </>
      }
      <div >
        <div flex={1} style={{ marginLeft: 10, marginRight: 10 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField fullWidth {...props} />}
              label="Start date"
              displayEmpty
              value={context.start[0]}
              onChange={(e) => {
                context.start[1](e);
              }}
            />
          </LocalizationProvider>
        </div>
        <div flex={1} style={{ marginLeft: 10, marginRight: 10 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField fullWidth {...props} />}
              label="End date"
              displayEmpty
              value={context.end[0]}
              onChange={(e) => {
                context.end[1](e);
              }}
            />
          </LocalizationProvider>
        </div>
      </div>
      <p className='text-red-500'>{context.idoError["start-end"]}</p>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField fullWidth {...props} />}
          label="Unlock date"
          displayEmpty
          value={context.unlock[0]}
          onChange={(e) => {
            context.unlock[1](e);
          }}
        />
      </LocalizationProvider>
      <p className='text-red-500'>{context.idoError["unlock"]}</p>
    </div>
  )
}

export default idoInformation
