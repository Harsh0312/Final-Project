import Catalog from '../../features/catalog/catalog';
import Header from './Header';
import {Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import { useEffect, useState } from 'react';
import { Route,Link, BrowserRouter, Routes} from 'react-router-dom';
import Home from '../../features/home/Home';
import MedicineDetails from '../../features/catalog/MedicineDetails';
import AboutPage from '../../features/about/AboutPage';
import Contact from '../../features/contact/Contact';
import MedicineList from '../../features/catalog/MedicineList';
import MedicineCard from '../../features/catalog/MedicineCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BasketPage from '../../features/basket/BasketPage';
import { useStoreContext } from '../context/StoreContext';
import agent from '../api/agent';
import { getCookie } from '../util/util';
import CheckoutPage from '../../features/Checkout/CheckoutPage';
import Register from '../../features/account/Register';
import Login from '../../features/account/Login';



function App() {
  const{setBasket}=useStoreContext();
  const[loading,setLoading]=useState(true);

  useEffect(() => {
    const buyerId=getCookie('buyerId');
    if(buyerId) {
      agent.Basket.get()
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(()=>setLoading(false));
    }
    else{
      setLoading(false);
    }
  },[setBasket])
  
  const [darkMode,setDarkMode]=useState(false);
  const paletteType=darkMode? 'dark': 'light';
  const theme= createTheme({  
    palette: {
      mode: paletteType,
      background: {
        default: paletteType==='light'? '#eaeaea' : '#121212'
      }
    }
  })
  function handleThemeChange(){
    setDarkMode(!darkMode);
  }

  if (loading) return <h1>Initialising app....</h1>

  return (
    <>
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar/>
    <CssBaseline/>
    <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
    <Container>    
      <Routes>
      <Route  path='/' element={<Home/>}/>
      <Route  path='/catalog' element={<Catalog/>}/>
      <Route  path='/catalog/:idMed' element={<MedicineDetails/>}/>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route  path='/about' element={<AboutPage/>}/>
      <Route path='/basket' element={<BasketPage/>}/>
      <Route path='/checkout' element={<CheckoutPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>

      </Routes>        
    </Container>
    </ThemeProvider>
    
    </>
  );
}

export default App;
