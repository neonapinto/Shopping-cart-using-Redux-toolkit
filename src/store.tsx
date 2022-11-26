import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './features/cart/CartSlice';
import ModalReducer from './features/modal/modalSlice';
export const store = configureStore({
    reducer : {
        cart: cartReducer,
        modal: ModalReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;