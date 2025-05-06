import { Fragment } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { UnicornProvider } from './context/UnicornContext';
import ProductsModule from './products';
import UnicornsModule from './unicorns';
import MenuBar from './components/MenuBar';
import Footer from './components/Footer';
import IndexModule from './home';

function App() {
  return (
    <BrowserRouter>
      <Fragment>

        <MenuBar />
        <IndexModule />
        <ProductsModule />
        <UnicornProvider>
          <UnicornsModule />
        </UnicornProvider>
        <Footer />
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
