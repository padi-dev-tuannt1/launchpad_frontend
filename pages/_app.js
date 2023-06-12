import '@/styles/globals.css'
import { Navbar, Container, Footer } from "../components/componentsindex"
import { ApplicationContextProvider } from '@/context/applicationContext';
import { PoolContextProvider } from '@/context/poolContext';
import { StoreContextProvider } from '@/context/store';
import { Web3ReactProvider } from '@web3-react/core';
import getLibrary from '@/utils/getLibrary';
const MyApp = ({ Component, pageProps }) => (
  
  <div>
    
    <Web3ReactProvider getLibrary={getLibrary}>
   
    <ApplicationContextProvider>
      <PoolContextProvider>
        <StoreContextProvider>
          <Container>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </Container>
        </StoreContextProvider>
      </PoolContextProvider>
    </ApplicationContextProvider>
  
    </Web3ReactProvider>
  </div>
);

export default MyApp;
