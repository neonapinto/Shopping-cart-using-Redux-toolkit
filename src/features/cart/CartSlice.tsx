import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import axios from 'axios';



const url = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);
export interface Icart{
  id: string
  title: string
  price: string,
  img: string,
  amount: number,
}
const initialState = {
  cartItems : [] as Icart[], 
  amount: 0,
  total: 0,
  isLoading: true
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart : (state) =>{
      state.cartItems  = []
    },
    removeItem: (state, action) =>{
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item: Icart) =>
      item.id !== itemId);
    },
    increase: (state, {payload}) =>{
      const cartItem = state.cartItems.find((item:Icart) => item.id === payload);
      if(cartItem){
        cartItem.amount += 1;
      }
    },
    decrease: (state, {payload}) =>{
      const cartItem = state.cartItems.find((item:Icart) => item.id === payload);
      if(cartItem !=null){
        cartItem.amount -= 1;
      }  
    },
    calculateTotals: (state) =>{
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item :Icart) =>{
        amount += item.amount;
        total += item.amount * Number(item.price);
      })
      state.amount = amount;
      state.total = total;
    }
  },
  extraReducers: builder => {
    builder.addCase(
          getCartItems.pending, (state) =>{
            state.isLoading = true;
          }
    )
    builder.addCase(
      getCartItems.fulfilled, (state, {payload}) =>{
          state.isLoading = false;
          state.cartItems = payload
      }
    )
    builder.addCase(
      getCartItems.rejected, (state) =>{
          state.isLoading = false;
      }
    )
  }
});



export default cartSlice.reducer;
export const {clearCart, removeItem, increase, decrease, calculateTotals} = cartSlice.actions;