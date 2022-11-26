import CartItem from './CartItem'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { openModal } from '../features/modal/modalSlice'
import { Icart } from '../features/cart/CartSlice'
const CartContainer = () => {
  const dispatch = useDispatch();

  const {cartItems, amount, total} = useSelector( (state:RootState) => state.cart);
  if(amount <1){
    return <section className='cart'>
        <header>
            <h2>Your bag</h2>
            <h4 className='empty-cart'>is currently empty</h4>
        </header>
    </section>
  }
  return (
    <section className='cart'>
        <header>
            <h2>Your bag</h2>
        </header>
        <div>
            {cartItems.map((item:Icart) =>{
                return <CartItem key={item.id} {...item}/>
            })}
        </div>
        <footer>
            <hr/>
            <div className='cart-total'>
                <h4>
                    total <span>${total.toFixed(2)}</span>
                </h4>
            </div>
            <button className='btn clear-btn' onClick={() => dispatch(openModal())}>Clear cart</button>
        </footer>
    </section>
  )
}

export default CartContainer