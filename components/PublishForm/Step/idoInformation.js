import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { MenuItem, TextField, Checkbox } from "@mui/material";
import BigNumber from "bignumber.js";
import { timeout } from '@/utils/utils';
import { useApplicationContext } from '@/context/applicationContext';
import React from "react";
const idoInformation = () => {
  return (
    <div>idoInformation</div>
  )
}

export default idoInformation


// export default function IDOInfo() {
//   const context = useStoreContext();

//   const {
//     baseCurrencySymbol,
//   } = useApplicationContext();

//   const {
//     isAddLiquidityEnabled: [isAddLiquidityEnabled, setIsAddLiquidityEnabled],
//   } = context;

//   return (
//     <div flex={1}>
//       <h2 className='w-full'>IDO Information</h2>
//       <p>
//         If I pay 1 {baseCurrencySymbol} how much token I will get?
//       </p>
//       <input
//         type='number'
//         value={BigNumber(context.tokenRate[0]).toFixed()}
//         label={"Token rate"}
//         adornment={context.tokenInformation?.[0]?.tokenSymbol}
//         onChange={async (e) => {
//           e.preventDefault();
//           let val = BigNumber(e.target.value).absoluteValue().toFixed(18);
//           if (!isNaN(val)) {
//             await timeout(100).then(context.tokenRate[1](val));
//           } else {
//             await context.tokenRate[1](val);
//           }
//         }}
//       />
//       <p className='text-red-500'>{context.idoError["tokenRate"]}</p >
//       <div >
//         <div flex={1} style={{ marginLeft: 10, marginRight: 10 }}>
//           <input 
//             type='number'
//             value={BigNumber(context.softCap[0]).toFixed()}
//             label={"Soft Cap"}
//             adornment={baseCurrencySymbol}
//             onChange={(e) => {
//               e.preventDefault();
//               let val = BigNumber(e.target.value).absoluteValue().toFixed(18);
//               if (!isNaN(val)) {
//                 context.softCap[1](val);
//               } else {
//                 context.softCap[1]("");
//               }
//             }}
//           />
//           <p className='text-red-500'>{context.idoError["softCap"]}</p>
//           <NumberField
//             value={BigNumber(context.hardCap[0]).toFixed()}
//             label={"Hard Cap"}
//             adornment={baseCurrencySymbol}
//             onChange={(e) => {
//               e.preventDefault();
//               let val = BigNumber(e.target.value).absoluteValue().toFixed(18);
//               if (!isNaN(val)) {
//                 context.hardCap[1](val);
//               } else {
//                 context.hardCap[1]("");
//               }
//             }}
//           />
//           <s.TextIDWarning>{context.idoError["hardCap"]}</s.TextIDWarning>
//           <s.SpacerSmall />
//           <div ai="center" fd="row" jc="center">
//             <s.TextDescription>Enable auto liquidity on the DEX?</s.TextDescription>
//             <Checkbox
//               value={isAddLiquidityEnabled}
//               onChange={() => setIsAddLiquidityEnabled(!isAddLiquidityEnabled)}
//             />
//           </div>
//         </div>
//         <div flex={1} style={{ marginLeft: 10, marginRight: 10 }}>
//           <NumberField
//             value={BigNumber(context.minETH[0]).toFixed()}
//             label={"Minimum Buy"}
//             adornment={baseCurrencySymbol}
//             onChange={(e) => {
//               e.preventDefault();
//               let val = BigNumber(e.target.value).absoluteValue().toFixed(18);
//               if (!isNaN(val)) {
//                 context.minETH[1](val);
//               } else {
//                 context.minETH[1]("");
//               }
//             }}
//           />
//           <s.TextIDWarning>{context.idoError["minETH"]}</s.TextIDWarning>
//           <s.SpacerSmall />
//           <NumberField
//             value={BigNumber(context.maxETH[0]).toFixed()}
//             label={"Maximum Buy"}
//             adornment={baseCurrencySymbol}
//             onChange={(e) => {
//               e.preventDefault();
//               let val = BigNumber(e.target.value).absoluteValue().toFixed(18);
//               if (!isNaN(val)) {
//                 context.maxETH[1](val);
//               } else {
//                 context.maxETH[1]("");
//               }
//             }}
//           />
//           <s.TextIDWarning>{context.idoError["maxETH"]}</s.TextIDWarning>
//           <s.SpacerSmall />
//           {
//             isAddLiquidityEnabled && <>
//               <NumberField
//                 value={BigNumber(context.liquidityPercentage[0]).toFixed()}
//                 label={"Liquidity % (51% - 100%)"}
//                 onChange={(e) => {
//                   e.preventDefault();
//                   let val = BigNumber(e.target.value).absoluteValue().toFixed(18);
//                   if (!isNaN(val)) {
//                     context.liquidityPercentage[1](val);
//                   } else {
//                     context.liquidityPercentage[1]("");
//                   }
//                 }}
//               />
//               <s.TextIDWarning>
//                 {context.idoError["liquidityPercentage"]}
//               </s.TextIDWarning>
//             </>
//           }
//         </div>
//       </div>
//       <s.SpacerSmall />
//       {
//         isAddLiquidityEnabled && <>
//           <s.TextID>
//             If I pay 1 {baseCurrencySymbol} how much token I will get
//             after presale?
//           </s.TextID>
//           <NumberField
//             value={BigNumber(context.listingRate[0]).toFixed()}
//             label={"Listing Rate"}
//             adornment={context.tokenInformation?.[0]?.tokenSymbol}
//             onChange={(e) => {
//               e.preventDefault();
//               let val = BigNumber(e.target.value).absoluteValue().toFixed(18);
//               if (!isNaN(val)) {
//                 context.listingRate[1](val);
//               } else {
//                 context.listingRate[1]("");
//               }
//             }}
//           />
//           <s.TextIDWarning>{context.idoError["listingRate"]}</s.TextIDWarning>
//           <s.SpacerMedium />
//         </>
//       }
//       <div fd={"row"} jc="space-between">
//         <div flex={1} style={{ marginLeft: 10, marginRight: 10 }}>
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DateTimePicker
//               renderInput={(props) => <TextField fullWidth {...props} />}
//               label="Start date"
//               displayEmpty
//               value={context.start[0]}
//               onChange={(e) => {
//                 context.start[1](e);
//               }}
//             />
//           </LocalizationProvider>
//         </div>
//         <div flex={1} style={{ marginLeft: 10, marginRight: 10 }}>
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DateTimePicker
//               renderInput={(props) => <TextField fullWidth {...props} />}
//               label="End date"
//               displayEmpty
//               value={context.end[0]}
//               onChange={(e) => {
//                 context.end[1](e);
//               }}
//             />
//           </LocalizationProvider>
//         </div>
//       </div>
//       <s.TextIDWarning>{context.idoError["start-end"]}</s.TextIDWarning>
//       <s.SpacerMedium />
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <DateTimePicker
//           renderInput={(props) => <TextField fullWidth {...props} />}
//           label="Unlock date"
//           displayEmpty
//           value={context.unlock[0]}
//           onChange={(e) => {
//             context.unlock[1](e);
//           }}
//         />
//       </LocalizationProvider>
//       <s.TextIDWarning>{context.idoError["unlock"]}</s.TextIDWarning>
//     </div>
//   );
// }