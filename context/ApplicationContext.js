import React, { createContext, useEffect, useState } from "react";


export const Application = createContext({});

export const ApplicationContextProvider = ({ children }) => {
  const baseCurrencySymbol = "ETH"
  const [IDOFactoryAddress, setIDOFactoryAddress] = useState('0x304eC7ddA1D83E65D53770cF0A8BA6626EfbAf5f');
  const [TokenLockerFactoryAddress, setTokenLockerFactoryAddress] = useState('0x304eC7ddA1D83E65D53770cF0A8BA6626EfbAf5f');

  const value = {
    IDOFactoryAddress,
    TokenLockerFactoryAddress,
    baseCurrencySymbol
  };

  return (
    <Application.Provider value={value}>{children}</Application.Provider>
  );
};

export const useApplicationContext = () => React.useContext(Application);