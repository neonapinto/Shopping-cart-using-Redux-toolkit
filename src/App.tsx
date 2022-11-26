import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import { calculateTotals, getCartItems } from './features/cart/CartSlice';
import { AppDispatch, RootState, store } from './store';



function App() {
  const {cartItems, isLoading} = useSelector((store: RootState) => store.cart);
  const dispatch = useDispatch<AppDispatch>();
  const {isOpen} = useSelector((store:RootState) => store.modal);
  
  useEffect(() =>{
    dispatch(calculateTotals());
  },[cartItems]);
  

  useEffect(() =>{
    dispatch(getCartItems());
  },[])

  if(isLoading){
    return(
      <div className="loading">
        <h1>Loading . . .</h1>
      </div>
    )
  }

  return (
    <main>
        {isOpen && <Modal/>}
        <Navbar/>
        <CartContainer/>
    </main>
  );
}

export default App;
