import '@/styles/globals.css'
import { Navbar, Container, Footer } from "../components/componentsindex"
import { ApplicationContextProvider } from '@/context/ApplicationContext';
import { PoolContextProvider } from '@/context/PoolContext';
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
