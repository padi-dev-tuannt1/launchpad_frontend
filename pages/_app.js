import '@/styles/globals.css'
import { Navbar, Container, Footer } from "../components/componentsindex"
import { ApplicationContextProvider } from '@/context/applicationContext';
import { PoolContextProvider } from '@/context/poolContext';
const MyApp = ({ Component, pageProps }) => (
  <div>
    <ApplicationContextProvider>
      <PoolContextProvider>
        <Container>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </Container>
      </PoolContextProvider>
    </ApplicationContextProvider>
  </div>
);

export default MyApp;
