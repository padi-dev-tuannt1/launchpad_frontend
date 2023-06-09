import '@/styles/globals.css'
import { Navbar, Container, Footer } from "../components/componentsindex"
import { ApplicationContextProvider } from '@/context/applicationContext';
import { PoolContextProvider } from '@/context/poolContext';
import { StoreContextProvider } from '@/context/store';
const MyApp = ({ Component, pageProps }) => (
  <div>
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
  </div>
);

export default MyApp;
